var Common = (function() {
	var res = {};
	res.findEl = function(nutel) {
		var obj = nutel.val;
		var curtop = 0;
		if (obj.offsetParent) {
			do {
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
			return [curtop];
		}
	};
	res.goto = function(el) {window.scroll(0, res.findEl(el));};
	res.ldash = function(text) {
		return text.toLowerCase().replace(/\s/g, "-");
	}
	return res;
})();

