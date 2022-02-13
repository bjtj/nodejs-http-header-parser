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

module.exports = function(txt, allowMultiple = false) {
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
		if (allowMultiple) {
			if (headers[kv[0]] === undefined) {
				headers[kv[0]] = kv[1];
			} else if (Array.isArray(headers[kv[0]])) {
				headers[kv[0]].push(kv[1]);
			} else {
				headers[kv[0]] = [headers[kv[0]], kv[1]];
			}
		} else {
			headers[kv[0]] = kv[1];
		}
	}
	return { 'firstline': parts, 'headers': headers };
}
