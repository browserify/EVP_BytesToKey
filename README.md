# EVP_BytesToKey

[![NPM Package](https://img.shields.io/npm/v/evp_bytestokey.svg?style=flat-square)](https://www.npmjs.org/package/evp_bytestokey)
[![Build Status](https://img.shields.io/travis/crypto-browserify/EVP_BytesToKey.svg?branch=master&style=flat-square)](https://travis-ci.org/crypto-browserify/EVP_BytesToKey)
[![Dependency status](https://img.shields.io/david/crypto-browserify/EVP_BytesToKey.svg?style=flat-square)](https://david-dm.org/crypto-browserify/EVP_BytesToKey#info=dependencies)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


The super secure [key derivation algorithm from openssl][1]

**ALERT**

**is not actually secure, only every use it for compatibility reasons**

**Newer applications should use more standard algorithms such as PBKDF2 as defined in PKCS#5v2.1 for key derivation.**

## API

`EVP_BytesToKey(createHash, salt, data, count, keyLen, ivLen)`

* `createHash` - function which return [node Hash class][2].
* `salt` - 8 byte `Buffer` or `null`, salt is used as a salt in the derivation.
* `data` - `Buffer`, data which is used to derive the keying data.
* `count` - `number`, count is the iteration count to use.
* `keyLen` - `number`, key length in bytes.
* `ivLen` - `number`, iv length in bytes.

*Return*: `{ key: Buffer, iv: Buffer }`

## Examples

MD5 with AES256:

```js
const crypto = require('crypto')
const EVP_BytesToKey = require('evp_bytestokey')

const data = EVP_BytesToKey(
  () => crypto.createHash('md5'),
  null,
  'my-secret-data',
  1,
  32,
  16
)
// =>
// { key: <Buffer e3 4f 96 f3 86 24 82 7c c2 5d ff 23 18 6f 77 72 54 45 7f 49 d4 be 4b dd 4f 6e 1b cc 92 a4 27 33>,
//   iv: <Buffer 85 71 9a bf ae f4 1e 74 dd 46 b6 13 79 56 f5 5b> }

const cipher = crypto.createCipheriv('aes-256-cbc', data.key, data.iv)
```

## LICENSE [MIT](LICENSE)

[1]: https://wiki.openssl.org/index.php/Manual:EVP_BytesToKey(3)
[2]: https://nodejs.org/api/crypto.html#crypto_class_hash
