# NODEJS Http Header Parser #

Http Header Parser

e.g.)

```js
let ret = parse('GET / HTTP/1.1');
console.log(ret);
```

output:

```js
{ firstline: [ 'GET', '/', 'HTTP/1.1' ], headers: {} }
```

e.g.)

```js
let ret = parse('GET / HTTP/1.1\r\nContent-Type: text/plain\r\nEXT:\r\n\r\n');
console.log(ret);
```

output:

```js
{
  firstline: [ 'GET', '/', 'HTTP/1.1' ],
  headers: { 'Content-Type': 'text/plain', EXT: '' }
}
```
