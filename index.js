'use strict';

// https://stackoverflow.com/a/29998501
function split(str, sep, n) {
    var out = [];
    while (--n) {
		out.push(str.slice(sep.lastIndex, sep.exec(str).index));
	}
    out.push(str.slice(sep.lastIndex));
    return out;
}

module.exports = function parse(txt, options = {}) {
	let opts = {
		allowMultiple: false,
		lowercaseKey: false,
		...options
	};
	let lines = txt.replace(/^\s+|\s+$/, '').split('\r\n')
	if (lines.length < 1) {
		throw 'parser failed';
	}
	let parts = split(lines[0], /\s+/g, 3);
	let headers = {}
	for (var i = 1; i < lines.length; i++) {
		let line = lines[i];
		let kv = split(line, /:/g, 2).map((elm) => {
			return elm.replace(/^\s+|\s+$/, '')
		});
		let key = kv[0]
		if (opts.lowercaseKey) {
			key = key.toLowerCase()
		}
		let value = kv[1]
		if (opts.allowMultiple) {
			if (headers[key] === undefined) {
				headers[key] = value;
			} else if (Array.isArray(headers[key])) {
				headers[key].push(value);
			} else {
				headers[key] = [headers[key], value];
			}
		} else {
			headers[key] = value;
		}
	}
	return { 'firstline': parts, 'headers': headers };
}
