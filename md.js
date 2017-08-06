/**
 *
 * @preserve
 * Nutmeg-Bad-Md - a Markdown to Nutmeg converter
 * that understands the bare minimum for me to write my blog.
 *
 */

(function() {
	eval(Nutmeg.localScope);

	defMap = {
		inPre: function(text) {
			return span.style({fontFamily: "monospace"})(text);
		},
		text: div,
		pre: pre,
		link: link,
		href: a,
		p: ul
	};
	for (var i = 0; i < 5; i++) {
		defMap["h" + i] = Nutmeg["h" + i];
	}
	Nutmeg.md = function(text, map, styleMap) {
		map = map || defMap;
		styleMap = styleMap || {
			all: {margin: "1rem 0"},
			link: {
				color: "#000", 
				textDecoration: "underline",
				cursor: "pointer"
			}
		};
		var els = [];
		var baseh = 0;
		var lines = text.split("\n");
		var val = [];
		var newBlock = true;
		var type = "text";
		var indent = 0;
		var headings = {};
		var toc = [];
		var contents = div();
		function style(t) {
			return styleMap[t] || {};
		}
		function create(t) {
			return (map[t] || defMap[t]);
		}
		function monoAndLink(text) {
			return text.split("`").map(function(a, i) {
				if (i % 2 === 0) {
					var res = [];
					var match;
					while ((match = /\[(.+?)\]\(([^\s]+?)\)/g.exec(a)) != null) {
						var link;
						if (match[2][0] === "#") {
							link = create("text").onclick(Common.goto.bind(null, headings[Common.ldash(match[1])]));
						} else if (/^https?:\/\/.*\..*/.test(match[2])) {
							link = create("href").href(match[2]);
						} else {
							link = create("link")(match[2]);
						}
						res.push(a.slice(0, match.index), link(match[1]).style(style("link")));
						a = a.slice(match.index + match[0].length);
					}
					res.push(a);
					return res;
				} else {return create("inPre")(a);}
			});
		}

		for (var lind = 0; lind < lines.length; lind++) {
			var line = lines[lind];
			if ((!newBlock && line === "") ? (type !== "pre") : false) {
				if (type === "p") {
					function flatten(c) {
						return c.map(function(cc) {
							return li(monoAndLink(cc.name), ul(flatten(cc.children)))
						});
					}
					var val = flatten(val);
				} else {
					val = monoAndLink(val.join(" "));
				}
				els.push(create(type)(val).style(style("all"), styleMap[type] || {}));
				if (/^h/.test(type)) {
					var hh = parseInt(type[1]);
					if (baseh === 0) {baseh = hh;}
					var h = baseh;
					var arr = toc;
					while (h++ < hh) {
						arr = arr[arr.length - 1].children;
					}
					arr.push({name: val[0][0], el: els[els.length - 1], children: []});
					headings[Common.ldash(val[0][0])] = els[els.length - 1];
				}
				newBlock = true;
				val = [];
			} else if (newBlock) {
				if (/^```/.test(line)) {
					type = "pre";
				} else if (/^#+/.test(line)) {
					indent = line.search(/[^# ]/);
					var hashes = line.search(/[^#]/);
					val.push(line.slice(indent));
					type = "h" + hashes;
				} else if (/\*\s+/.test(line)) {
					type = "p";
					var name = line.replace(/^\s*\*\s+/, "");
					val = [{
						name: name,
						children: []
					}];
				} else if (/^<TOC \d>/.test(line)) {
					contents = div(
						Nutmeg["h" + line[5]]("Table of Contents")
					);
					els.push(contents.style(style("all")));
					newBlock = true;
					val = [];
				} else {
					type = "text";
					val.push(line);
				}
				if (line !== "") {newBlock = false;}
			} else {
				if (type === "pre") {
					if (/^```/.test(line)) {
						newBlock = true; 
						els.push(create(type)(val.join("\n")).style(style("all")));
						val = [];
					}
					else {val.push(line);}
				} else if (type === "p") {
					var layer = line.search(/\*/) / 2;
					var parent = val;
					var name = line.replace(/\s*\*\s+/, "");
					for (var i = 0; i < layer; i++) {
						parent = [parent.length - 1];
						parent = parent.children
					}
					parent.push({
						name: name,
						children: []
					});
				} else {
					val.push(line.trim());
				}
			}
		}
		function tocgen(cont) {
			return ul(
				cont.map(function(c) {
					return li(
						span(c.name).onclick(Common.goto.bind(null, c.el)).style(style("link")),
						tocgen(c.children)
					);
				})
			);
		}
		contents(tocgen(toc));
		return els;
	}
})();
