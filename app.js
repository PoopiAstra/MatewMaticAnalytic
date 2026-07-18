'use strict';

const app = document.getElementById('app');
const routeLoader = document.getElementById('route-loader');
const letters = ['A', 'B', 'C', 'D'];
const validViews = new Set(['home', 'reviewer', 'quiz', 'music']);

const storedSet = localStorage.getItem('calc:lastSet') || localStorage.getItem('calc:lastModule') || '1';
const state = {
  view: validViews.has(location.hash.slice(1)) ? location.hash.slice(1) : 'home',
  setId: storedSet === 'all' ? 'all' : Number(storedSet) || 1,
  mode: ['canvas', 'human', 'mixed'].includes(localStorage.getItem('calc:mode')) ? localStorage.getItem('calc:mode') : 'canvas',
  index: 0,
  answers: {},
  submitted: false,
  showReview: false,
  transitionTimer: null
};

function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function decodeScripts(value, map) {
  return [...value].map(character => map[character] ?? character).join('');
}

function decodeUpperScript(value, map) {
  const decoded = decodeScripts(value, map);
  return /^[a-zA-Z][0-9]+$/.test(decoded) ? `${decoded[0]}^{${decoded.slice(1)}}` : decoded;
}

function toLatex(value) {
  let text = String(value).trim();
  const subMap = { '₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','₋':'-','₊':'+','ₐ':'a','ₓ':'x','ᵢ':'i','ₙ':'n' };
  const supMap = { '⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-','⁺':'+','ˣ':'x','ⁿ':'n','ᵇ':'b' };

  text = text.replace(/∫([₀₁₂₃₄₅₆₇₈₉₋₊ₐₓᵢₙ]+)([⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ˣⁿᵇ]+)/g, (_, lower, upper) => `\\int_{${decodeScripts(lower, subMap)}}^{${decodeUpperScript(upper, supMap)}}`);
  text = text.replace(/([A-Za-z0-9)\]])([⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ˣⁿᵇ]+)/g, (_, base, power) => `${base}^{${decodeScripts(power, supMap)}}`);
  text = text.replace(/([A-Za-z0-9)\]])([₀₁₂₃₄₅₆₇₈₉₋₊ₐₓᵢₙ]+)/g, (_, base, lower) => `${base}_{${decodeScripts(lower, subMap)}}`);
  text = text
    .replaceAll('−', '-')
    .replaceAll('→', '\\to ')
    .replaceAll('∞', '\\infty ')
    .replaceAll('π', '\\pi ')
    .replaceAll('≤', '\\le ')
    .replaceAll('≥', '\\ge ')
    .replaceAll('≠', '\\ne ')
    .replaceAll('·', '\\cdot ')
    .replaceAll('∫', '\\int ');

  text = text.replace(/\blim\s+([A-Za-z])\\to\s*([A-Za-z0-9]+)([-+])\s+/g, '\\lim_{$1\\to $2^{$3}} ');
  text = text.replace(/\blim\s+([A-Za-z])\\to\s*([^\s]+)\s+/g, '\\lim_{$1\\to $2} ');
  text = text.replace(/\b(dy|dx|dA|dr|ds|dv)\/(dx|dt)\b/g, '\\frac{$1}{$2}');
  text = text.replace(/\bd\/dx\b/g, '\\frac{d}{dx}');
  text = text.replace(/√\(([^()]*)\)/g, '\\sqrt{$1}');
  text = text.replace(/√([A-Za-z0-9]+)/g, '\\sqrt{$1}');
  text = text.replace(/\b(sin|cos|tan|sec|csc|cot|ln)\b/g, '\\$1');
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

const exactMathFragments = [
  'lim h→0 [f(x+h)−f(x)]/h',
  'lim h→∞ [f(x+h)−f(x)]',
  'lim x→∞ (3x²+1)/(x²−4)',
  'lim x→∞ (5x+2)/(x²+1)',
  'lim x→2 (x² − 4)/(x − 2)',
  'lim x→4 (√x − 2)/(x − 4)',
  'lim x→−1 (x³ + 1)/(x + 1)',
  'lim x→0 (1−cos x)/x',
  'lim x→0 sin x / x',
  'lim x→3 (2x + 5)',
  'lim x→a− f(x)=2',
  'lim x→a+ f(x)=5',
  'lim x→a f(g(x))',
  'lim x→a g(x)=L',
  'lim x→a f(x)',
  'lim x→0 f(x)/x'
].sort((a, b) => b.length - a.length);

