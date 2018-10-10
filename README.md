# EVP\_BytesToKey
[![NPM Package](https://img.shields.io/npm/v/evp_bytestokey.svg?style=flat-square)](https://www.npmjs.org/package/evp_bytestokey)
[![Build Status](https://img.shields.io/travis/crypto-browserify/EVP_BytesToKey.svg?branch=master&style=flat-square)](https://travis-ci.org/crypto-browserify/EVP_BytesToKey)
[![Dependency status](https://img.shields.io/david/crypto-browserify/EVP_BytesToKey.svg?style=flat-square)](https://david-dm.org/crypto-browserify/EVP_BytesToKey#info=dependencies)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

The insecure [key derivation algorithm from OpenSSL.][1]

**WARNING: DO NOT USE, except for compatibility reasons.**

MD5 is insecure.

Use at least `scrypt` or `pbkdf2-hmac-sha256` instead.


## API
`EVP_BytesToKey(password, salt, keyLen, ivLen)`

* `password` - `Buffer`, password used to derive the key data.
* `salt` - 8 byte `Buffer` or `null`, salt is used as a salt in the derivation.
* `keyBits` - `number`, key length in **bits**.
* `ivLen` - `number`, iv length in bytes.

*Returns*: `{ key: Buffer, iv: Buffer }`


## Examples
MD5 with `aes-256-cbc`:

```js
const crypto = require('crypto')
const EVP_BytesToKey = require('evp_bytestokey')

const result = EVP_BytesToKey(
  'my-secret-password',
  null,
  256,
  16
)
// =>
// { key: <Buffer a2 d9 67 9c 7f ff 3e 9c f4 30 0a 2c c3 fb ad 79 59 ed ae e8 a4 3c 1a 9d 71 68 ea c4 68 08 a5 7a>,
//  iv: <Buffer bf 5e 15 5a 28 94 3b 10 46 31 24 84 60 9c 5f 3c> }

const cipher = crypto.createCipheriv('aes-256-cbc', result.key, result.iv)
```

## LICENSE [MIT](LICENSE)

[1]: https://wiki.openssl.org/index.php/Manual:EVP_BytesToKey(3)
[2]: https://nodejs.org/api/crypto.html#crypto_class_hash
