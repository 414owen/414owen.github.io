window.onload = function() {
	eval(Nutmeg.localScope);

	var foreground = "#000000";
	var background = "#f7f7f7";
	var transitionTime = 0.3;
	var pageChangeTime = transitionTime * 1000;
	var projectSize = 8;
	var imageBase = "/images/min/";

	var style = mergeStyle({
		transition: {
			transition: "all " + transitionTime + "s linear"
		},
		heading: {
			depends: ["base"],
			fontSize: "3rem"
		},
		cols: {
			color: foreground,
			backgroundColor: background,
		},
		inverted: {
			color: background,
			backgroundColor: foreground
		},
		base: {
			depends: ["cols"],
			border: "0",
			margin: "0",
			padding: "0",
			fontFamily: "Raleway",
			fontWeight: "300",
			lineHeight: "1.45",
			display: "block"
		},
		icon: {
			depends: ["transition"],
			width: "60%",
			height: "60%",
			hover: {
				transform: "scale(1.3, 1.3)"
			}
		},
		iconBox: {
			depends: ["transition", "pointer", "center"],
			width: "3.3rem",
			height: "3.3rem",
			padding: "0.2rem",
			hover: {
				filter: "invert(100%)",
				backgroundColor: "#fff"
			}
		},
		body: {
			depends: ["base", "fill", "abs"],
			backgroundColor: background
		},
		fill: {
			width: "100%",
			height: "100%"
		},
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
		column: {
			depends: ["flex"],
			flexDirection: "column"
		},
		center: {
			depends: ["centerHor"],
			width: "100%",
			alignItems: "center"
		},
		disperse: {
			depends: ["centerHor"],
			justifyContent: "space-around"
		},
		inline: {
			depends: ["base"],
			display: "inline-block"
		},
		hline: {
			depends: ["lower"],
			borderTop: "1px solid"
		},
		lower: {
			marginTop: "0.5rem"
		},
		pointer: {
			cursor: "pointer"
		},
		bottom: {
			depends: ["base"],
			bottom: "0",
			position: "fixed"
		},
		bordered: {
			border: "1px solid"
		},
		spaced: {
			margin: "1rem"
		},
		projbox: {
			depends: ["spaced", "transition", "pointer"],
			padding: "1rem",
			border: "1px solid rgba(0,0,0,0)",
			hover: {
				borderColor: foreground,
				borderRadius: "1rem",
			}
		},
		abs: {
			position: "absolute"
		},
		projimgbox: {
			height: projectSize + "rem",
			width: projectSize + "rem",
		},
		projimg: {
			width:"100%",
		},
		transparent: {
			depends: ["base", "transition"],
			color: "rgba(0,0,0,0)"
		},
		navEl: {
			depends: ["base", "column", "pointer"],
			width: "8rem"
		},
		link: {
			depends: ["base", "pointer"],
			fontWeight: "bold",
			textDecoration: "none"
		},
		linku: {
			depends: ["base", "pointer"],
			textDecoration: "underline"
		},
		med: {
			depends: ["base"],
			fontSize: "1.3rem"
		},
		centerDown: {
			maxWidth: "50rem", 
			margin: "0 auto"
		}
	});

	function rev(a) {return a.split("").reverse().join("");}
	function ldash(text) {
		return text.toLowerCase().replace(/\s/g, "-");
	}
	function im(a) {return rev(ldash(a)).toLowerCase();}

	var navItems = ["Home", "Projects", "Blog", "About Me", "Contact"];

	function getNav(current) {
		var cols = [style.cols, style.inverted].reverse();
		var srcs = [imageBase + rev("arrow") + ".svg", imageBase + rev("arrow-invert") + ".svg"].reverse();
		return div.style(
			style.bottom, 
			style.centerHor,
			cols[0]
		)(
			div.style(
				{
					maxWidth: "40rem", 
					fontSize: "1.3rem"
				}, 
				style.disperse
			)(
				navItems.map(function(nav) {
					var to = ldash(nav);
					var ret = link(to === "home"? "" : to)
						.style(style.navEl, (nav === current ? cols[1] : cols[0]))(
							nav,
							img.src((nav === current ? srcs[1] : srcs[0])).style(
								style.lower, 
								{height: "1.5rem"}
							)
						);
					return ret;
				})
			)
		);
	}

	function centerPage(centered, currentNav) {
		return div.style(style.fill)(
			div.style(
				style.fill, 
				style.center
			)(centered),
			getNav(currentNav)
		);
	}

	var mainButtons = [
		["github", "l", "https://github.com/414owen"],
		["linkedin", "l", "https://www.linkedin.com/in/owen-shepherd-50418b110"],
		["cv", "l", "https://owen.cafe/cv.pdf"],
		["envelope","p", "contact"]
	];

	function main() {
		return centerPage(div.style(style.column)(
			div(
				link("hello")(h1("Owen Shepherd").style(style.heading)),
				div.style(style.hline),
				div.style(style.centerHor)(
					mainButtons.map(function(button, ind) {
						var base = button[1] === "p" ? 
							link(button[2])          : 
							div.link(button[2]);
						return base.style(style.iconBox)(
							img.src(
								imageBase + rev(button[0]) + ".svg"
							).style(style.icon)
						);
					})
				)
			)
		), "Home");
	}

	var projectData = [	
		[
			"Iota", 
			"iota/",
			"allows a lot of people to draw on the same canvas"
		],
		[
			"Brownian Music", 
			"brownianmusic.html", 
			"lets you discover new music through the best physics engine I could come up with in an afternoon"
		],
		[
			"Nutmeg",
			"https://github.com/414owen/Nutmeg-Core",
			"is a client-side website generator (used to make this site)"
		],
		[
			"Nutmeg Router",
			"https://github.com/414owen/Nutmeg-Router",
			"is a client-side URL router for Nutmeg"
		],
		[
			"Bird Up",
			"https://github.com/414owen/Bird-Up",
			"is the best game ever made"
		],
		[
			"Befunge",
			"https://github.com/414owen/Befunge",
			"is a fast interpreter for the 2D esolang 'befunge'"
		],
		[
			"Turtle-SVG",
			"https://github.com/414owen/Turtle-SVG",
			"is a turtle-graphics interpreter that outputs SVG images"
		],
		[
			"Brainfuck in Scala",
			"https://github.com/414owen/Brainfuck-Interpreter",
			"is a nice implementation of the popular esolang 'Brainfuck'"
		]
	];

	function listPage(list, links, dates, pageName) {
		return div(
			div.style(style.centerDown)(
				list.map(function(item) {
					return (links ? div.link(item.link) : link(item.link))
						.style(style.projbox)(
							div.style({display: "flex"})(
								div.style({width: "8rem"})(
									img.style(style.projimg).src(
										imageBase + im(item.icon) + ".svg"
									)
								),
								div.style(style.center)(
									div.style({
										transition: "color 0.2s linear", 
										margin: "0rem 2rem"
									})(
										item.description
									)
								)
							),
							div.style(style.hline),
							div(item.title).style(
								style.centerHor, 
								style.lower,
								{fontWeight: "bold"}
							)
						)
				})
			), 
			div.style({height: "5rem"}),
			getNav(pageName)
		)
	}

	function projects() {
		return listPage(projectData.map(function(p) {
			return {
				title: p[0],
				icon: p[0],
				description: p[0] + " " + p[2],
				link: p[1]
			};
		}), true, false, "Projects");
	}

	function spaceLines(lines) {
		return lines.map(function(t) {return div.style(style.lower)(t);});
	}

	// Literally the height of spam-prevention technology
	var email = [
		"41", 
		"54owe".slice(1), 
		"nqg".replace("q", "@"), 
		rev("iam"), 
		"ll..ccoo".split("").filter(function(s, i) {return i % 2 == 0 ? s : "";}).join(""),
		"m"
	];

	function me() {
		return centerPage(div.style(style.column, style.med)(
			spaceLines(["I am Owen",
				"I study Computer Science",
				div.style(style.centerHor)
				("I study at\xa0", a.style(style.link).href("https://www.tcd.ie/")("Trinity College Dublin")),
				div("I have\xa0", link("projects").style(style.link)("neat side projects")).style(style.centerHor),
				div("You can\xa0", link("contact").style(style.link)("contact me")).style(style.centerHor)
			])
		), "About Me");
	}

	function row(elems) {
		return elems.map(function(elem) {return td(elem).style({padding: "0.2rem 1rem"});});
	}

	function mono(el) {
		return div(el).style({fontFamily: "Cutive Mono, Monospace"});
	}

	function contact() {
		return centerPage(div.style(style.column, style.med)(
			table(
				tr(row(["Email Address:\xa0", mono(email)])),
				tr(row(["PGP fingerprint:", mono(div("1A42 EDB5 631A 2D7E 344D",br(),"7DA1 D05F 4B47 F0CD F6C1"))]))
			)
		), "Contact");
	}

	body.style(style.body);

	function code() {
		return div.style(style.inverted, {
			backgroundColor: "#444",
			overflow: "auto"
		})(
			pre.style({
				display: "inline-block",
				fontSize: "1rem",
				padding: "0 1rem"
			})(
				[].slice.call(arguments).join("\n").replace(/\t/g, "  ")
			)
		)
	}

	function splink(to, text) {
		return a.href(to)(text).style({textDecoration: "underline"})
	}

	function mono(text) {
		return span.style({fontFamily: "monospace"})(text);
	}

	function findPos(obj) {
		var curtop = 0;
		if (obj.offsetParent) {
			do {
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
			return [curtop];
		}
	}

	var blogEntries = [
		[
			"Currying in Javascript",
			"Implementing an abstraction every language should have",
			"Javascript",
			function() {
				var toc = ul();
				var h = [
					"Inspiration",
					"Prerequisites",
					"Background",
					"Objective",
					"Initial Attempt",
					"Final Version"
				].map(function(h) {
					var res = h3(h);
					toc(
						li(div(h).style(style.linku))
						.onclick(function() {window.scroll(0,findPos(res.val));})
					);
					return res;
				});
				return div.style({fontSize: "1rem"})([
					h3("Table of Contents"),
					toc,
					h[0],
					div("A month or so ago, I was writing a little ", splink("http://elm-lang.org/", "Elm"), " project to allow lots of people to draw on a website at the same time, in a way that their drawings interfered with each other and annoyed everyone. Taking a look at the generated code, I saw this:"),
					code(
						"function F9(fun) {",
						"	function wrapper(a) { return function(b) { return function(c) {",
						"		return function(d) { return function(e) { return function(f) {",
						"			return function(g) { return function(h) { return function(i) {",
						"				return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };",
						"	}",
						"	wrapper.arity = 9;",
						"	wrapper.func = fun;",
						"	return wrapper;",
						"}"
					),
					"As you can see, this function is called F9, and yes, there are similar functions labelled F2-F8, with less inner functions. The purpose of this thing is to curry a function with arity nine (arity is the amount of parameters a function takes). Alright, they've defined a function for every arity up to nine (maybe it would generate more if you wrote a function that takes more? Don't know, didn't check), I think that at the very least we can make a single function that curries however many parameters you want.",
					h[1],
					"We'll need a good understanding of these things:",
					ul([
						a("Function.prototype.apply()")
						.href("https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply"),
						a("Function.prototype.bind()")
						.href("https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind"),
						a("Array.prototype.reduce()")
						.href("https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce"),
						a("Array.prototype.concat()")
						.href("https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/concat"),
						a("Arguments object")
						.href("https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/arguments"),
						a("Array.prototype.slice()")
						.href("https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice"),
						a("Function.prototype.call()")
						.href("https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call"),
						a("Lexical scoping")
						.href("https://developer.mozilla.org/en/docs/Web/JavaScript/Closures#Lexical_scoping")
					].map(function(e) {return li(e.style(style.linku));})),
					h[2],
					"Okay, currying, if you're familiar with a functional language, you might recognize this kind of code:",
					code(
						"add a b = a + b",
						"addOne = add 1",
						"addTwo = add 2",
						"addOne 5             // 6",
						"addTwo 5             // 7"
					),
					"Let's take a look at what that looks like in javascript:",
					code(
						"function add(a, b) {return a + b;}",
						"var addOne = add.bind(null, 1);",
						"var addTwo = add.bind(null, 2);",
						"addOne(5)            // 6",
						"addTwo(5)            // 7"
					),
					"Huh, well that's quite doable, but not very ergonomic, let's see what we can do",
					h[3],
					"Our goal today is to get the syntax of currying down as close as possible to that of the unnamed functional language above, within the limits of es5, with as small a function as possible, hopefully capable of currying functions of any arity. We'll aim to get down to something like this:",
					code(
						"var add = curry(function(a, b) {return a + b;})",
						"var addOne = add(1);",
						"var addTwo = add(2);"
					),
					"The above is achieved in Elm by having very nested functions such as F9.",
					h[4],
					"Okay, my first thought was to encapsulate an array, then use apply() to turn that array into parameters. This looked something like this:",
					code(
						"function curry(arity, func) {",
						"	var params = [];",
						"	function more() {",
						"		params = params.concat([].slice.call(arguments));",
						"		if (arity === params.length) {return func.apply(null, params);}",
						"		return more;",
						"	}",
						"	return more;",
						"}"
					),
					div(
						"Okay, here, we're using javascript's scoping rules to encapsulate an array of parameters.",
						mono(" [].slice.call(arguments) "), 
						"is a nice little trick to convert a functions' arguments into an array, by fooling an array literal's ", mono(".slice()"), " function into thinking ",
						mono("arguments"),
						" is already an array. ",
						"There is, however, a gaping floor in this plan, I'll give you an example of it failing and you can try to figure it out."
					),
					code(
						"var add = curry(2, function(a, b) {return a + b;});",
						"var addOne = add(1);",
						"var addTwo = add(2);",
						"addOne(5); // 6",
						"addTwo(7); // error, this is not a function"
					),
					"Woops! When you curry one parameter, you curry it for every subsequent call. addOne was correct, however addTwo was just the value three. Maybe we can pass the next parameters in by binding them...",
					code(
						"function curry(arity, func) {",
						"	function more() {",
						"		var params = [].slice.call(arguments);",
						"		if (params.length === arity)",
						"			return func.apply(null, params);",
						"		else return params.reduce(function(acc, val) {",
						"			return acc.bind(null, val);",
						"		}, more);",
						"	}",
						"	return more;",
						"}"
					),
					"One of the neat things about this version is that, as it curries any function, and it itself takes two parameters, it can curry itself!",
					code(
						"// curry curries itself",
						"var c = curry(2, curry);",
						"function add(a, b) {return a + b;}",
						"var addOne = c(2)(add);"
					),
					div("That does what we want, however I think we can get the code size down a bit, also, I don't like that arity parameter. I shopped around a bit, and found out that functions have a ", mono(".length"), " parameter, which just tells you the arity. Hooray! The curry currying itself trick will be missed, though."),
					div("Okay, as to the binding, reducing the function to bind one at a time is, unnecessary, as ", mono(".bind()"), " accepts multiple parameters anyway. We can ", mono("apply"), " everything to the ", mono(".bind()"), " at once, methinks."),
					h[5],
					code(
						"function curry(func) {",
						"	function more() {",
						"		var params = [].slice.call(arguments);",
						"		return ((params.length === func.length) ?",
						"			func.apply(null, params) :",
						"			more.bind.apply(more, [null].concat(params)));",
						"	}",
						"	return more;",
						"}"
					),
					"Yes! If you understood what's going on up to here, you're a hella-rad meta-programmer. Shall we put this thing through it's paces?",
					code(
						"var add = curry(function(a, b, c) {return a + b + c;});",
						"",
						"addOne = add(1);",
						"addOneTwo = addOne(2);",
						"addOneTwo(3);         // 6",
						"add(1)(2)(3);         // 6"
					),
					"Oh, also, we can still use standard javascript syntax on our curried functions, which is a very nice bonus",
					code(
						"add(1, 2, 3);         // 6"
					),
					div("Right on! We're done, and it's amazing. We should probably give this a fancy-ass name, how about 'hybrid currying'? That sounds like a thing that vaguely describes what this can do, what with the different syntaxes and all. I've put this on GitHub, ", splink("https://github.com/414owen/js-hybrid-currying", "here"), ".", " Feel free to make a pull request or whatnot :)")
				].map(function(a) {return div(a).style({marginTop: "2rem"});}))
			},
		]
	];

	function blogList() {
		return listPage(blogEntries.map(function(b, i) {
			return {
				title: b[0],
				description: b[1],
				link: "blog/" + i + "/" + ldash(b[0]),
				icon: ldash(b[2])
			};
		}), false, true, "Blog");
	}

	function blogPost(params) {
		var entry = blogEntries[params.id];
		return [
			div.style(style.centerDown, {
				borderLeft: "5px solid black",
				paddingLeft: "20px"
			})(
				h1(entry[0]),
				h2(entry[1]),
				entry[3]()
			),
			div.style({height: "5rem"}),
			getNav("Blog")
		];
	}

	router({hash: false})(
		sub("projects").view(projects),
		sub("about-me").view(me),
		sub("contact").view(contact),
		sub("blog").view(blogList)(
			sub(":id")(
				sub().view(blogPost)
			)
		),
		sub().view(main)
	).run();
}
