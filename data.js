const MODULES = [
  {
    id: 1,
    title: "Limits and Continuity",
    description: "Limit laws, one-sided limits, infinite limits, continuity, and algebraic evaluation.",
    reviewer: {
      overview: "A limit describes the value a function approaches as x gets close to a chosen input. The function does not always need to be defined at that exact input.",
      sections: [
        ["Core ideas", ["A two-sided limit exists only when the left-hand and right-hand limits are equal.", "Direct substitution works when the function is continuous at the input.", "An indeterminate form such as 0/0 means simplify first; it is not the final answer."]],
        ["Useful rules", ["lim(f + g) = lim f + lim g", "lim(fg) = (lim f)(lim g)", "lim(f/g) = (lim f)/(lim g), provided the denominator limit is not 0", "For continuity at x = a: f(a) exists, lim x→a f(x) exists, and the two are equal."]],
        ["Common techniques", ["Factor and cancel a common factor.", "Rationalize expressions containing radicals.", "Compare one-sided behavior for piecewise functions.", "Check denominator signs when identifying ±∞ behavior."]]
      ],
      tip: "Do not cancel a factor until it has been factored. Cancellation applies to factors, not separate terms."
    },
    questions: [
      ["What does lim x→a f(x) describe?", ["The value f(x) approaches as x gets close to a", "The largest value of f(x)", "The value of f(x) only when x = a", "The slope of f at x = a"], 0, "A limit concerns nearby behavior, not necessarily the function's exact value at a."],
      ["For a two-sided limit to exist at x = a, which condition is required?", ["The left-hand and right-hand limits must be equal", "The function must be zero at a", "The graph must cross the x-axis", "The derivative must exist at a"], 0, "Matching one-sided limits are required for a two-sided limit."],
      ["Evaluate lim x→3 (2x + 5).", ["11", "8", "10", "13"], 0, "Linear functions are continuous, so substitute x = 3."],
      ["Evaluate lim x→2 (x² − 4)/(x − 2).", ["4", "0", "2", "Does not exist"], 0, "Factor x²−4=(x−2)(x+2), cancel, then substitute."],
      ["What does the form 0/0 usually indicate in a limit problem?", ["The expression should be simplified before evaluating", "The limit is automatically zero", "The limit is automatically undefined", "The function is continuous"], 0, "0/0 is indeterminate, so further algebra is needed."],
      ["Evaluate lim x→4 (√x − 2)/(x − 4).", ["1/4", "1/2", "2", "4"], 0, "Rationalizing gives 1/(√x+2), which approaches 1/4."],
      ["If lim x→a− f(x)=2 and lim x→a+ f(x)=5, what is lim x→a f(x)?", ["It does not exist", "2", "5", "7"], 0, "The one-sided limits disagree."],
      ["Which statement is required for f to be continuous at x = a?", ["lim x→a f(x) = f(a)", "f(a) must equal 0", "The derivative must be positive", "The function must be linear"], 0, "Continuity means the limit exists and equals the function value."],
      ["Evaluate lim x→−1 (x³ + 1)/(x + 1).", ["3", "−3", "1", "0"], 0, "Factor x³+1=(x+1)(x²−x+1), then substitute −1."],
      ["If a denominator approaches 0 from the positive side while the numerator approaches a positive number, the quotient tends to:", ["+∞", "−∞", "0", "1"], 0, "Positive divided by a very small positive number grows without bound."],
      ["Which function is continuous for every real x?", ["f(x)=x³−2x+1", "f(x)=1/x", "f(x)=√(x−2)", "f(x)=tan x"], 0, "Every polynomial is continuous on all real numbers."],
      ["Evaluate lim x→0 sin x / x.", ["1", "0", "−1", "Does not exist"], 0, "This is a fundamental trigonometric limit."],
      ["Evaluate lim x→0 (1−cos x)/x.", ["0", "1", "−1", "+∞"], 0, "Using standard trig limits, the expression approaches 0."],
      ["A removable discontinuity is commonly represented by:", ["A hole that can be filled by redefining one function value", "A vertical asymptote", "An interval where the function is decreasing", "A sharp corner"], 0, "A removable discontinuity is a missing point where the nearby limit exists."],
      ["For f(x)=(x²−9)/(x−3), what value should be assigned to f(3) to make f continuous?", ["6", "3", "0", "9"], 0, "After cancellation, the nearby function is x+3, which equals 6 at x=3."],
      ["Evaluate lim x→∞ (3x²+1)/(x²−4).", ["3", "1", "0", "+∞"], 0, "For equal polynomial degrees, use the ratio of leading coefficients."],
      ["Evaluate lim x→∞ (5x+2)/(x²+1).", ["0", "5", "1", "+∞"], 0, "The denominator has higher degree, so the fraction approaches 0."],
      ["Which action is valid when simplifying (x²−4)/(x−2)?", ["Factor x²−4, then cancel the common factor x−2", "Cancel the two x terms directly", "Subtract 2 from numerator and denominator", "Set both numerator and denominator equal to zero"], 0, "Only common factors may be canceled."],
      ["If f is continuous at a and lim x→a g(x)=L, then lim x→a f(g(x)) equals:", ["f(L)", "L", "f(a)", "a"], 0, "A continuous outer function allows the limit to pass through it."],
      ["Which condition alone is not enough to prove continuity at x=a?", ["f(a) exists", "The limit exists and equals f(a)", "Both one-sided limits equal f(a)", "The function has no break near a"], 0, "A function value can exist even when the nearby limit differs or does not exist."]
    ]
  },
  {
    id: 2,
    title: "Differentiation",
    description: "Derivative definition, power, product, quotient, and chain rules.",
    reviewer: {
      overview: "A derivative measures instantaneous rate of change and the slope of a tangent line. Differentiation rules make this faster than repeatedly using the limit definition.",
      sections: [
        ["Core formulas", ["d/dx(c)=0", "d/dx(xⁿ)=nxⁿ⁻¹", "(uv)'=u'v+uv'", "(u/v)'=(vu'−uv')/v²", "d/dx f(g(x)) = f'(g(x))g'(x)"]],
        ["Interpretation", ["f'(a) is the slope of the tangent line at x=a.", "Velocity is the derivative of position; acceleration is the derivative of velocity.", "A derivative may fail to exist at corners, cusps, vertical tangents, and discontinuities."]]
      ],
      tip: "The Chain Rule adds the derivative of the inside function. Missing that factor is one of the most common errors."
    },
    questions: [
      ["What does f'(a) represent geometrically?", ["The slope of the tangent line at x=a", "The y-intercept of f", "The area under f", "The average of all slopes"], 0, "The derivative at a point is the tangent slope."],
      ["Differentiate f(x)=x⁵.", ["5x⁴", "x⁴", "5x⁵", "x⁶/6"], 0, "Apply the Power Rule."],
      ["Differentiate f(x)=7x³−4x+9.", ["21x²−4", "21x²−4x", "7x²−4", "21x³−4"], 0, "Differentiate each term; constants become zero."],
      ["Differentiate f(x)=1/x².", ["−2/x³", "2/x", "−1/x", "2/x³"], 0, "Rewrite as x⁻² and use the Power Rule."],
      ["Which formula is the Product Rule?", ["(uv)'=u'v+uv'", "(uv)'=u'v'", "(uv)'=u/v", "(uv)'=u'+v'"], 0, "Differentiate one factor at a time while keeping the other."],
      ["Differentiate y=x²eˣ.", ["2xeˣ+x²eˣ", "2xeˣ", "x²eˣ", "2x²eˣ"], 0, "Use the Product Rule."],
      ["Differentiate y=(x²+1)/(x−1).", ["[2x(x−1)−(x²+1)]/(x−1)²", "[2x(x−1)+(x²+1)]/(x−1)²", "2x/(x−1)", "(2x−1)/(x−1)"], 0, "Use denominator times derivative of numerator minus numerator times derivative of denominator."],
      ["Differentiate y=(3x+1)⁴.", ["12(3x+1)³", "4(3x+1)³", "12(3x+1)⁴", "3(3x+1)³"], 0, "Apply the Chain Rule: outer derivative times inner derivative 3."],
      ["Differentiate y=sin x.", ["cos x", "−cos x", "sin x", "−sin x"], 0, "The derivative of sine is cosine."],
      ["Differentiate y=cos x.", ["−sin x", "sin x", "−cos x", "tan x"], 0, "The derivative of cosine is negative sine."],
      ["Differentiate y=eˣ.", ["eˣ", "xeˣ⁻¹", "ln x", "1/eˣ"], 0, "The natural exponential is its own derivative."],
      ["Differentiate y=ln x.", ["1/x", "ln x", "x", "eˣ"], 0, "The derivative of ln x is 1/x."],
      ["If s(t)=t³−6t, what is the velocity?", ["3t²−6", "t²−6", "3t−6", "t³−6"], 0, "Velocity is the derivative of position."],
      ["For f(x)=x², what is f'(3)?", ["6", "3", "9", "2"], 0, "f'(x)=2x, so f'(3)=6."],
      ["Where can a derivative fail to exist?", ["At a sharp corner", "At every x-intercept", "At every local maximum", "Only when f(x)=0"], 0, "A sharp corner has no single tangent slope."],
      ["Differentiate y=√x.", ["1/(2√x)", "√x/2", "2√x", "1/√x"], 0, "Rewrite as x^(1/2)."],
      ["Differentiate y=(2x²−1)⁵.", ["20x(2x²−1)⁴", "10x(2x²−1)⁴", "5(2x²−1)⁴", "20x(2x²−1)⁵"], 0, "Outer derivative gives 5(... )⁴ and inner derivative gives 4x."],
      ["Which expression defines f'(x) using limits?", ["lim h→0 [f(x+h)−f(x)]/h", "lim h→0 [f(x+h)+f(x)]/h", "lim x→0 f(x)/x", "lim h→∞ [f(x+h)−f(x)]"], 0, "This is the difference quotient definition."],
      ["Differentiate y=tan x.", ["sec²x", "csc²x", "−sec²x", "sin x"], 0, "The derivative of tangent is secant squared."],
      ["A constant function has derivative:", ["0", "1", "The same constant", "Undefined"], 0, "A horizontal line has slope zero everywhere."]
    ]
  },
  {
    id: 3,
    title: "Other Forms of the Derivative",
    description: "Implicit, logarithmic, higher-order, parametric, and inverse derivatives.",
    reviewer: {
      overview: "Some equations are easier to differentiate without first solving for y. Other forms include implicit differentiation, logarithmic differentiation, higher derivatives, and parametric derivatives.",
      sections: [
        ["Implicit differentiation", ["Differentiate both sides with respect to x.", "Every derivative of a y-term must include dy/dx by the Chain Rule.", "Collect all dy/dx terms before solving."]],
        ["Other forms", ["The second derivative f'' describes how the first derivative changes.", "For parametric equations, dy/dx=(dy/dt)/(dx/dt), provided dx/dt≠0.", "Logarithmic differentiation is useful when variables appear in both bases and exponents or in complicated products."]]
      ],
      tip: "When differentiating y² with respect to x, write 2y(dy/dx), not only 2y."
    },
    questions: [
      ["In implicit differentiation, why does d/dx(y²)=2y(dy/dx)?", ["Because y is treated as a function of x", "Because y is a constant", "Because the Product Rule is required", "Because y² equals x²"], 0, "The Chain Rule introduces dy/dx."],
      ["For x²+y²=25, what is dy/dx?", ["−x/y", "x/y", "−y/x", "2x+2y"], 0, "Differentiate to get 2x+2y y'=0."],
      ["For xy=10, what is dy/dx?", ["−y/x", "y/x", "−x/y", "1/x"], 0, "Product Rule: x y' + y = 0."],
      ["What does f''(x) represent?", ["The rate of change of f'(x)", "The original function", "The area under f", "The inverse of f'"], 0, "The second derivative differentiates the first derivative."],
      ["If s(t)=t⁴, what is acceleration?", ["12t²", "4t³", "24t", "t²"], 0, "Velocity is 4t³ and acceleration is 12t²."],
      ["For x=t² and y=t³, what is dy/dx?", ["3t/2", "2t/3", "3t²/2", "t"], 0, "Divide dy/dt=3t² by dx/dt=2t."],
      ["When is logarithmic differentiation especially useful?", ["When the variable appears in both the base and exponent", "Only for linear functions", "Only when y is already isolated", "When there are no products or powers"], 0, "Taking logs simplifies variable exponents and complex products."],
      ["Differentiate y=xˣ for x>0.", ["xˣ(ln x+1)", "x·xˣ⁻¹", "xˣ ln x", "xˣ/x"], 0, "Take ln y=x ln x, differentiate, then multiply by y."],
      ["Differentiate implicitly: x³+y³=6xy.", ["(2y−x²)/(y²−2x)", "(x²−2y)/(y²−2x)", "(2x−y²)/(x²−2y)", "(x²+y²)/(2x+2y)"], 0, "3x²+3y²y'=6y+6xy'; solve for y'."],
      ["The derivative of sin⁻¹x is:", ["1/√(1−x²)", "−1/√(1−x²)", "1/(1+x²)", "sec²x"], 0, "This is the standard inverse sine derivative."],
      ["The derivative of tan⁻¹x is:", ["1/(1+x²)", "1/√(1−x²)", "sec²x", "−1/(1+x²)"], 0, "This is the standard inverse tangent derivative."],
      ["If y is defined implicitly, the final derivative may:", ["Contain both x and y", "Never contain y", "Always equal zero", "Require no algebra"], 0, "An implicit derivative often remains in terms of both variables."],
      ["For x²−xy+y²=7, differentiating −xy requires:", ["The Product Rule", "Only the Power Rule", "The Quotient Rule", "No differentiation"], 0, "Both x and y vary with x."],
      ["If f'(x)=3x² and f''(x)=6x, what is f'''(x)?", ["6", "6x", "3", "0"], 0, "Differentiate 6x once more."],
      ["For parametric equations, a vertical tangent can occur when:", ["dx/dt=0 while dy/dt≠0", "dy/dt=0 while dx/dt≠0", "x=t", "Both derivatives equal 1"], 0, "dy/dx becomes unbounded when the denominator is zero."],
      ["For parametric equations, a horizontal tangent can occur when:", ["dy/dt=0 while dx/dt≠0", "dx/dt=0 while dy/dt≠0", "Both derivatives are undefined", "x and y are equal"], 0, "dy/dx equals zero when its numerator is zero."],
      ["Differentiate y=ln(x²+1).", ["2x/(x²+1)", "1/(x²+1)", "2/(x²+1)", "ln(2x)"], 0, "Use the Chain Rule for ln u."],
      ["Which is the best first step for y=(x²+1)ˣ?", ["Take the natural logarithm of both sides", "Apply only the Power Rule", "Expand the exponent", "Set x equal to zero"], 0, "Logarithmic differentiation handles the variable exponent."],
      ["If x=cos t and y=sin t, then dy/dx equals:", ["−cot t", "tan t", "cot t", "−tan t"], 0, "(cos t)/(−sin t)=−cot t."],
      ["Why are higher-order derivatives useful?", ["They describe changes in rates such as acceleration and concavity", "They always make functions linear", "They remove all variables", "They replace integration"], 0, "Higher derivatives describe how lower-order rates change."]
    ]
  },
  {
    id: 4,
    title: "Applications of Derivatives",
    description: "Critical points, extrema, monotonicity, concavity, optimization, and related rates.",
    reviewer: {
      overview: "Derivatives help analyze behavior, locate extrema, solve optimization problems, and connect quantities that change with time.",
      sections: [
        ["Function analysis", ["Critical numbers occur where f'(x)=0 or f'(x) does not exist, provided x is in the domain.", "f'>0 means increasing; f'<0 means decreasing.", "f''>0 means concave up; f''<0 means concave down.", "A sign change in f' identifies local extrema."]],
        ["Problem solving", ["Optimization: define variables, write the objective function, use constraints, differentiate, test candidates.", "Related rates: write an equation linking variables, differentiate with respect to time, then substitute known values.", "Linear approximation: L(x)=f(a)+f'(a)(x−a)."]]
      ],
      tip: "In related-rates problems, differentiate before substituting numerical values unless the quantity is truly constant."
    },
    questions: [
      ["A critical number of f occurs where:", ["f'(x)=0 or f'(x) does not exist, with x in the domain", "f(x)=0 only", "f''(x)=0 only", "The graph crosses the y-axis"], 0, "This is the definition of a critical number."],
      ["If f'(x)>0 on an interval, f is:", ["Increasing", "Decreasing", "Constant", "Concave down"], 0, "A positive derivative means positive slope."],
      ["If f'(x) changes from positive to negative at c, f has a:", ["Local maximum at c", "Local minimum at c", "Vertical asymptote at c", "Point of discontinuity at c"], 0, "The function changes from increasing to decreasing."],
      ["If f'(x) changes from negative to positive at c, f has a:", ["Local minimum at c", "Local maximum at c", "Horizontal asymptote", "Point with no domain"], 0, "The function changes from decreasing to increasing."],
      ["If f''(x)>0, the graph is:", ["Concave up", "Concave down", "Always increasing", "Always decreasing"], 0, "Positive second derivative means slopes are increasing."],
      ["A possible inflection point occurs where:", ["Concavity changes", "f(x)=0", "f'(x) is positive", "The function reaches an endpoint"], 0, "An inflection point requires an actual change in concavity."],
      ["For f(x)=x²−4x, where is the critical number?", ["x=2", "x=4", "x=−2", "x=0"], 0, "f'(x)=2x−4=0 gives x=2."],
      ["For f(x)=x³−3x, what are the critical numbers?", ["x=−1 and x=1", "x=0 and x=3", "x=−3 and x=3", "x=1 only"], 0, "f'=3x²−3=0."],
      ["What is the first step in a typical optimization problem?", ["Identify variables and the quantity to maximize or minimize", "Differentiate every equation immediately", "Assume the answer is an endpoint", "Ignore the constraints"], 0, "A clear objective and variables are needed first."],
      ["Why must endpoints be checked in a closed-interval optimization problem?", ["An absolute extremum may occur at an endpoint", "Derivatives never work inside intervals", "Endpoints are always critical numbers", "The function is undefined inside"], 0, "Absolute extrema can occur at critical numbers or endpoints."],
      ["A circle's radius increases at 2 cm/s. Which equation relates area and radius?", ["A=πr²", "A=2πr", "A=4πr²", "A=πr"], 0, "Use the circle area formula before differentiating with respect to time."],
      ["For A=πr², what is dA/dt?", ["2πr·dr/dt", "π(dr/dt)²", "2π·dr/dt", "πr·dr/dt"], 0, "Differentiate using the Chain Rule."],
      ["Which theorem guarantees at least one c with f'(c)=[f(b)−f(a)]/(b−a)?", ["Mean Value Theorem", "Intermediate Value Theorem", "Fundamental Theorem of Calculus", "Squeeze Theorem"], 0, "This is the Mean Value Theorem."],
      ["Rolle's Theorem additionally requires:", ["f(a)=f(b)", "f'(a)=f'(b)", "f(a)=0", "f''(x)>0"], 0, "Rolle's Theorem is a special case of the MVT with equal endpoint values."],
      ["What is the linearization of f at x=a?", ["L(x)=f(a)+f'(a)(x−a)", "L(x)=f'(a)x", "L(x)=f(x)+a", "L(x)=f(a)(x−a)"], 0, "Linearization uses the tangent line."],
      ["If f'' changes from positive to negative at x=c, the graph changes from:", ["Concave up to concave down", "Increasing to decreasing", "Negative to positive values", "Continuous to discontinuous"], 0, "The sign of f'' controls concavity."],
      ["For f(x)=−x²+6x, the maximum occurs at:", ["x=3", "x=6", "x=−3", "x=0"], 0, "The vertex or f'=−2x+6=0 gives x=3."],
      ["In a related-rates problem, all changing quantities should usually be treated as:", ["Functions of time", "Fixed constants", "Independent of one another", "Angles measured only in degrees"], 0, "They vary with time even if time is not shown explicitly."],
      ["If velocity is negative, an object's position is:", ["Decreasing at that instant", "Always below zero", "Increasing at that instant", "At a local maximum"], 0, "Negative velocity means position decreases with time."],
      ["If velocity and acceleration have the same sign, speed is generally:", ["Increasing", "Decreasing", "Zero", "Undefined"], 0, "Acceleration reinforces the direction of velocity."]
    ]
  },
  {
    id: 5,
    title: "Antidifferentiation",
    description: "Indefinite integrals, basic rules, initial-value problems, and u-substitution foundations.",
    reviewer: {
      overview: "Antidifferentiation reverses differentiation. An indefinite integral represents a family of antiderivatives, so the constant of integration must be included.",
      sections: [
        ["Basic rules", ["∫xⁿ dx = xⁿ⁺¹/(n+1)+C, n≠−1", "∫1/x dx = ln|x|+C", "∫eˣ dx=eˣ+C", "∫sin x dx=−cos x+C", "∫cos x dx=sin x+C"]],
        ["Linearity", ["Constants may be factored outside the integral.", "Sums and differences may be integrated term by term.", "The Power Rule does not apply to x⁻¹."]],
        ["Checking answers", ["Differentiate an antiderivative to recover the integrand.", "Use an initial condition to solve for C."]]
      ],
      tip: "The +C is necessary because all constant shifts have the same derivative."
    },
    questions: [
      ["Which integration rule allows a constant coefficient to be moved outside the integral?", ["Constant Multiple Rule", "Power Rule", "Product Rule", "Quotient Rule"], 0, "A true constant can be factored outside."],
      ["Why is ∫x⁻¹dx not solved with the ordinary Power Rule?", ["The formula would require division by zero", "x⁻¹ is not a function", "The exponent is negative", "The derivative does not exist"], 0, "For n=−1, n+1=0, so a separate logarithmic rule is used."],
      ["Evaluate ∫x⁴ dx.", ["x⁵/5+C", "4x³+C", "x⁵+C", "5x⁴+C"], 0, "Increase the exponent by one and divide by the new exponent."],
      ["Evaluate ∫6x² dx.", ["2x³+C", "6x³+C", "3x²+C", "12x+C"], 0, "6·x³/3=2x³."],
      ["Evaluate ∫(4x²+7x)dx.", ["(4/3)x³+(7/2)x²+C", "4x³+7x²+C", "8x+7+C", "(4/3)x³+7x+C"], 0, "Use the Sum Rule and Power Rule term by term."],
      ["Evaluate ∫1/x dx.", ["ln|x|+C", "1/x²+C", "x ln x+C", "ln x without restrictions"], 0, "The absolute value covers positive and negative x in the domain."],
      ["Why is the absolute value used in ln|x|?", ["Because 1/x is defined for positive and negative nonzero x", "To force the integral to be positive", "To remove the constant C", "Because logarithms are always negative"], 0, "ln|x| differentiates to 1/x on either side of zero."],
      ["Evaluate ∫eˣ dx.", ["eˣ+C", "xeˣ+C", "ln x+C", "eˣ/x+C"], 0, "eˣ is its own antiderivative."],
      ["Evaluate ∫sin x dx.", ["−cos x+C", "cos x+C", "sin x+C", "tan x+C"], 0, "The derivative of −cos x is sin x."],
      ["Evaluate ∫cos x dx.", ["sin x+C", "−sin x+C", "cos x+C", "sec²x+C"], 0, "The derivative of sin x is cos x."],
      ["What does +C represent?", ["The family of all constant shifts of an antiderivative", "A required positive number", "The coefficient of x", "The area under every curve"], 0, "Constants disappear when differentiated."],
      ["Which statement best describes antidifferentiation?", ["It finds a function whose derivative is the integrand", "It finds only the slope at one point", "It always gives a numerical area", "It replaces x with u"], 0, "An antiderivative reverses differentiation."],
      ["If F'(x)=3x² and F(0)=5, find F(x).", ["x³+5", "3x³+5", "x³", "6x+5"], 0, "Integrate to x³+C, then use F(0)=5."],
      ["Evaluate ∫(2/x)dx.", ["2ln|x|+C", "ln|2x| without C", "2/x²+C", "x²+C"], 0, "Factor out 2 and integrate 1/x."],
      ["Which proposed use of the Constant Multiple Rule is invalid?", ["Moving x outside ∫x·f(x)dx as though x were constant", "Moving 7 outside ∫7f(x)dx", "Moving −2 outside ∫−2sin x dx", "Moving π outside ∫πx²dx"], 0, "x is the variable of integration, not a constant."],
      ["Evaluate ∫sec²x dx.", ["tan x+C", "sec x+C", "−cot x+C", "sin x+C"], 0, "The derivative of tan x is sec²x."],
      ["Evaluate ∫1/(1+x²) dx.", ["tan⁻¹x+C", "sin⁻¹x+C", "ln|x|+C", "sec²x+C"], 0, "This is the standard inverse tangent form."],
      ["How can an indefinite integral answer be checked?", ["Differentiate it and compare with the integrand", "Integrate it again", "Set C equal to zero", "Replace x with 1"], 0, "Differentiation should recover the original integrand."],
      ["Evaluate ∫(3−2x)dx.", ["3x−x²+C", "3−x²+C", "3x−2x²+C", "x³−x²+C"], 0, "Integrate each term separately."],
      ["What is the most accurate meaning of ∫f(x)dx?", ["A family of antiderivatives of f", "One fixed number", "The derivative of f", "The domain of f"], 0, "An indefinite integral is a function family, not a single area value."]
    ]
  },
  {
    id: 6,
    title: "Techniques of Integration",
    description: "u-substitution, integration by parts, and selecting an appropriate method.",
    reviewer: {
      overview: "Integration techniques reverse familiar derivative patterns. The integrand's structure determines the best method.",
      sections: [
        ["u-substitution", ["Best for a composite function together with a constant multiple of its inner derivative.", "Choose u as the inner expression; rewrite the entire integral in terms of u.", "It is the reverse process of the Chain Rule."]],
        ["Integration by parts", ["Formula: ∫u dv = uv − ∫v du", "It comes from rearranging and integrating the Product Rule.", "It is useful for products such as algebraic × exponential, algebraic × trig, or logarithmic expressions."]],
        ["Choosing a method", ["A product does not automatically require integration by parts.", "A product like x cos(x²) has a Chain Rule structure and is better suited to substitution.", "Choose u in integration by parts so differentiation makes it simpler."]]
      ],
      tip: "After substitution, every x should disappear before integrating in u."
    },
    questions: [
      ["Why does u-substitution simplify certain integrals?", ["It turns a composite pattern into a simpler one-variable integral", "It removes every coefficient", "It changes every product into a quotient", "It avoids using antiderivatives"], 0, "It reverses the Chain Rule structure."],
      ["Which differentiation rule is reversed by u-substitution?", ["Chain Rule", "Product Rule", "Quotient Rule", "Constant Rule"], 0, "Substitution replaces an inner function and its differential."],
      ["For ∫2x(x²+1)⁴dx, the best choice for u is:", ["x²+1", "2x", "x", "(x²+1)⁴"], 0, "The derivative of x²+1 is 2x, which is present."],
      ["Why must every x disappear after a complete u-substitution?", ["The integral must be written entirely in one variable", "x is never allowed in calculus", "It guarantees the answer is zero", "It converts the integral to integration by parts"], 0, "Mixing x and u usually means the substitution is incomplete."],
      ["Evaluate ∫2x(x²+1)⁴dx.", ["(x²+1)⁵/5+C", "2(x²+1)⁵/5+C", "x²(x²+1)⁴+C", "(x²+1)⁴/4+C"], 0, "Let u=x²+1 and du=2x dx."],
      ["Which formula is integration by parts?", ["∫u dv=uv−∫v du", "∫u dv=u/v", "∫u dv=uv+∫v du", "∫u dv=u'v'"], 0, "This formula follows from the Product Rule."],
      ["Integration by parts is most directly related to reversing the:", ["Product Rule", "Chain Rule", "Power Rule", "Quotient Rule"], 0, "The Product Rule is rearranged and integrated."],
      ["Why is a suitable choice of u important in integration by parts?", ["Differentiating u should help simplify the remaining integral", "u must always be exponential", "u must always be the second factor", "It removes the need to find v"], 0, "A poor choice can make the integral harder."],
      ["For ∫xeˣdx, a useful choice is:", ["u=x and dv=eˣdx", "u=eˣ and dv=x dx only", "u=xeˣ", "u=1 and dv=xeˣdx"], 0, "Differentiating x simplifies it to 1 while eˣ is easy to integrate."],
      ["Evaluate ∫xeˣdx.", ["xeˣ−eˣ+C", "xeˣ+eˣ+C", "x²eˣ/2+C", "eˣ+C"], 0, "Use integration by parts with u=x."],
      ["Which technique is best for ∫x cos(x²)dx?", ["u-substitution", "Integration by parts", "Partial fractions", "No technique can apply"], 0, "The inner derivative 2x is present up to a constant."],
      ["A student says every product requires integration by parts. The best evaluation is:", ["Incorrect, because some products have a Chain Rule structure", "Correct, because all products reverse the Product Rule", "Correct, provided both factors contain x", "Incorrect, because integration by parts is never used on products"], 0, "The structure, not just the presence of multiplication, determines the method."],
      ["For ∫ln x dx, a standard setup is:", ["u=ln x and dv=dx", "u=x and dv=ln x dx", "u=1/x and dv=x dx", "u=eˣ and dv=dx"], 0, "Treat ln x as ln x·1 and differentiate the logarithm."],
      ["Evaluate ∫ln x dx.", ["x ln x−x+C", "(ln x)²/2+C", "x ln x+C", "1/x+C"], 0, "Integration by parts gives x ln x−x."],
      ["Which method is best for ∫3x²/(x³+4)dx?", ["u-substitution", "Integration by parts", "Basic Power Rule only", "Trigonometric identities"], 0, "The denominator's derivative is 3x²."],
      ["Evaluate ∫3x²/(x³+4)dx.", ["ln|x³+4|+C", "3ln|x³+4|+C", "1/(x³+4)+C", "(x³+4)²/2+C"], 0, "Let u=x³+4."],
      ["Why does integration by parts often simplify a product integral?", ["It transfers differentiation to one factor and integration to the other", "It eliminates the constant of integration", "It always produces a polynomial", "It changes both factors into constants"], 0, "The method redistributes the operations to form a simpler integral."],
      ["For ∫x sin x dx, the result is:", ["−x cos x+sin x+C", "x cos x−sin x+C", "x sin x+cos x+C", "−x sin x+C"], 0, "Use u=x and dv=sin x dx."],
      ["Which evaluation is best for using integration by parts on ∫2x(x²+1)⁴dx?", ["It is possible in principle but poorly chosen; substitution directly matches the structure", "It is the only valid technique", "It is invalid because integration by parts cannot involve powers", "It gives the answer without another integral"], 0, "Substitution is the natural efficient method."],
      ["When both a product and a composite function appear, which rule should be followed?", ["Inspect the full integrand and choose the method matching its derivative structure", "Always use integration by parts first", "Always use substitution first", "Multiply everything out regardless of complexity"], 0, "There is no universal priority; structure determines the technique."]
    ]
  },
  {
    id: 7,
    title: "The Definite Integral and Applications",
    description: "Riemann sums, the Fundamental Theorem, signed area, average value, and applications.",
    reviewer: {
      overview: "A definite integral gives accumulated signed change over an interval. The Fundamental Theorem of Calculus connects accumulation and differentiation.",
      sections: [
        ["Definite integrals", ["∫ₐᵇ f(x)dx = F(b)−F(a), where F'=f.", "Area above the x-axis contributes positively; area below contributes negatively.", "Reversing limits changes the sign.", "If the limits are equal, the integral is 0."]],
        ["Applications", ["Total geometric area may require splitting at x-intercepts and using absolute values.", "Average value: (1/(b−a))∫ₐᵇf(x)dx.", "Net change equals the integral of a rate.", "Distance traveled uses the integral of speed |v(t)|, not simply velocity."]],
        ["FTC", ["d/dx ∫ₐˣ f(t)dt=f(x) for continuous f.", "With a variable upper limit g(x), use the Chain Rule: f(g(x))g'(x)."]]
      ],
      tip: "A definite integral is signed area. It is not automatically the same as total geometric area."
    },
    questions: [
      ["What does a definite integral primarily represent?", ["Accumulated signed change over an interval", "Only the maximum value of a function", "A family of antiderivatives", "The slope at one point"], 0, "A definite integral returns a number describing net accumulation."],
      ["According to the Fundamental Theorem, ∫ₐᵇf(x)dx equals:", ["F(b)−F(a), where F'=f", "F(a)−F(b)", "f(b)−f(a)", "F(a)+F(b)"], 0, "Evaluate an antiderivative at upper minus lower limit."],
      ["Evaluate ∫₀² x dx.", ["2", "1", "4", "0"], 0, "x²/2 from 0 to 2 equals 2."],
      ["Evaluate ∫₁³ 2x dx.", ["8", "4", "6", "10"], 0, "x² from 1 to 3 equals 9−1=8."],
      ["What happens when the limits of integration are reversed?", ["The sign of the integral changes", "The value stays exactly the same", "The result becomes zero", "The integrand is differentiated"], 0, "∫ᵦᵃf=−∫ₐᵦf."],
      ["Evaluate ∫₄⁴ f(x)dx.", ["0", "f(4)", "1", "Undefined"], 0, "An interval of zero width has zero accumulation."],
      ["If f(x) is below the x-axis on [a,b], then ∫ₐᵇf(x)dx is generally:", ["Negative", "Positive", "Always zero", "Undefined"], 0, "Area below the axis contributes negatively."],
      ["To find total geometric area when a function crosses the x-axis, you should:", ["Split the interval and add absolute areas", "Use the signed integral without checking", "Differentiate the function", "Reverse every limit"], 0, "Negative signed portions must be converted to positive area."],
      ["What is the average value of f on [a,b]?", ["(1/(b−a))∫ₐᵇf(x)dx", "∫ₐᵇf(x)dx", "[f(a)+f(b)]/2 always", "f'(b)−f'(a)"], 0, "Divide total accumulation by interval length."],
      ["Evaluate the average value of f(x)=x on [0,2].", ["1", "2", "1/2", "4"], 0, "(1/2)∫₀²x dx=(1/2)(2)=1."],
      ["If v(t) is velocity, ∫ₐᵇv(t)dt gives:", ["Displacement", "Total distance in every case", "Acceleration", "Average speed"], 0, "Integrating velocity gives net position change."],
      ["To calculate total distance traveled, integrate:", ["|v(t)|", "v(t) without checking signs", "a(t)", "s(t)"], 0, "Distance accumulates speed, the absolute value of velocity."],
      ["If F(x)=∫₀ˣ(t²+1)dt, what is F'(x)?", ["x²+1", "2x", "x³/3+x", "t²+1"], 0, "FTC Part 1 returns the integrand evaluated at x."],
      ["If G(x)=∫₁ˣ² cos t dt, what is G'(x)?", ["2x cos(x²)", "cos(x²)", "−2x sin(x²)", "sin(x²)"], 0, "Use FTC and multiply by the derivative of x²."],
      ["A Riemann sum approximates a definite integral using:", ["Areas of many rectangles", "Only tangent lines", "A single derivative", "Roots of the function"], 0, "The rectangle sums approach the integral as widths shrink."],
      ["As the number of Riemann-sum subintervals increases, the approximation generally:", ["Becomes more accurate when the function behaves regularly", "Always becomes zero", "Changes into a derivative", "Loses all relation to area"], 0, "Narrower rectangles usually improve the approximation."],
      ["Evaluate ∫₀¹ 3x² dx.", ["1", "3", "1/3", "0"], 0, "An antiderivative is x³; evaluate from 0 to 1."],
      ["If a rate r(t) measures liters per minute, then ∫ₐᵇr(t)dt has units of:", ["Liters", "Liters per minute", "Minutes per liter", "Liters squared"], 0, "Rate multiplied by time gives amount."],
      ["Which statement correctly distinguishes indefinite and definite integrals?", ["An indefinite integral is a family of functions; a definite integral is a number", "Both always produce one number", "Both require +C in the final result", "A definite integral never uses antiderivatives"], 0, "The outputs and notation serve different purposes."],
      ["If ∫₀⁵f(x)dx=7 and ∫₅⁹f(x)dx=−2, then ∫₀⁹f(x)dx equals:", ["5", "9", "−14", "7/2"], 0, "Use interval additivity: 7+(−2)=5."]
    ]
  }
];

