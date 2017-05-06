(function(undefined) {
	
	var N = Nutmeg;
	eval(N.localScope);

	N.sub = function(path) {
		var options = {};
		var subs = [];

		var res = function() {
			subs = subs.concat([].slice.call(arguments));
			return res;
		}

		// Apply modifiers
		modifiers.forEach(function(m) {

			// Set default
			options[m[0]] = m[1];

			// Enable mutation
			res[m[0]] = function(a) {
				options[m[0]] = a;
				return res;
			}
		});

		// Renderer
		res.render = function(segments, ind, container) {
			if ((path || '') === segments[ind]) {
				if (ind + 1 === segments.length) {
					container.clear()(options.view());
					return true;
				} else {
					for (var i = 0; i < subs.length; i++) {
						if (subs[i].render(segments, ind + 1, base)) {
							return true;
						}
					}
				}
			} 
			return false;
		};

		res.path = path;
		return res;
	};

	var subs;
	var options = {
		hash: true,
		base: "http://localhost:8080",
		into: body
	};

	function evalLoc() {
		var loc = window.location.href;
		if (options.hash) loc = loc.split("#")[1] || '/';
		else loc = loc.slice(options.base.length);
		N.go(loc);
	}

	function opts(o) {
		for (var key in o) {
			options[key] = o[key];
		}
	}

	N.router = function() {
		opts(arguments[0]);
		subs = [].slice.call(arguments).slice(1);
		evalLoc();
	};

	N.go = function(path) {
		var split = path.split("/").slice(1);
		for (var i = 0; i < subs.length; i++) {
			if (subs[i].render(split, 0, options.into)) {
				break;
			}
		}
	}

	N.link = function(to) {
		return div.onclick(function() {
			N.go(to);
		});
	}

	var modifiers = [
		["transition", function(o, n) {o.clear()(n);}],
		["view", function() {return div.id("No view set :(");}]
	];

})();
