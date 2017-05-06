window.onload = function() { 
	eval(Nutmeg.localScope);
	var foreground = "#000000";
	var background = "#f7f7f7";
	var transitionTime = 0.3;
	var currentPage;
	var baseFontSize = 2.5;
	var cafe = "https://owen.cafe/";
	var cafeSlides = cafe + "nutmeg/";

	var S = mergeStyle({
		transition: {
			transition: "all " + transitionTime + "s linear"
		},
		heading: {
			depends: ["base", "inverted", "centerHor"],
			fontSize: baseFontSize * 1.6 + "rem"
		},
		base: {
			border: "0", margin: "0", padding: "0",
			color: foreground,
			backgroundColor: background,
			fontFamily: "Raleway",
			fontSize: baseFontSize + "rem"
		},
		inverted: {
			color: background,
			backgroundColor: foreground
		},
		body: {
			depends: ["base", "fill", "abs"],
			backgroundColor: background
		},
		fillw: {width: "100%"},
		fillh: {height: "100%"},
		fill: {depends: ["fillw", "fillh"]},
		flex: {
			display: "flex",
			flexDirection: "row"
		},
		centerHor: {
			depends: ["flex"],
			width: "100%",
			justifyContent: "center",
			textAlign: "center",
			flexWrap: "wrap"
		},
		center: {
			depends: ["centerHor"],
			alignItems: "center"
		},
		pointer: {cursor: "pointer"},
		bordered: {border: "1px solid"},
		spaced: {margin: "1rem"},
		abs: {position: "absolute"},
		nav: {depends: ["abs", "pointer"]},
		alr: {textAlign: "right"},
		greyed: {color: "#555"},
		link: {
			depends: ["base", "pointer"],
			fontWeight: "bold",
			textDecoration: "none"
		},
		demoBox: {
			width: "800px", 
			height: "300px", 
		}
	});

	body.style(S.body);
	function padv(n) {return {padding: n + "rem 0"};};
	function c(inline) {
		return p.style(S.inverted, 
			{backgroundColor: "#444", textAlign: "left", padding: "0 2rem"}
		)(pre().apply(null, arguments));
	}
	function rc() {
		return c.apply(null, arguments).style({backgroundColor: "#744"});
	}
	function bc() {
		return c.apply(null, arguments).style({backgroundColor: "#447"});
	}
	var demoFont = baseFontSize * 0.6;
	var demoCode = textarea();
	function changeDemoFont(a) {
		demoFont += a;
		demoCode.style({fontSize: demoFont + "rem"});
	}
	var sandbox = div.style({
		resize: "both",
		overflow: "scroll", 
		margin: "1rem auto",
		backgroundColor: "#ccc"
	}, S.demoBox);
	function updateDemoCode(s) {
		demoCode.clear().value(s);
		sandbox.staging = s;
	}
	function updateSandbox() {
		var body = div().style(S.fill);
		sandbox.clear()(body);
		eval(sandbox.staging);
	}
	var demos = [
		'body(\n  Array(100).fill(0).map(function(b,i) {\n    return div(a(i).href("#"));\n  })\n);',
		'var S = mergeStyle({\n  blueGround: {\n    backgroundColor: "#447",\n    color: "#eee"\n  },\n  smooth: {\n    transition: "all 0.5s ease"\n  },\n  fancy: {\n    depends: ["smooth"],\n    hover: {\n      depends: ["blueGround"]\n    }\n  }\n});\n\nbody.style(S.fancy)("Hover Over Me!");',
		'var S = mergeStyle({\n  test: {\n    transition: "all 0.5s linear",\n    color: "white",\n    backgroundColor: "black",\n    width: "100%",\n    hover: {\n      filter: "invert(100%)"\n    }\n  }\n});\n\nvar curr = 1, prev = 0;\nbody(\n  "Fibs:",\n  Array(50).fill(0).map(function() {\n    var oldc = curr, oldp = prev;\n    curr += prev, prev = oldc;\n    return div.style(S.test)(oldp);\n  })\n);'
	];
	updateDemoCode(demos[0]);

	var slides = [
		[
			"Intro",
			div(
				p("Hello, I'm Owen."),
				p("I made a language for writing websites"),
				p("It's called Nutmeg"),
				img.src("https://owen.cafe/images/Nutmeg.min.svg").style({height: "9rem"})
			)
		],
		[
			"What?",
			div(
				p("Nutmeg is a domain-specific language, embeded inside javascript"),
				p("Nutmeg runs exclusively on the client-side"),
				p("All Nutmeg code is valid javascript code"),
				p("This means we get the whole power/expressivity of javascript"),
				p("My Slides are written in Nutmeg")
			)
		],
		[
			"Name",
			p.style({textAlign: "left"})(
				[
					[ "N", "et" ],
					[ "U", "tilization" ],
					[ "T", "hrough" ],
					[ "M", "y" ],
					[ "E", "legant" ],
					[ "G", "enerator"]
				].map(function(a) {
					return div(b(a[0]), a[1], br()).style(S.spaced);
				})
			)
		],
		[
			"Quick Example",
			div(
				rc("<body>\n  <div>\n    Hello\n  </div>\n</body>"), 
				bc('body(\n  div(\n    "Hello"\n  )\n)')
			)
		],
		[
			"More Example",
			div(
				rc('<textarea rows="4" cols="50"></textarea>'),
				bc('textarea.rows(4).cols(50)'),
				p("Nutmeg uses chained function calls to modify attributes")
			)
		],
		[
			"Valid Syntax 1",
			div(
				bc('a.href("https://owen.cafe")("home")'),
				a.href("https://owen.cafe")("home"),
				bc('a().href("https://owen.cafe")("home")'),
				a().href("https://owen.cafe")("home"),
				bc('a("home").href("https://owen.cafe")'),
				a("home").href("https://owen.cafe"),
				bc('a()()().href("https://owen.cafe")()()("home")'),
				a()()().href("https://owen.cafe")()()("home")
			)
		],
		[
			"Valid Syntax 2",
			div(
				bc('a("ho").href("https://owen.cafe")("me")'),
				a("ho").href("https://owen.cafe")("me"),
				bc('a.href("https://owen.cafe")("ho", "me")'),
				a.href("https://owen.cafe")("ho", "me"),
				bc('a.href("https://owen.cafe")(["ho", "me"])'),
				a.href("https://owen.cafe")(["ho", "me"])
			)
		],
		[
			"Screw CSS",
			div(
				p("Nutmeg styles have inheritance (yay!)"),
				bc(
					"boxed: {\n" + 
					"    depends: ['transition', 'pointer', 'center'],\n" + 
					"    width: '3.3rem',\n" +
					"    height: '3.3rem',\n" +
					"    hover: {\n" +
					"        filter: 'invert(100%)'\n" +
					"    }\n" +
					"}"
				)
			)
		],
		[
			"Live Demo!",
			div(
				demoCode.style(S.demoBox, {
					fontSize: demoFont + "rem",
					backgroundColor: "#447",
					color: background
				}).onchange(function(e) {sandbox.staging = e.target.value;}), 
				br(), 
				button("Give Me Some Sugar!").onclick(updateSandbox.bind(null, null)).style(S.spaced),
				div.style(S.spaced, {display: "inline-block"})(demos.map(function(d,i) {
					return button(i).onclick(updateDemoCode.bind(null,d));
				})),
				div.style(S.spaced, {display: "inline-block"})(
					button("-").onclick(changeDemoFont.bind(null, -0.1)),
					button("+").onclick(changeDemoFont.bind(null, 0.1))
				),
				sandbox
			)
		],
		[
			"Nutmeg-Router",
			div(
				p("Nutmeg-Router renders different parts of a page without contacting the server"),
				p("Every slide is just a hashurl eg. ", a.href(cafeSlides + "#/4")(cafeSlides),
					a.href(cafeSlides + "#/4")("#/4").style({color: "red"})),
				p("When you change that url, it is parsed, and the view is rerendered"),
				p("Nutmeg-Router is just a Nutmeg component"),
				bc('router(\n  slidePage.map(function(s, n) {\n    return sub(n + "").view(s).transition(pageChange)\n  }),\n  sub().view(slidePage[0]).transition(pageChange)\n);')
			)
		],
		[
			"The End",
			div(p("Thanks, these slides are on "), 
				p(a(cafeSlides).href(cafeSlides)),
				p("My other projects, links to github/sites, etc: "),
				p(a(cafe).href(cafe)),
				p("(owen.cafe is also written in Nutmeg)")
			)
		]
	];

	function goToPage(n) {
		window.location.href = window.location.pathname + "#/" + n;
	}

	function bodyFocused() {
		return document.activeElement === document.body;
	}

	function nextPage() {
		if (bodyFocused() && currentPage < slides.length - 1) {
			goToPage(currentPage + 1);
		}
	}

	function prevPage() {
		if (bodyFocused() && currentPage > 0) {
			goToPage(currentPage - 1);
		}
	}

	document.onkeydown = function(e) {
		e = e || window.event;
		if (e.keyCode == '38' || e.keyCode == '39') {
			nextPage();
		}
		else if (e.keyCode == '40' || e.keyCode == '37') {
			prevPage();
		}
	}

	var slidePage = slides.map(function(s, n) {
		return function() {
			currentPage = n;
			return div.style(S.fill)(
				div.style(S.base, S.inverted, padv(3))(
					div("<-").style(S.nav, {left:  "2rem"}).onclick(prevPage),
					div("->").style(S.nav, {right: "2rem"}).onclick(nextPage),
					div("Nutmeg - " + s[0]).style(S.heading)
				),
				div.style(S.centerHor, padv(4)) (
					s[1]
				)
			);
		};
	});

	function pageChange(container, newPage) {
		container.clear()(newPage);
	}

	router(
		slidePage.map(function(s, n) {
			return sub(n + "").view(s).transition(pageChange)
		}),
		sub().view(slidePage[0]).transition(pageChange)
	);
}