function markMathFragments(value) {
  let working = String(value);
  const formulas = [];
  const mark = raw => {
    const index = formulas.push(toLatex(raw)) - 1;
    return `@@MATH_${index}@@`;
  };

  exactMathFragments.forEach(fragment => {
    working = working.split(fragment).join(mark(fragment));
  });

  working = working.replace(/∫[^,;?]*(?:dx|dt|du)/g, match => mark(match));
  working = working.replace(/\bd\/dx\([^)]*\)(?:\s*=\s*[^,?]+)?/g, match => mark(match));
  working = working.replace(/\b(?:dy|dx|dA|dr|ds|dv)\/(?:dx|dt)\b/g, match => mark(match));
  working = working.replace(/\b(?:f|F|g|G)(?:'''|''|')\([^)]*\)(?:\s*[<>=]\s*[^,\s?:]+)?/g, match => mark(match));
  working = working.replace(/\b(?:f|g|F|G|s|v|A|L|x|y)\s*(?:\([^)]*\))?\s*=\s*[^,;?:]+/g, match => match.includes('@@MATH_') ? match : mark(match));

  let html = escapeHTML(working);
  formulas.forEach((formula, index) => {
    html = html.replaceAll(`@@MATH_${index}@@`, `<span class="math-inline">\\(${formula}\\)</span>`);
  });
  return html;
}

function isFormulaLike(value) {
  const text = String(value).trim();
  const words = text.split(/\s+/).length;
  if (!/[=∫√π∞²³⁴⁵⁻→\/()[\]]/.test(text)) return false;
  if (words > 10) return false;
  if (/^(what|evaluate|differentiate|if |for |in |which|why|when |how|according|a student|the|a |an |because|only|it |this |incorrect|correct|does not|undefined|always|never|to |area |accumulated|functions? |both )/i.test(text)) return false;
  if (/\b(and|or|with|while|only|always|without|provided|where|because)\b/i.test(text)) return false;
  return true;
}

function formatRichText(value) {
  const text = String(value);
  if (text.includes('\\(') || text.includes('\\[')) return text;
  return isFormulaLike(text)
    ? `<span class="math-inline">\\(${toLatex(text)}\\)</span>`
    : markMathFragments(text);
}

function normalizeQuestion(rawQuestion, questionIndex, module) {
  const [prompt, originalOptions, originalCorrect, explanation] = rawQuestion;
  const correctText = originalOptions[originalCorrect];
  const distractors = originalOptions.filter((_, optionIndex) => optionIndex !== originalCorrect);
  const targetCorrect = (questionIndex + module.id) % 4;
  const options = [...distractors];
  options.splice(targetCorrect, 0, correctText);
  return {
    prompt,
    options,
    correct: targetCorrect,
    explanation,
    sourceModuleId: module.id,
    sourceModuleTitle: module.title
  };
}

const QUESTION_SETS = MODULES.map(module => ({
  ...module,
  questions: module.questions.map((question, index) => normalizeQuestion(question, index, module))
}));

const ALL_MODULES_SET = {
  id: 'all',
  title: 'All Modules Comprehensive Test',
  description: 'A complete 140-question test covering every module in order.',
  questions: QUESTION_SETS.flatMap(module => module.questions)
};

function currentSet() {
  if (state.setId === 'all') return ALL_MODULES_SET;
  return QUESTION_SETS.find(module => module.id === Number(state.setId)) || QUESTION_SETS[0];
}

function currentModule() {
  const id = state.setId === 'all' ? Number(localStorage.getItem('calc:lastModule')) || 1 : Number(state.setId);
  return QUESTION_SETS.find(module => module.id === id) || QUESTION_SETS[0];
}

function bestKey(setId) { return `calc:best:${setId}`; }
function getBest(setId) { return Number(localStorage.getItem(bestKey(setId)) || 0); }
function saveBest(setId, score) {
  if (score > getBest(setId)) localStorage.setItem(bestKey(setId), String(score));
}

function questionCount() { return currentSet().questions.length; }
function answeredCount() { return Object.keys(state.answers).length; }
function scoreAttempt() {
  return currentSet().questions.reduce((score, question, index) => score + (state.answers[index] === question.correct ? 1 : 0), 0);
}

function resetAttempt({ keepIndex = false } = {}) {
  if (!keepIndex) state.index = 0;
  state.answers = {};
  state.submitted = false;
  state.showReview = false;
}

function showLoader() {
  clearTimeout(state.transitionTimer);
  routeLoader.classList.add('is-visible');
  routeLoader.setAttribute('aria-hidden', 'false');
}

function hideLoader() {
  state.transitionTimer = setTimeout(() => {
    routeLoader.classList.remove('is-visible');
    routeLoader.setAttribute('aria-hidden', 'true');
  }, 90);
}

function runTransition(callback, delay = 170) {
  showLoader();
  window.setTimeout(() => {
    callback();
    render();
    window.scrollTo({ top: 0, behavior: 'auto' });
    hideLoader();
  }, delay);
}

function navigate(view) {
  if (!validViews.has(view)) view = 'home';
  runTransition(() => {
    state.view = view;
    history.pushState({ view }, '', `#${view}`);
  });
}

function selectSet(setId, view = 'quiz') {
  runTransition(() => {
    state.setId = setId === 'all' ? 'all' : Number(setId);
    localStorage.setItem('calc:lastSet', String(state.setId));
    if (state.setId !== 'all') localStorage.setItem('calc:lastModule', String(state.setId));
    resetAttempt();
    state.view = view;
    history.pushState({ view }, '', `#${view}`);
  });
}

let mathRetries = 0;
function typeset(root = app) {
  if (window.MathJax?.typesetPromise) {
    mathRetries = 0;
    if (window.MathJax.typesetClear) window.MathJax.typesetClear([root]);
    window.MathJax.typesetPromise([root]).catch(() => {});
  } else if (mathRetries < 15) {
    mathRetries += 1;
    setTimeout(() => typeset(root), 180);
  }
}

function setAppHTML(html) {
  app.innerHTML = `<div class="view-enter">${html}</div>`;
}

function bindNavigation() {
  document.querySelectorAll('[data-view]').forEach(element => {
    const target = element.dataset.view;
    element.classList.toggle('is-active', target === state.view);
    if (target === state.view) element.setAttribute('aria-current', 'page');
    else element.removeAttribute('aria-current');
    element.onclick = event => {
      event.preventDefault();
      navigate(target);
    };
  });
}

function renderHome() {
  const totalBest = QUESTION_SETS.reduce((total, module) => total + getBest(module.id), 0);
  const cards = QUESTION_SETS.map(module => {
    const best = getBest(module.id);
    return `
      <article class="module-card">
        <div class="module-card__meta">
          <span>MODULE ${String(module.id).padStart(2, '0')}</span>
          <span>${best}/20 BEST</span>
        </div>
        <h3>${escapeHTML(module.title)}</h3>
        <p>${escapeHTML(module.description)}</p>
        <div class="progress-bar" aria-label="Best score ${best} out of 20"><i style="width:${best * 5}%"></i></div>
        <div class="module-card__actions">
          <button class="secondary-button" type="button" data-review-module="${module.id}">Reviewer</button>
          <button class="primary-button" type="button" data-quiz-module="${module.id}">20-Q Quiz</button>
        </div>
      </article>`;
  }).join('');

  setAppHTML(`
    <section class="hero">
      <div class="hero__content">
        <p class="eyebrow">3TSY2526_GED0055_AI11 / DS11-11</p>
        <h1>Calculus,<br><span>reviewed properly.</span></h1>
        <p class="hero__copy">Seven focused modules, twenty questions each, readable reviewer notes, properly rendered mathematical notation, and feedback that explains the answer instead of only marking it.</p>
        <div class="hero__actions">
          <button class="primary-button" type="button" id="continue-studying">Continue studying</button>
          <button class="secondary-button" type="button" id="open-music">Open music player</button>
        </div>
      </div>
    </section>

    <section class="dashboard page-shell">
      <div class="section-heading">
        <div><p class="eyebrow">SELECT MODULE</p><h2>Course modules</h2></div>
        <div class="total-progress">TOTAL BEST: ${totalBest} / 140</div>
      </div>

      <article class="comprehensive-card">
        <div>
          <p class="eyebrow">COMPREHENSIVE TEST</p>
          <h3>All seven modules</h3>
          <p>Take every question from Modules 1–7 in one continuous 140-question test. Your best comprehensive score is saved separately.</p>
        </div>
        <div class="comprehensive-card__actions">
          <span class="best-score">BEST: ${getBest('all')} / 140</span>
          <button class="primary-button" type="button" id="start-comprehensive">Start full test</button>
        </div>
      </article>

      <div class="module-grid">${cards}</div>
    </section>`);

  document.getElementById('continue-studying').onclick = () => navigate('quiz');
  document.getElementById('open-music').onclick = () => setSpotifyDockCollapsed(false);
  document.getElementById('start-comprehensive').onclick = () => selectSet('all', 'quiz');
  document.querySelectorAll('[data-review-module]').forEach(button => {
    button.onclick = () => selectSet(Number(button.dataset.reviewModule), 'reviewer');
  });
  document.querySelectorAll('[data-quiz-module]').forEach(button => {
    button.onclick = () => selectSet(Number(button.dataset.quizModule), 'quiz');
  });
}

function modeLabel(mode) {
  return ({ canvas: 'Canvas style', human: 'Human style', mixed: 'Mixed style' })[mode];
}

function renderQuizSidebar(set) {
  const options = [
    ...QUESTION_SETS.map(module => `<option value="${module.id}" ${state.setId === module.id ? 'selected' : ''}>Module ${module.id}: ${escapeHTML(module.title)}</option>`),
    `<option value="all" ${state.setId === 'all' ? 'selected' : ''}>All Modules: 140 questions</option>`
  ].join('');

  return `
    <aside class="workspace-sidebar">
      <button class="sidebar-back" type="button" data-view="home">← All modules</button>
      <p class="eyebrow">${state.setId === 'all' ? 'COMPREHENSIVE TEST' : `MODULE ${String(set.id).padStart(2, '0')}`}</p>
      <h2>${escapeHTML(set.title)}</h2>
      <p class="sidebar-description">${escapeHTML(set.description)}</p>

      <label class="sidebar-label" for="quiz-set-select">QUESTION SET</label>
      <select id="quiz-set-select" class="control-select">${options}</select>

      <span class="sidebar-label">QUIZ FORMAT</span>
      <div class="mode-list">
        <button class="mode-button ${state.mode === 'canvas' ? 'is-active' : ''}" type="button" data-mode="canvas"><strong>Canvas style</strong><small>One question at a time. Results appear after submission.</small></button>
        <button class="mode-button ${state.mode === 'human' ? 'is-active' : ''}" type="button" data-mode="human"><strong>Human style</strong><small>See and answer the entire test on one page.</small></button>
        <button class="mode-button ${state.mode === 'mixed' ? 'is-active' : ''}" type="button" data-mode="mixed"><strong>Mixed style</strong><small>Get instant feedback and a short explanation.</small></button>
      </div>

      <button class="secondary-button sidebar-reset" type="button" id="reset-attempt">Reset attempt</button>
      <div class="sidebar-progress">
        <div class="sidebar-progress__row"><span>ANSWERED</span><span>${answeredCount()} / ${questionCount()}</span></div>
        <div class="progress-bar"><i style="width:${(answeredCount() / questionCount()) * 100}%"></i></div>
      </div>
    </aside>`;
}

function renderQuiz() {
  const set = currentSet();
  setAppHTML(`
    <section class="workspace">
      ${renderQuizSidebar(set)}
      <div class="workspace-main"><section id="quiz-panel" class="content-panel"></section></div>
    </section>`);

  document.getElementById('quiz-set-select').onchange = event => selectSet(event.target.value === 'all' ? 'all' : Number(event.target.value), 'quiz');
  document.querySelectorAll('[data-mode]').forEach(button => {
    button.onclick = () => {
      const nextMode = button.dataset.mode;
      if (nextMode === state.mode) return;
      runTransition(() => {
        state.mode = nextMode;
        localStorage.setItem('calc:mode', nextMode);
        resetAttempt();
      }, 120);
    };
  });
  document.getElementById('reset-attempt').onclick = () => {
    resetAttempt();
    render();
  };

  if (state.submitted) renderResults();
  else if (state.mode === 'human') renderHumanQuiz();
  else renderSingleQuestion();
}

function quizHeaderHTML(set) {
  return `
    <div class="quiz-header">
      <div><p class="eyebrow">${modeLabel(state.mode).toUpperCase()}</p><h1>${escapeHTML(set.title)}</h1></div>
      <div class="score-pill">${answeredCount()} / ${set.questions.length} answered</div>
    </div>`;
}

function questionCardHTML(question, index, { forceFeedback = false } = {}) {
  const selected = state.answers[index];
  const instantLocked = state.mode === 'mixed' && selected !== undefined;
  const locked = forceFeedback || instantLocked;
  const status = selected === undefined ? 'Not answered.' : selected === question.correct ? 'Correct.' : 'Incorrect.';
  const feedbackClass = selected === question.correct ? 'is-correct' : 'is-incorrect';
  const source = state.setId === 'all' ? `<span class="question-source">MODULE ${question.sourceModuleId}: ${escapeHTML(question.sourceModuleTitle)}</span>` : '';

  const choices = question.options.map((option, optionIndex) => {
    const classes = ['choice'];
    if (!locked && selected === optionIndex) classes.push('is-selected');
    if (locked && optionIndex === question.correct) classes.push('is-correct');
    if (locked && selected === optionIndex && optionIndex !== question.correct) classes.push('is-incorrect');
    return `
      <button class="${classes.join(' ')}" type="button" data-choice="${optionIndex}" ${locked ? 'disabled' : ''}>
        <span class="choice__letter">${letters[optionIndex]}</span>
        <span class="choice__text">${formatRichText(option)}</span>
      </button>`;
  }).join('');

  return `
    <article class="question-card is-animating" data-question-index="${index}">
      ${source}
      <div class="question-kicker"><span>QUESTION ${index + 1} OF ${questionCount()}</span><span>1 POINT</span></div>
      <div class="question-text">${formatRichText(question.prompt)}</div>
      <div class="choices">${choices}</div>
      ${locked ? `<div class="feedback-box ${feedbackClass}"><strong>${status}</strong>${formatRichText(question.explanation)}</div>` : ''}
    </article>`;
}

function renderQuestionNavigator() {
  const count = questionCount();
  if (count > 40) return '';
  return `<div class="question-navigator" aria-label="Question navigation">${currentSet().questions.map((_, index) => {
    const classes = [];
    if (state.answers[index] !== undefined) classes.push('is-answered');
    if (state.index === index) classes.push('is-current');
    return `<button class="${classes.join(' ')}" type="button" data-go-question="${index}" aria-label="Go to question ${index + 1}">${index + 1}</button>`;
  }).join('')}</div>`;
}

function renderSingleQuestion() {
  const panel = document.getElementById('quiz-panel');
  const set = currentSet();
  const question = set.questions[state.index];
  const hasAnswer = state.answers[state.index] !== undefined;
  const isLast = state.index === set.questions.length - 1;

  panel.innerHTML = `
    ${quizHeaderHTML(set)}
    ${questionCardHTML(question, state.index)}
    <div class="quiz-controls">
      <button class="secondary-button" id="previous-question" type="button" ${state.index === 0 ? 'disabled' : ''}>← Previous</button>
      <div class="quiz-controls__right">
        ${state.mode === 'mixed' && !hasAnswer ? '<button class="ghost-button" id="skip-question" type="button">Skip for now</button>' : ''}
        <button class="primary-button" id="next-question" type="button">${isLast ? 'Finish attempt' : 'Next question →'}</button>
      </div>
    </div>
    ${renderQuestionNavigator()}`;

  bindQuestionChoices(panel, state.index);
  document.getElementById('previous-question').onclick = () => moveQuestion(-1);
  const skip = document.getElementById('skip-question');
  if (skip) skip.onclick = () => moveQuestion(1);
  document.getElementById('next-question').onclick = () => {
    if (isLast) submitAttempt();
    else moveQuestion(1);
  };
  panel.querySelectorAll('[data-go-question]').forEach(button => {
    button.onclick = () => {
      state.index = Number(button.dataset.goQuestion);
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  });
  typeset(panel);
}

function moveQuestion(direction) {
  const nextIndex = Math.max(0, Math.min(questionCount() - 1, state.index + direction));
  if (nextIndex === state.index) return;
  state.index = nextIndex;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bindQuestionChoices(container, questionIndex) {
  container.querySelectorAll(`[data-question-index="${questionIndex}"] [data-choice]`).forEach(button => {
    button.onclick = () => {
      state.answers[questionIndex] = Number(button.dataset.choice);
      if (state.mode === 'mixed') {
        render();
      } else {
        container.querySelectorAll(`[data-question-index="${questionIndex}"] .choice`).forEach(choice => choice.classList.remove('is-selected'));
        button.classList.add('is-selected');
        const pill = container.querySelector('.score-pill');
        if (pill) pill.textContent = `${answeredCount()} / ${questionCount()} answered`;
        const progressText = document.querySelector('.sidebar-progress__row span:last-child');
        const progressBar = document.querySelector('.sidebar-progress .progress-bar i');
        if (progressText) progressText.textContent = `${answeredCount()} / ${questionCount()}`;
        if (progressBar) progressBar.style.width = `${(answeredCount() / questionCount()) * 100}%`;
      }
    };
  });
}

function renderHumanQuiz() {
  const panel = document.getElementById('quiz-panel');
  const set = currentSet();
  panel.innerHTML = `
    ${quizHeaderHTML(set)}
    ${set.questions.map((question, index) => questionCardHTML(question, index)).join('')}
    ${answeredCount() < set.questions.length ? `<div class="unanswered-warning" id="human-warning">You may submit with unanswered questions, but they will count as incorrect.</div>` : ''}
    <button class="primary-button human-submit" id="submit-human" type="button">Submit ${set.questions.length}-question attempt</button>`;

  set.questions.forEach((_, index) => bindQuestionChoices(panel, index));
  document.getElementById('submit-human').onclick = submitAttempt;
  typeset(panel);
}

function submitAttempt() {
  state.submitted = true;
  state.showReview = false;
  saveBest(state.setId, scoreAttempt());
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resultMessage(percentage) {
  if (percentage >= 90) return 'Excellent work. You understand the module well. Review the few mistakes so they do not return on the actual test.';
  if (percentage >= 75) return 'Good result. Your foundation is strong, but reviewing the missed questions will make your understanding more reliable.';
  if (percentage >= 60) return 'You have the main ideas, but some rules are still getting mixed together. Read the reviewer, then try another attempt.';
  return 'Use the reviewer before retaking the quiz. Focus on why each rule works instead of memorizing only the final formula.';
}

function renderResults() {
  const panel = document.getElementById('quiz-panel');
  const set = currentSet();
  const score = scoreAttempt();
  const percentage = Math.round((score / set.questions.length) * 100);
  panel.innerHTML = `
    <section class="result-card">
      <p class="eyebrow">ATTEMPT COMPLETE</p>
      <h1>${escapeHTML(set.title)}</h1>
      <div class="big-score">${score}/${set.questions.length}</div>
      <p>${resultMessage(percentage)}</p>
      <div class="button-row">
        <button class="primary-button" type="button" id="toggle-answer-review">${state.showReview ? 'Hide answer review' : 'Review answers'}</button>
        <button class="secondary-button" type="button" id="try-again">Try again</button>
        ${state.setId !== 'all' ? '<button class="ghost-button" type="button" id="open-reviewer">Open module reviewer</button>' : ''}
      </div>
    </section>
    <div id="answer-review" class="answer-review">${state.showReview ? set.questions.map((question, index) => questionCardHTML(question, index, { forceFeedback: true })).join('') : ''}</div>`;

  document.getElementById('toggle-answer-review').onclick = () => {
    state.showReview = !state.showReview;
    render();
  };
  document.getElementById('try-again').onclick = () => {
    resetAttempt();
    render();
  };
  const reviewerButton = document.getElementById('open-reviewer');
  if (reviewerButton) reviewerButton.onclick = () => navigate('reviewer');
  typeset(panel);
}

function guideFor(moduleId) {
  return typeof REVIEWER_GUIDES !== 'undefined' && REVIEWER_GUIDES[moduleId]
    ? REVIEWER_GUIDES[moduleId]
    : null;
}

function renderReviewer() {
  if (state.setId === 'all') state.setId = Number(localStorage.getItem('calc:lastModule')) || 1;
  const module = currentModule();
  const guide = guideFor(module.id);
  const tabs = QUESTION_SETS.map(item => `<button class="reviewer-tab ${item.id === module.id ? 'is-active' : ''}" type="button" data-reviewer-module="${item.id}">${String(item.id).padStart(2, '0')} &nbsp; ${escapeHTML(item.title)}</button>`).join('');

  setAppHTML(`
    <section class="workspace">
      <aside class="workspace-sidebar">
        <button class="sidebar-back" type="button" data-view="home">← All modules</button>
        <p class="eyebrow">REVIEWER</p>
        <div class="reviewer-tabs">${tabs}</div>
      </aside>
      <div class="workspace-main">
        <article class="content-panel reviewer-article">
          ${guide ? renderDetailedGuide(module, guide) : renderFallbackGuide(module)}
        </article>
      </div>
    </section>`);

  document.querySelectorAll('[data-reviewer-module]').forEach(button => {
    button.onclick = () => {
      state.setId = Number(button.dataset.reviewerModule);
      localStorage.setItem('calc:lastSet', String(state.setId));
      localStorage.setItem('calc:lastModule', String(state.setId));
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  });
  document.getElementById('start-review-quiz').onclick = () => selectSet(module.id, 'quiz');
  typeset(app);
}

function renderDetailedGuide(module, guide) {
  const goals = guide.goals.map((goal, index) => `<div class="goal-card"><span>GOAL ${String(index + 1).padStart(2, '0')}</span>${formatRichText(goal)}</div>`).join('');
  const sections = guide.sections.map((section, index) => `
    <section class="review-section">
      <span class="review-section__number">SECTION ${String(index + 1).padStart(2, '0')}</span>
      <h2>${escapeHTML(section.title)}</h2>
      ${section.paragraphs.map(paragraph => `<p>${formatRichText(paragraph)}</p>`).join('')}
      ${(section.formulas || []).map(formula => `<div class="formula-card"><span class="formula-card__label">${escapeHTML(formula.label || 'FORMULA')}</span>\\[${formula.latex}\\]${formula.note ? `<p>${formatRichText(formula.note)}</p>` : ''}</div>`).join('')}
      ${section.example ? `<div class="worked-example"><h3>${escapeHTML(section.example.title)}</h3><p>${formatRichText(section.example.problem)}</p><ol>${section.example.steps.map(step => `<li>${formatRichText(step)}</li>`).join('')}</ol></div>` : ''}
    </section>`).join('');

  return `
    <p class="eyebrow">MODULE ${String(module.id).padStart(2, '0')} REVIEWER</p>
    <h1>${escapeHTML(module.title)}</h1>
    <p class="reviewer-lead">${formatRichText(guide.intro)}</p>
    <div class="reviewer-goals">${goals}</div>
    ${sections}
    <div class="review-callout"><strong>Plain-language summary:</strong> ${formatRichText(guide.summary)}</div>
    <div class="review-list-grid">
      <section class="review-list-card"><h3>Common mistakes</h3><ul>${guide.mistakes.map(item => `<li>${formatRichText(item)}</li>`).join('')}</ul></section>
      <section class="review-list-card"><h3>Before taking the quiz</h3><ul>${guide.checklist.map(item => `<li>${formatRichText(item)}</li>`).join('')}</ul></section>
    </div>
    <button class="primary-button" type="button" id="start-review-quiz">Start Module ${module.id} quiz</button>`;
}

function renderFallbackGuide(module) {
  const reviewer = module.reviewer;
  return `
    <p class="eyebrow">MODULE ${String(module.id).padStart(2, '0')} REVIEWER</p>
    <h1>${escapeHTML(module.title)}</h1>
    <p class="reviewer-lead">${formatRichText(reviewer.overview)}</p>
    ${reviewer.sections.map(([title, items], index) => `<section class="review-section"><span class="review-section__number">SECTION ${String(index + 1).padStart(2, '0')}</span><h2>${escapeHTML(title)}</h2>${items.map(item => `<div class="formula-card">${formatRichText(item)}</div>`).join('')}</section>`).join('')}
    <div class="review-callout"><strong>Study note:</strong> ${formatRichText(reviewer.tip)}</div>
    <button class="primary-button" type="button" id="start-review-quiz">Start Module ${module.id} quiz</button>`;
}

function spotifyEmbedURL(value) {
  try {
    const url = new URL(value);
    if (url.hostname !== 'open.spotify.com') return null;
    const parts = url.pathname.split('/').filter(Boolean);
    const allowed = new Set(['track', 'album', 'playlist', 'artist', 'episode', 'show']);
    if (parts.length < 2 || !allowed.has(parts[0])) return null;
    return `https://open.spotify.com/embed/${parts[0]}/${parts[1]}?utm_source=generator&theme=0`;
  } catch {
    return null;
  }
}

function updatePersistentSpotify(value) {
  const holder = document.getElementById('persistent-spotify-player');
  const embed = spotifyEmbedURL(value);
  holder.innerHTML = embed
    ? `<iframe src="${escapeHTML(embed)}" title="Spotify embed" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
    : '<div class="empty-state empty-state--compact">Add a Spotify link from the Music tab.</div>';
}

function setSpotifyDockCollapsed(collapsed) {
  const dock = document.getElementById('spotify-dock');
  dock.classList.toggle('is-collapsed', collapsed);
  document.getElementById('spotify-dock-toggle').setAttribute('aria-expanded', String(!collapsed));
  localStorage.setItem('calc:spotifyCollapsed', String(collapsed));
}

function initializeSpotifyDock() {
  const saved = localStorage.getItem('calc:spotify') || '';
  const collapsed = localStorage.getItem('calc:spotifyCollapsed') !== 'false';
  updatePersistentSpotify(saved);
  setSpotifyDockCollapsed(collapsed);
  document.getElementById('spotify-dock-toggle').onclick = () => {
    const dock = document.getElementById('spotify-dock');
    setSpotifyDockCollapsed(!dock.classList.contains('is-collapsed'));
  };
  document.getElementById('spotify-dock-close').onclick = () => setSpotifyDockCollapsed(true);
}

function renderMusic() {
  const saved = localStorage.getItem('calc:spotify') || '';
  setAppHTML(`
    <section class="music-page">
      <p class="eyebrow">PERSISTENT STUDY AUDIO</p>
      <h1>Spotify<br>workspace.</h1>
      <p class="music-page__lead">Paste a public Spotify track, playlist, album, artist, show, or episode link. The player is mounted outside the study pages, so changing between Modules, Reviewer, Quiz, and Music does not reload it.</p>
      <form id="spotify-form" class="spotify-form">
        <input id="spotify-url" type="url" value="${escapeHTML(saved)}" placeholder="https://open.spotify.com/playlist/..." autocomplete="off" required>
        <button class="primary-button" type="submit">Load player</button>
      </form>
      <div id="spotify-error" class="form-error" role="alert"></div>
      <div class="music-actions">
        <button class="secondary-button" type="button" id="toggle-persistent-player">Show or hide persistent player</button>
        <button class="ghost-button" type="button" id="clear-spotify">Clear saved Spotify link</button>
      </div>
      <div class="music-grid">
        <article class="music-info-card"><span>01</span><h3>Press play once</h3><p>Browsers and Spotify block forced autoplay. Start the music inside the Spotify player yourself.</p></article>
        <article class="music-info-card"><span>02</span><h3>Keep studying</h3><p>The player stays alive while the site changes its internal content, so playback should continue between tabs.</p></article>
        <article class="music-info-card"><span>03</span><h3>Volume control</h3><p>Spotify does not expose embed volume controls to this website. Use your device volume or Spotify's own available controls.</p></article>
      </div>
    </section>`);

  document.getElementById('spotify-form').onsubmit = event => {
    event.preventDefault();
    const value = document.getElementById('spotify-url').value.trim();
    if (!spotifyEmbedURL(value)) {
      document.getElementById('spotify-error').textContent = 'Paste a valid public open.spotify.com link.';
      return;
    }
    document.getElementById('spotify-error').textContent = '';
    localStorage.setItem('calc:spotify', value);
    updatePersistentSpotify(value);
    setSpotifyDockCollapsed(false);
  };
  document.getElementById('toggle-persistent-player').onclick = () => {
    const dock = document.getElementById('spotify-dock');
    setSpotifyDockCollapsed(!dock.classList.contains('is-collapsed'));
  };
  document.getElementById('clear-spotify').onclick = () => {
    localStorage.removeItem('calc:spotify');
    document.getElementById('spotify-url').value = '';
    document.getElementById('spotify-error').textContent = '';
    updatePersistentSpotify('');
  };
}

function render() {
  if (state.view === 'reviewer') renderReviewer();
  else if (state.view === 'quiz') renderQuiz();
  else if (state.view === 'music') renderMusic();
  else renderHome();
  bindNavigation();
  typeset(app);
  app.focus({ preventScroll: true });
}

window.addEventListener('popstate', () => {
  const view = location.hash.slice(1);
  state.view = validViews.has(view) ? view : 'home';
  showLoader();
  setTimeout(() => {
    render();
    hideLoader();
  }, 120);
});

initializeSpotifyDock();
render();
setTimeout(hideLoader, 240);
