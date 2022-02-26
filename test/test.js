'use strict';

const { assert } = require('chai');
const parse = require('..');

describe('#parse_http_header', function() {
	
    it('parse http header firstline', function() {
        let ret = parse('M-SEARCH * HTTP/1.1');
		console.log(ret);
    });

	it('parse http header firstline2', function() {
        let ret = parse('M-SEARCH * HTTP/1.1\r\n\r\n');
		console.log(ret);
    });

	it('parse http header msearch full', function() {
        let ret = parse('M-SEARCH * HTTP/1.1\r\nContent-Type: text/plain\r\nEXT:\r\n\r\n');
		console.log(ret);
    });

	it('parse http header response', function() {
        let ret = parse('HTTP/1.1 404 NOT FOUND\r\n\r\n');
		console.log(ret);
    });

	it('parse http header multiple', function() {
        let ret = parse('GET / HTTP/1.1\r\n' +
						'Content-Length: 0\r\n' +
						'EXT: \r\n' +
						'Cookie: foo\r\n' +
						'Cookie: bar\r\n' +
						'Cookie: baz\r\n\r\n', {
							allowMultiple: true
						});
		
		console.log(ret);
		assert.exists(ret.headers['Content-Length'])
		assert.equal(ret.headers['Content-Length'], 0);
		assert.exists(ret.headers.Cookie);
		assert.isArray(ret.headers.Cookie);
		assert.exists(ret.headers.EXT);
		
    });

	it('parse http header lowercase', function() {
        let ret = parse('GET / HTTP/1.1\r\n' +
						'Content-Length: 0\r\n' +
						'EXT: \r\n' +
						'Cookie: foo\r\n' +
						'Cookie: bar\r\n' +
						'Cookie: baz\r\n\r\n', {
							allowMultiple: true,
							lowercaseKey: true,
						});
		
		console.log(ret);
		assert.exists(ret.headers['content-length'])
		assert.equal(ret.headers['content-length'], 0);
		assert.exists(ret.headers.cookie);
		assert.isArray(ret.headers.cookie);
		assert.exists(ret.headers.ext);
		assert.equal(ret.headers.ext, '');
    });
})
