'use strict';

var parse = require('..');

describe('#parse_http_header', function() {
	
    it('parse http header firstline', function() {
        let ret = parse('M-SEARCH * HTTP/1.1')
		console.log(ret);
    });

	it('parse http header firstline2', function() {
        let ret = parse('M-SEARCH * HTTP/1.1\r\n\r\n')
		console.log(ret);
    });

	it('parse http header msearch full', function() {
        let ret = parse('M-SEARCH * HTTP/1.1\r\nContent-Type: text/plain\r\nEXT:\r\n\r\n')
		console.log(ret);
    });

	it('parse http header response', function() {
        let ret = parse('HTTP/1.1 404 NOT FOUND\r\n\r\n')
		console.log(ret);
    });

	it('parse http header multiple', function() {
        let ret = parse('GET / HTTP/1.1\r\nContent-Length: 0\r\nEXT: \r\nCookie: foo\r\nCookie: bar\r\nCookie: baz\r\n\r\n', true);
		console.log(ret);
    });
})
