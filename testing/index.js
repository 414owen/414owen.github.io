window.onload = function() {
	eval(Nutmeg.localScope);

	var foreground = "#000000";
	var background = "#f7f7f7";
	var transitionTime = 0.3;
	var pageChangeTime = transitionTime * 1000;
	var projectSize = 8;
	var imageBase = "images/min/"

	function rev(a) {return a.split("").reverse().join("");}

	var style = mergeStyle({
		transition: {
			transition: "all " + transitionTime + "s linear"
		},
		heading: {
			depends: ["base"],
			fontSize: "3rem"
		},
		base: {
			border: "0",
			color: foreground,
			backgroundColor: background,
			margin: "0",
			padding: "0",
			fontFamily: "Raleway",
			fontWeight: "300",
			lineHeight: "1.15",
			display: "block",
		},
		inverted: {
			color: background,
			backgroundColor: foreground
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
			depends: ["spaced", "transition"],
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
			width: "10rem"
		},
		link: {
			depends: ["base", "pointer"],
			fontWeight: "bold",
			textDecoration: "none"
		},
		med: {
			depends: ["base"],
			fontSize: "1.3rem"
		}
	});

	function linkStyled(place) {
		return link(place).style(style.link)
	}

	var navItems = ["Home", "Projects", "About Me", "Contact"];

	function getNav(current, invert) {
		return div.style(
			style.bottom, 
			style.centerHor,
			(invert ? style.inverted : {})
		)(
			div.style(
				{
					maxWidth: "50rem", 
					fontSize: "1.3rem"
				}, 
				style.disperse
			)(
				navItems.map(function(nav) {
					var to = nav.toLowerCase().replace(" ", "-");
					var src = imageBase + rev("arrow" + (invert ? "-invert" : "")) + ".svg";
					var ret = link(to === "home"? "" : to)
						.style(style.navEl)(
							nav,
							img.src(src).style(
								style.lower, 
								{height: "1.5rem"}
							)
						);
					if (invert) {
						ret.style({
							color: background, backgroundColor: foreground
						});
					}
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
			"Brownian Music", "brownianmusic.html", 
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

	function projects(vars) {
		return div(
			div.style({
				maxWidth: "50rem", 
				margin: "0 auto"
			})(
				projectData.map(function(project) {
					return div.style(style.projbox).link(project[1])(
						div.style({display: "flex"})(
							div.style({width: "8rem"})(
								img.style(style.projimg).src(
									imageBase + rev(project[0]) + ".svg"
								)
							),
							div.style(style.center)(
								div.style({
									transition: "color 0.2s linear", 
									margin: "0rem 2rem"
								})(
									project[0] + " " + project[2]
								)
							)
						),
						div.style(style.hline),
						div(project[0]).style(
							style.centerHor, 
							style.lower
						)
					)
				})
			), 
			div.style(style.projbox)(div.style(style.projimg)),
			getNav("Projects", true)
		)
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
				div("I have\xa0", linkStyled("projects")("neat side projects")).style(style.centerHor),
				div("You can\xa0", linkStyled("contact")("contact me")).style(style.centerHor)
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

	router({hash: false, base: "testing"})(
		sub("projects").view(projects),
		sub("about-me").view(me),
		sub("contact").view(contact),
		sub("blog").view(div("Blog not implemented yet :(")),
		sub("hello")(
			sub(":name").view(function(params) {return "Hello " + params.name;}),
			sub('').view(div("No name entered")),
			sub().view(div("Wildcard"))
		),
		sub('').view(main),
		sub().view("No page found :(")
	).run();
}
