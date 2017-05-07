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
			options[m[0]] = m[1];     // Set default
			res[m[0]] = function(a) { // Set modifier
				options[m[0]] = a;
				return res;
			}
		});

		// Renderer
		res.render = function(segments, ind, container) {
			if ((path || '') === segments[ind]) {
				if (ind + 1 === segments.length) {
					options.transition(container, options.view);
					return true;
				} else {
					for (var i = 0; i < subs.length; i++) {
						if (subs[i].render(segments, ind + 1, container)) {
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

	function currentPath() {
		var loc = window.location.href;
		if (options.hash) loc = loc.split("#")[1] || '/';
		else loc = loc.slice(options.base.length);
		if (loc.length === 1) loc = "";
		loc = loc.split("/");
		while (loc.length > 1 && loc[0] === "") loc = loc.slice(1);
		return loc;
	}

	N.router = function(opts) {
		for (var key in opts) {
			options[key] = opts[key];
		}
		return function() {
			subs = [].slice.call(arguments);
			N.go(currentPath());
		}
	};

	N.go = function(path) {
		console.log(path);
		for (var i = 0; i < subs.length; i++) {
			if (subs[i].render(path, 0, options.into)) {
				break;
			}
		}
	}

	N.link = function(to) {
		return div.onclick(function() {
			console.log(options.hash);
			window.history.pushState({}, "", (options.hash ? "#/" : options.base) + to);
			N.go(currentPath());
		});
	}

	var modifiers = [
		["transition", function(c, n) {c.clear()(n());}],
		["view", function() {return div.id("No view set :(");}]
	];

})();
