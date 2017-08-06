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
			depends: ["base", "pointer", "cols"],
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

	var oldLink = link;
	var link = function(to) {
		return oldLink(to).style(style.link);
	};
	var linku = function(to) {
		return link(to).style(style.linku);
	};

	function rev(a) {return a.split("").reverse().join("");}
	function im(a) {
		function normalize(b) {
			return rev(Common.ldash(b).toLowerCase());
		}
		var svg = /\.svg$/;
		var ending = /\...?.?$/;
		return (/^http/.test(a) ? a : 
			(ending.test(a) ? 
				((svg.test(a) ?
					imageBase :
					"/images/bitmap/") +
					normalize(a.replace(ending, "")) +
					ending.exec(a)[0]) :
			imageBase + normalize(a) + ".svg"));
	}
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
					var to = Common.ldash(nav);
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
							a.href(button[2]);
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
		var lstyle = [style.link, {fontWeight: "normal"}];
		return div(
			div.style(style.centerDown)(
				list.map(function(item) {
					var base = div.style(style.projbox)(
						div.style({display: "flex"})(
							div.style({width: "8rem"})(
								img.style(style.projimg).src(
									im(item.icon)
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
					);
					return div((links ? a.href(item.link)(base) : link(item.link)(base)).style(lstyle));
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


	var blogEntries = [
		[
			"Arista Hackathon 2017",
			"Let's mod a pool table",
			"Pool"
		],
		[
			"How to choose a programming language",
			"A step up from flipping a coin",
			"Multi-Language"
		],
		[
			"Currying in JavaScript",
			"Implementing an abstraction every language should have",
			"JavaScript"
		],
		[
			"Native imports in JavaScript",
			"Using eval to dynamically bind local variables for great convenience gains",
			"JavaScript"
		]
	];

	function blogList() {
		return listPage(blogEntries.map(function(b, i) {
			return {
				title: b[0],
				description: b[1],
				link: "blog/" + i + "/" + Common.ldash(b[0]),
				icon: b[2]
			};
		}), false, true, "Blog");
	}

	function blogPost(params) {
		var entry = blogEntries[params.id];
		return [
			div.style(style.centerDown, {
				borderLeft: "5px solid black",
				padding: "0 20px"
			})(
				(entry ? [h1(entry[0]),
					h2(entry[1]),
					(function() {
						if (entry[3]) {return div(entry[3]);}
						var page = div(h3("Loading..."));
						function reqListener () {
							entry[3] = Nutmeg.md(this.responseText, {
								pre: code,
								image: function(src, caption) {
									return a.href(im(src))(
										img.src(im(src)).style(
											{maxWidth: "100%"}
										));
								}
							});
							page.clear()(entry[3]);
						}
						var oReq = new XMLHttpRequest();
						oReq.addEventListener("load", reqListener);
						oReq.open("GET", "/blog_posts/" + Common.ldash(entry[0]) + ".md");
						oReq.send();
						return page;
					})()] : h1("Blog post not found :("))
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