const REVIEWER_GUIDES = {
  1: {
    intro: "Module 1 is about predicting what a function is moving toward. A limit does not ask only for the value at one point. It asks what the nearby values are approaching from the left and from the right. Once that idea is clear, continuity becomes easier because a continuous function has no mismatch between the approaching value and the actual function value.",
    goals: [
      "Explain a limit in words instead of treating it as a symbol to memorize.",
      "Choose between direct substitution, factoring, rationalizing, and one-sided analysis.",
      "Decide whether a two-sided limit exists.",
      "Check all three conditions required for continuity at a point."
    ],
    sections: [
      {
        title: "What a limit really means",
        paragraphs: [
          "When we write \\(\\lim_{x\\to a} f(x)=L\\), we mean that the output \\(f(x)\\) becomes as close as we want to \\(L\\) when \\(x\\) is taken sufficiently close to \\(a\\). The value \\(f(a)\\) may equal \\(L\\), may be different from \\(L\\), or may not exist at all.",
          "The important idea is movement near the input. Imagine walking toward a doorway from both sides. The limit exists only if both approaches lead to the same place."
        ],
        formulas: [
          { label: "TWO-SIDED LIMIT", latex: "\\lim_{x\\to a} f(x)=L", note: "The function values approach \\(L\\) as \\(x\\) approaches \\(a\\)." },
          { label: "ONE-SIDED TEST", latex: "\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)=L", note: "A two-sided limit exists only when the left-hand and right-hand limits agree." }
        ],
        example: {
          title: "Worked example: direct substitution",
          problem: "Evaluate \\(\\lim_{x\\to 3}(2x+5)\\).",
          steps: [
            "The function \\(2x+5\\) is a polynomial, so it is continuous everywhere.",
            "Substitute \\(x=3\\): \\(2(3)+5=11\\).",
            "Therefore, \\(\\lim_{x\\to 3}(2x+5)=11\\)."
          ]
        }
      },
      {
        title: "When substitution gives 0/0",
        paragraphs: [
          "The form \\(0/0\\) is called indeterminate. It does not mean the answer is zero, and it does not automatically mean the limit does not exist. It means the original expression is hiding useful algebraic structure.",
          "For rational expressions, factor first and cancel only common factors. For radical expressions, multiply by the conjugate. After simplifying, substitute again."
        ],
        formulas: [
          { label: "FACTORING PATTERN", latex: "x^2-a^2=(x-a)(x+a)" },
          { label: "CONJUGATE PATTERN", latex: "(\\sqrt{x}-a)(\\sqrt{x}+a)=x-a^2" }
        ],
        example: {
          title: "Worked example: factor and cancel",
          problem: "Evaluate \\(\\lim_{x\\to 2}\\frac{x^2-4}{x-2}\\).",
          steps: [
            "Direct substitution gives \\(0/0\\), so simplify first.",
            "Factor the numerator: \\(x^2-4=(x-2)(x+2)\\).",
            "For \\(x\\neq2\\), cancel the common factor \\(x-2\\), leaving \\(x+2\\).",
            "Now substitute \\(x=2\\). The limit is \\(4\\)."
          ]
        }
      },
      {
        title: "Continuity and infinite behavior",
        paragraphs: [
          "A function is continuous at \\(x=a\\) when three things are all true: the function value exists, the limit exists, and the two are equal. Missing even one condition means the function is not continuous there.",
          "When a denominator approaches zero while the numerator stays nonzero, the function may grow without bound. The sign matters. Approaching zero from the positive side can produce \\(+\\infty\\), while approaching from the negative side can produce \\(-\\infty\\)."
        ],
        formulas: [
          { label: "CONTINUITY TEST", latex: "f(a)\\text{ exists},\\quad \\lim_{x\\to a}f(x)\\text{ exists},\\quad \\lim_{x\\to a}f(x)=f(a)" },
          { label: "END BEHAVIOR IDEA", latex: "\\lim_{x\\to\\infty}\\frac{a_nx^n+\\cdots}{b_mx^m+\\cdots}" , note: "Compare the highest powers when evaluating rational functions at infinity." }
        ]
      }
    ],
    summary: "A limit is the nearby destination of a function. First try substitution. If substitution gives \\(0/0\\), simplify. If the question involves a break or a piecewise rule, compare the left and right sides. For continuity, make sure the limit and the actual value match.",
    mistakes: [
      "Treating \\(0/0\\) as a final answer.",
      "Cancelling terms instead of common factors.",
      "Checking only one side of a two-sided limit.",
      "Assuming that \\(f(a)\\) must exist for a limit to exist.",
      "Ignoring the sign when a denominator approaches zero."
    ],
    checklist: [
      "Can I explain \\(\\lim_{x\\to a}f(x)\\) in one sentence?",
      "Did I try direct substitution first?",
      "If I got \\(0/0\\), did I factor or rationalize correctly?",
      "For continuity, did I check all three conditions?",
      "For a two-sided limit, did both one-sided limits agree?"
    ]
  },
  2: {
    intro: "Module 2 introduces the derivative as an instantaneous rate of change. In a graph, it is the slope of the tangent line. In an application, it can represent velocity, growth rate, cost per additional item, or any other quantity that changes with respect to another variable.",
    goals: [
      "Connect the derivative with slope and instantaneous rate of change.",
      "Use the Power, Product, Quotient, and Chain Rules correctly.",
      "Recognize when a derivative may fail to exist.",
      "Interpret derivatives in motion and real-life contexts."
    ],
    sections: [
      {
        title: "Derivative meaning and notation",
        paragraphs: [
          "The derivative \\(f'(a)\\) tells us how quickly \\(f\\) is changing at \\(x=a\\). Geometrically, it is the slope of the tangent line. The limit definition builds that tangent slope from secant slopes over smaller and smaller intervals.",
          "Different notations such as \\(f'(x)\\), \\(y'\\), and \\(\\frac{dy}{dx}\\) describe the same basic idea when \\(y=f(x)\\)."
        ],
        formulas: [
          { label: "LIMIT DEFINITION", latex: "f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}" },
          { label: "TANGENT LINE", latex: "y-f(a)=f'(a)(x-a)" }
        ],
        example: {
          title: "Worked example: Power Rule",
          problem: "Differentiate \\(f(x)=7x^3-4x+9\\).",
          steps: [
            "Differentiate each term separately.",
            "\\(\\frac{d}{dx}(7x^3)=21x^2\\), \\(\\frac{d}{dx}(-4x)=-4\\), and the derivative of \\(9\\) is \\(0\\).",
            "Therefore, \\(f'(x)=21x^2-4\\)."
          ]
        }
      },
      {
        title: "The four rules you will use most",
        paragraphs: [
          "Use the Product Rule when two changing expressions are multiplied. Use the Quotient Rule when one changing expression is divided by another. Use the Chain Rule whenever one function is placed inside another.",
          "The Chain Rule is easy to miss because the outer derivative may look complete. Always ask: is there an inside expression whose derivative still needs to be multiplied?"
        ],
        formulas: [
          { label: "POWER RULE", latex: "\\frac{d}{dx}x^n=nx^{n-1}" },
          { label: "PRODUCT RULE", latex: "(uv)'=u'v+uv'" },
          { label: "QUOTIENT RULE", latex: "\\left(\\frac{u}{v}\\right)'=\\frac{vu'-uv'}{v^2}" },
          { label: "CHAIN RULE", latex: "\\frac{d}{dx}f(g(x))=f'(g(x))g'(x)" }
        ],
        example: {
          title: "Worked example: Chain Rule",
          problem: "Differentiate \\(y=(3x+1)^4\\).",
          steps: [
            "The outside function is the fourth power. Its derivative gives \\(4(3x+1)^3\\).",
            "The inside function is \\(3x+1\\), whose derivative is \\(3\\).",
            "Multiply them: \\(y'=12(3x+1)^3\\)."
          ]
        }
      },
      {
        title: "Where derivatives may not exist",
        paragraphs: [
          "A derivative needs a well-defined tangent slope. Corners, cusps, vertical tangents, and discontinuities can prevent that slope from existing.",
          "A function can still have a value at a point while failing to have a derivative there. Differentiability is stronger than continuity: differentiable functions are continuous, but continuous functions are not always differentiable."
        ],
        formulas: [
          { label: "MOTION RELATIONSHIPS", latex: "v(t)=s'(t),\\qquad a(t)=v'(t)=s''(t)" }
        ]
      }
    ],
    summary: "A derivative is a rate or slope. Identify the structure of the function before choosing a rule. Differentiate outside and inside functions carefully, and remember that corners or breaks can destroy differentiability.",
    mistakes: [
      "Forgetting to lower the exponent by one in the Power Rule.",
      "Writing \\((uv)'=u'v'\\) instead of using the Product Rule.",
      "Reversing the terms in the Quotient Rule numerator.",
      "Forgetting the derivative of the inside function in the Chain Rule.",
      "Assuming every continuous point is automatically differentiable."
    ],
    checklist: [
      "Can I state what \\(f'(a)\\) means geometrically?",
      "Did I identify whether the expression is a sum, product, quotient, or composition?",
      "Did I include the inside derivative for a composite function?",
      "Can I connect position, velocity, and acceleration?",
      "Do I know the common places where a derivative fails to exist?"
    ]
  },
  3: {
    intro: "Module 3 extends differentiation to equations that are not written as a simple \\(y=f(x)\\). You will differentiate implicit equations, parametric curves, inverse functions, logarithmic expressions, and higher-order derivatives. The rules are familiar, but the notation needs more care.",
    goals: [
      "Differentiate equations containing both x and y without solving for y first.",
      "Use logarithmic differentiation for complicated powers and products.",
      "Find derivatives of parametric and inverse functions.",
      "Interpret second and higher derivatives."
    ],
    sections: [
      {
        title: "Implicit differentiation",
        paragraphs: [
          "In an implicit equation, \\(y\\) is still a function of \\(x\\), even if it is not isolated. That is why differentiating a term such as \\(y^2\\) requires the Chain Rule and produces \\(2y\\frac{dy}{dx}\\).",
          "Differentiate every term with respect to \\(x\\), collect all terms containing \\(\\frac{dy}{dx}\\), factor it out, and then solve."
        ],
        formulas: [
          { label: "CHAIN RULE WITH y", latex: "\\frac{d}{dx}(y^n)=ny^{n-1}\\frac{dy}{dx}" },
          { label: "PRODUCT xy", latex: "\\frac{d}{dx}(xy)=x\\frac{dy}{dx}+y" }
        ],
        example: {
          title: "Worked example: a circle",
          problem: "For \\(x^2+y^2=25\\), find \\(\\frac{dy}{dx}\\).",
          steps: [
            "Differentiate both sides: \\(2x+2y\\frac{dy}{dx}=0\\).",
            "Move \\(2x\\) to the other side: \\(2y\\frac{dy}{dx}=-2x\\).",
            "Divide by \\(2y\\): \\(\\frac{dy}{dx}=-\\frac{x}{y}\\)."
          ]
        }
      },
      {
        title: "Logarithmic and inverse differentiation",
        paragraphs: [
          "Logarithmic differentiation is useful when a variable appears in both the base and exponent, such as \\(x^x\\), or when many factors and powers are multiplied together. Taking the natural logarithm turns powers into coefficients and products into sums.",
          "Inverse-trigonometric derivatives are standard formulas. Their square-root and denominator patterns should be recognized, not guessed."
        ],
        formulas: [
          { label: "LOG DIFFERENTIATION EXAMPLE", latex: "y=x^x\\Rightarrow \\ln y=x\\ln x\\Rightarrow y'=x^x(\\ln x+1)" },
          { label: "INVERSE SINE", latex: "\\frac{d}{dx}(\\sin^{-1}x)=\\frac{1}{\\sqrt{1-x^2}}" },
          { label: "INVERSE TANGENT", latex: "\\frac{d}{dx}(\\tan^{-1}x)=\\frac{1}{1+x^2}" }
        ]
      },
      {
        title: "Parametric and higher-order derivatives",
        paragraphs: [
          "When both \\(x\\) and \\(y\\) depend on a parameter \\(t\\), divide their rates to obtain the slope. A horizontal tangent usually occurs when \\(\\frac{dy}{dt}=0\\) while \\(\\frac{dx}{dt}\\neq0\\). A vertical tangent reverses those conditions.",
          "The second derivative describes how the first derivative changes. In motion it represents acceleration; in graph analysis it helps describe concavity."
        ],
        formulas: [
          { label: "PARAMETRIC SLOPE", latex: "\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}" },
          { label: "HIGHER DERIVATIVES", latex: "f''(x)=\\frac{d}{dx}f'(x),\\qquad f'''(x)=\\frac{d}{dx}f''(x)" }
        ],
        example: {
          title: "Worked example: parametric curve",
          problem: "If \\(x=t^2\\) and \\(y=t^3\\), find \\(\\frac{dy}{dx}\\).",
          steps: [
            "Differentiate with respect to \\(t\\): \\(\\frac{dx}{dt}=2t\\) and \\(\\frac{dy}{dt}=3t^2\\).",
            "Divide: \\(\\frac{dy}{dx}=\\frac{3t^2}{2t}\\).",
            "For \\(t\\neq0\\), simplify to \\(\\frac{3t}{2}\\)."
          ]
        }
      }
    ],
    summary: "The main challenge in Module 3 is keeping track of which variable depends on which. Whenever you differentiate a y-term with respect to x, include \\(dy/dx\\). For parametric equations, divide rates. For complicated powers, logarithms can simplify the structure.",
    mistakes: [
      "Differentiating \\(y^2\\) as only \\(2y\\).",
      "Forgetting the Product Rule when differentiating \\(xy\\).",
      "Dividing \\(dx/dt\\) by \\(dy/dt\\) in the wrong order.",
      "Forgetting to multiply by the original function after logarithmic differentiation.",
      "Confusing inverse trig notation with reciprocal trig notation."
    ],
    checklist: [
      "Did every derivative of a y-term include \\(dy/dx\\)?",
      "Did I collect and factor all \\(dy/dx\\) terms before solving?",
      "Can I recognize when logarithmic differentiation is helpful?",
      "For parametric curves, did I compute \\((dy/dt)/(dx/dt)\\)?",
      "Can I explain what a second derivative represents?"
    ]
  },
  4: {
    intro: "Module 4 uses derivatives to answer practical questions: where a function increases or decreases, where it reaches a maximum or minimum, how its graph bends, and how related quantities change over time. The derivative is no longer only something to calculate; it becomes a tool for reasoning.",
    goals: [
      "Find and classify critical numbers.",
      "Use first- and second-derivative information to describe a graph.",
      "Set up optimization and related-rates problems systematically.",
      "Use linear approximation and the Mean Value Theorem."
    ],
    sections: [
      {
        title: "Critical numbers and extrema",
        paragraphs: [
          "A critical number is an input in the domain where \\(f'(x)=0\\) or where \\(f'(x)\\) does not exist. Critical numbers are candidates for local extrema, but they are not automatically maxima or minima.",
          "Use a sign chart for \\(f'\\). A change from positive to negative means the function rises and then falls, producing a local maximum. A change from negative to positive produces a local minimum."
        ],
        formulas: [
          { label: "FIRST DERIVATIVE TEST", latex: "f':+\\to-\\Rightarrow\\text{ local maximum},\\qquad f':-\\to+\\Rightarrow\\text{ local minimum}" }
        ],
        example: {
          title: "Worked example: find critical numbers",
          problem: "For \\(f(x)=x^3-3x\\), find the critical numbers.",
          steps: [
            "Differentiate: \\(f'(x)=3x^2-3\\).",
            "Set the derivative equal to zero: \\(3x^2-3=0\\).",
            "Solve \\(x^2=1\\), so the critical numbers are \\(x=-1\\) and \\(x=1\\)."
          ]
        }
      },
      {
        title: "Concavity and graph behavior",
        paragraphs: [
          "The sign of \\(f'\\) describes direction. The sign of \\(f''\\) describes bending. Positive second derivative means slopes are increasing and the graph is concave up. Negative second derivative means slopes are decreasing and the graph is concave down.",
          "An inflection point requires an actual change in concavity. Solving \\(f''(x)=0\\) only gives candidates. Always test the sign on both sides."
        ],
        formulas: [
          { label: "MONOTONICITY", latex: "f'(x)>0\\Rightarrow f\\text{ increasing},\\qquad f'(x)<0\\Rightarrow f\\text{ decreasing}" },
          { label: "CONCAVITY", latex: "f''(x)>0\\Rightarrow\\text{concave up},\\qquad f''(x)<0\\Rightarrow\\text{concave down}" }
        ]
      },
      {
        title: "Optimization and related rates",
        paragraphs: [
          "Optimization problems usually contain an objective quantity to maximize or minimize and a constraint connecting the variables. Reduce the objective to one variable before differentiating, then test critical points and relevant endpoints.",
          "In related-rates problems, the variables change with time. Write an equation connecting them, differentiate the entire equation with respect to time, and only then substitute the known values."
        ],
        formulas: [
          { label: "CIRCLE AREA RATE", latex: "A=\\pi r^2\\Rightarrow\\frac{dA}{dt}=2\\pi r\\frac{dr}{dt}" },
          { label: "LINEARIZATION", latex: "L(x)=f(a)+f'(a)(x-a)" }
        ],
        example: {
          title: "Worked example: changing circle area",
          problem: "A circle's radius increases at \\(2\\text{ cm/s}\\). Find the area rate when \\(r=3\\text{ cm}\\).",
          steps: [
            "Start with \\(A=\\pi r^2\\).",
            "Differentiate with respect to time: \\(dA/dt=2\\pi r\\,dr/dt\\).",
            "Substitute \\(r=3\\) and \\(dr/dt=2\\): \\(dA/dt=12\\pi\\text{ cm}^2/\\text{s}\\)."
          ]
        }
      },
      {
        title: "Theorems and motion",
        paragraphs: [
          "The Mean Value Theorem says that, under the proper continuity and differentiability conditions, at least one tangent slope equals the average slope over an interval. Rolle's Theorem is a special case where the endpoint values are equal, so that tangent slope is zero.",
          "For motion, velocity tells the direction of position change. Speed increases when velocity and acceleration have the same sign and decreases when their signs differ."
        ],
        formulas: [
          { label: "MEAN VALUE THEOREM", latex: "f'(c)=\\frac{f(b)-f(a)}{b-a}" }
        ]
      }
    ],
    summary: "Use derivatives as signs and signals. The first derivative tells direction, the second derivative tells bending, and critical numbers give places worth checking. In applications, define the variables clearly before doing algebra.",
    mistakes: [
      "Calling every critical number an extremum without testing it.",
      "Assuming \\(f''(c)=0\\) automatically creates an inflection point.",
      "Ignoring endpoints in a closed-interval optimization problem.",
      "Substituting numbers before differentiating a related-rates equation.",
      "Confusing negative velocity with negative position."
    ],
    checklist: [
      "Did I find all points where \\(f'=0\\) or does not exist?",
      "Did I use a sign change to classify the critical point?",
      "Did I test whether concavity actually changes?",
      "In optimization, did I write the objective in one variable?",
      "In related rates, did I differentiate with respect to time first?"
    ]
  },
  5: {
    intro: "Module 5 reverses differentiation. An antiderivative is a function whose derivative returns the original integrand. Because different functions can have the same derivative, an indefinite integral represents a whole family and must include the constant of integration.",
    goals: [
      "Explain why indefinite integrals require \\(+C\\).",
      "Apply the basic antiderivative rules term by term.",
      "Recognize the special logarithmic case \\(\\int 1/x\\,dx\\).",
      "Use an initial condition to determine the constant."
    ],
    sections: [
      {
        title: "Antiderivatives and the constant C",
        paragraphs: [
          "If \\(F'(x)=f(x)\\), then \\(F\\) is an antiderivative of \\(f\\). Adding any constant to \\(F\\) does not change its derivative, so \\(F(x)+C\\) represents every possible antiderivative.",
          "A definite integral eventually gives a number, but an indefinite integral gives a family of functions. That difference explains why \\(+C\\) belongs to indefinite answers."
        ],
        formulas: [
          { label: "INDEFINITE INTEGRAL", latex: "\\int f(x)\\,dx=F(x)+C\\quad\\text{when }F'(x)=f(x)" },
          { label: "POWER RULE", latex: "\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C,\\qquad n\\ne-1" }
        ],
        example: {
          title: "Worked example: integrate a polynomial",
          problem: "Evaluate \\(\\int(4x^2+7x)\\,dx\\).",
          steps: [
            "Integrate each term separately.",
            "\\(\\int4x^2dx=4\\cdot x^3/3\\) and \\(\\int7x\\,dx=7x^2/2\\).",
            "The answer is \\(\\frac{4}{3}x^3+\\frac{7}{2}x^2+C\\)."
          ]
        }
      },
      {
        title: "The basic formulas",
        paragraphs: [
          "Most introductory antiderivatives come from reversing familiar derivative formulas. The ordinary Power Rule does not work when \\(n=-1\\) because it would require division by zero. That case becomes a logarithm.",
          "The Constant Multiple Rule lets a true constant move outside the integral. A variable such as \\(x\\) cannot be treated as a constant."
        ],
        formulas: [
          { label: "LOGARITHMIC CASE", latex: "\\int\\frac{1}{x}\\,dx=\\ln|x|+C" },
          { label: "EXPONENTIAL", latex: "\\int e^x\\,dx=e^x+C" },
          { label: "TRIGONOMETRIC", latex: "\\int\\sin x\\,dx=-\\cos x+C,\\qquad \\int\\cos x\\,dx=\\sin x+C" },
          { label: "CONSTANT MULTIPLE", latex: "\\int kf(x)\\,dx=k\\int f(x)\\,dx" }
        ]
      },
      {
        title: "Initial-value problems and checking",
        paragraphs: [
          "An initial condition such as \\(F(0)=5\\) selects one member from the antiderivative family. First integrate and include \\(C\\), then use the condition to solve for \\(C\\).",
          "The safest way to check any indefinite integral is to differentiate your final answer. You should recover the original integrand exactly."
        ],
        example: {
          title: "Worked example: determine C",
          problem: "If \\(F'(x)=3x^2\\) and \\(F(0)=5\\), find \\(F(x)\\).",
          steps: [
            "Integrate: \\(F(x)=x^3+C\\).",
            "Use \\(F(0)=5\\): \\(0^3+C=5\\), so \\(C=5\\).",
            "Therefore, \\(F(x)=x^3+5\\)."
          ]
        }
      }
    ],
    summary: "Antidifferentiation asks: what function would produce this integrand after differentiation? Reverse the derivative rules carefully, include \\(+C\\), and differentiate your answer to verify it.",
    mistakes: [
      "Leaving out \\(+C\\) on an indefinite integral.",
      "Using the Power Rule on \\(x^{-1}\\).",
      "Moving a variable outside an integral as if it were constant.",
      "Forgetting the absolute value in \\(\\ln|x|\\).",
      "Using an initial condition before finding the general antiderivative."
    ],
    checklist: [
      "Did I increase the power by one and divide by the new power?",
      "Did I recognize the special \\(1/x\\) case?",
      "Did I integrate each term separately?",
      "Did I include \\(+C\\)?",
      "Did I differentiate my answer to check it?"
    ]
  },
  6: {
    intro: "Module 6 is about choosing a technique when the basic rules are not enough. Substitution reverses the Chain Rule, while integration by parts reverses the Product Rule. The main skill is recognizing the structure of the integrand before doing calculations.",
    goals: [
      "Recognize an inner function and its derivative for u-substitution.",
      "Rewrite an integral completely in one variable.",
      "Apply integration by parts with a useful choice of u and dv.",
      "Choose the simplest technique instead of applying a rule automatically."
    ],
    sections: [
      {
        title: "u-substitution",
        paragraphs: [
          "Substitution works best when the integrand contains a composite function together with the derivative of its inside expression, possibly multiplied by a constant. Choose \\(u\\) as the inside expression, compute \\(du\\), and rewrite every part of the integral in terms of \\(u\\).",
          "A complete substitution should not leave a mixture of \\(x\\) and \\(u\\). If an \\(x\\) remains, check whether you can rewrite it or whether the substitution was poorly chosen."
        ],
        formulas: [
          { label: "SUBSTITUTION PATTERN", latex: "\\int f(g(x))g'(x)\\,dx=\\int f(u)\\,du,\\qquad u=g(x)" }
        ],
        example: {
          title: "Worked example: substitution",
          problem: "Evaluate \\(\\int2x(x^2+1)^4\\,dx\\).",
          steps: [
            "Choose \\(u=x^2+1\\).",
            "Then \\(du=2x\\,dx\\), which is already present.",
            "The integral becomes \\(\\int u^4\\,du=u^5/5+C\\).",
            "Substitute back: \\(\\frac{(x^2+1)^5}{5}+C\\)."
          ]
        }
      },
      {
        title: "Integration by parts",
        paragraphs: [
          "Integration by parts transfers differentiation to one factor and integration to another. It is useful when differentiating one factor makes it simpler while the other factor is easy to integrate.",
          "A common guideline is LIATE: logarithmic, inverse trigonometric, algebraic, trigonometric, exponential. It is not an unbreakable rule, but it often helps choose \\(u\\)."
        ],
        formulas: [
          { label: "INTEGRATION BY PARTS", latex: "\\int u\\,dv=uv-\\int v\\,du" }
        ],
        example: {
          title: "Worked example: algebraic times exponential",
          problem: "Evaluate \\(\\int xe^x\\,dx\\).",
          steps: [
            "Choose \\(u=x\\), so \\(du=dx\\).",
            "Choose \\(dv=e^x dx\\), so \\(v=e^x\\).",
            "Apply the formula: \\(xe^x-\\int e^x dx\\).",
            "The answer is \\(xe^x-e^x+C\\)."
          ]
        }
      },
      {
        title: "How to choose the method",
        paragraphs: [
          "Do not choose a method only because you see multiplication. The product \\(x\\cos(x^2)\\) is better handled by substitution because \\(x\\) is related to the derivative of the inside expression \\(x^2\\).",
          "Before starting, ask which derivative rule the integrand resembles. A nested expression suggests the Chain Rule and substitution. A product where one factor simplifies after differentiation suggests integration by parts."
        ],
        formulas: [
          { label: "QUICK DECISION", latex: "\\text{inside function + its derivative}\\Rightarrow u\\text{-substitution}" },
          { label: "QUICK DECISION", latex: "\\text{useful product}\\Rightarrow\\text{integration by parts}" }
        ]
      }
    ],
    summary: "The technique should match the derivative pattern hiding inside the integral. Substitution handles nested structures. Integration by parts handles selected products. The best method is the one that makes the remaining integral simpler.",
    mistakes: [
      "Choosing \\(u\\) but not replacing the entire integral.",
      "Leaving both \\(x\\) and \\(u\\) in the same integral.",
      "Forgetting the minus sign in integration by parts.",
      "Using integration by parts on every product.",
      "Choosing \\(u\\) so that its derivative becomes more complicated."
    ],
    checklist: [
      "Is there a clear inside function and its derivative?",
      "After substitution, did every \\(x\\) disappear?",
      "For parts, did I compute both \\(du\\) and \\(v\\) correctly?",
      "Did I use \\(uv-\\int v\\,du\\), including the minus sign?",
      "Did the chosen method actually simplify the problem?"
    ]
  },
  7: {
    intro: "Module 7 gives meaning to definite integrals. A definite integral measures net accumulation over an interval, which can represent signed area, displacement, total change, or accumulated quantity. The Fundamental Theorem of Calculus connects this accumulated value with antiderivatives.",
    goals: [
      "Evaluate definite integrals using the Fundamental Theorem of Calculus.",
      "Distinguish signed area, geometric area, displacement, and distance.",
      "Use average value and net-change formulas.",
      "Differentiate accumulation functions with variable limits."
    ],
    sections: [
      {
        title: "Definite integrals and signed accumulation",
        paragraphs: [
          "A definite integral produces a number. Contributions above the x-axis are positive and contributions below the x-axis are negative. This is why the result is called signed or net area rather than automatically being total geometric area.",
          "Reversing the limits changes the sign, and using the same upper and lower limit gives zero because the interval has no width."
        ],
        formulas: [
          { label: "FUNDAMENTAL THEOREM", latex: "\\int_a^b f(x)\\,dx=F(b)-F(a),\\qquad F'(x)=f(x)" },
          { label: "REVERSING LIMITS", latex: "\\int_b^a f(x)\\,dx=-\\int_a^b f(x)\\,dx" },
          { label: "ZERO-WIDTH INTERVAL", latex: "\\int_a^a f(x)\\,dx=0" }
        ],
        example: {
          title: "Worked example: evaluate a definite integral",
          problem: "Evaluate \\(\\int_1^3 2x\\,dx\\).",
          steps: [
            "An antiderivative of \\(2x\\) is \\(x^2\\).",
            "Evaluate upper minus lower: \\(3^2-1^2\\).",
            "The result is \\(9-1=8\\)."
          ]
        }
      },
      {
        title: "Area, displacement, and distance",
        paragraphs: [
          "If a graph crosses the x-axis, the definite integral can cancel positive and negative regions. To find total geometric area, split the interval at the zeros and make every region positive.",
          "Integrating velocity gives displacement, which is net position change. Integrating speed \\(|v(t)|\\) gives total distance traveled. These are equal only when velocity does not change sign."
        ],
        formulas: [
          { label: "DISPLACEMENT", latex: "\\Delta s=\\int_a^b v(t)\\,dt" },
          { label: "TOTAL DISTANCE", latex: "\\text{Distance}=\\int_a^b |v(t)|\\,dt" },
          { label: "TOTAL AREA", latex: "\\text{Area}=\\int_a^b |f(x)|\\,dx" }
        ]
      },
      {
        title: "Average value and net change",
        paragraphs: [
          "The average value of a function is its total accumulated value divided by the interval length. It is the constant height that would create the same signed area over the interval.",
          "Whenever you integrate a rate, the units help confirm the meaning. For example, liters per minute multiplied by minutes gives liters."
        ],
        formulas: [
          { label: "AVERAGE VALUE", latex: "f_{\\text{avg}}=\\frac{1}{b-a}\\int_a^b f(x)\\,dx" },
          { label: "NET CHANGE", latex: "\\text{Final amount}-\\text{Initial amount}=\\int_a^b \\text{rate}(t)\\,dt" }
        ],
        example: {
          title: "Worked example: average value",
          problem: "Find the average value of \\(f(x)=x\\) on \\([0,2]\\).",
          steps: [
            "Use \\(f_{avg}=\\frac{1}{2-0}\\int_0^2x\\,dx\\).",
            "The integral is \\([x^2/2]_0^2=2\\).",
            "Divide by the interval length \\(2\\): the average value is \\(1\\)."
          ]
        }
      },
      {
        title: "Accumulation functions and Riemann sums",
        paragraphs: [
          "A Riemann sum approximates an integral with many rectangles. As the rectangle widths shrink, the approximation approaches the exact definite integral for a well-behaved function.",
          "The first part of the Fundamental Theorem says that differentiating an accumulation function returns the integrand. If the upper limit is another function, apply the Chain Rule."
        ],
        formulas: [
          { label: "FTC PART 1", latex: "\\frac{d}{dx}\\int_a^x f(t)\\,dt=f(x)" },
          { label: "VARIABLE UPPER LIMIT", latex: "\\frac{d}{dx}\\int_a^{g(x)} f(t)\\,dt=f(g(x))g'(x)" }
        ]
      }
    ],
    summary: "A definite integral is net accumulation. Use an antiderivative and evaluate upper minus lower. Then interpret the result carefully: signed area is not always total area, and displacement is not always total distance.",
    mistakes: [
      "Adding \\(+C\\) to a definite-integral answer.",
      "Evaluating lower minus upper instead of upper minus lower.",
      "Calling signed area total geometric area without checking the graph's sign.",
      "Using velocity instead of speed for total distance.",
      "Forgetting the Chain Rule when the upper limit is \\(g(x)\\)."
    ],
    checklist: [
      "Did I find a correct antiderivative?",
      "Did I evaluate \\(F(b)-F(a)\\) in the right order?",
      "Does the problem ask for net change or total amount?",
      "If the function crosses the axis, did I split the interval for total area?",
      "For an accumulation derivative, did I check whether the upper limit is a function?"
    ]
  }
};
