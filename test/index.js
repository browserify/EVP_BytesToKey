/* eslint-disable camelcase */
try {
  require('bindings')('OpenSSL_EVP_BytesToKey')
} catch (err) {
  console.error('Run "npm run test:prepare" first')
  process.exit(1)
}

var Buffer = require('safe-buffer').Buffer
var OpenSSL_EVP_BytesToKey = require('bindings')('OpenSSL_EVP_BytesToKey')
var crypto = require('crypto')
var test = require('tape')
var EVP_BytesToKey = require('../')

var keyLen = 256
var ivLen = 16

for (var i = 0; i < 1000; ++i) {
  var password = crypto.randomBytes(10 + Math.round(Math.random() * 100))
  var salt = crypto.randomBytes(8)

  test('password: ' + password.toString('base64') + ', salt: null', function (t) {
    var result = EVP_BytesToKey(password, null, keyLen, ivLen)
    var expected = OpenSSL_EVP_BytesToKey.md5_key32_iv16(null, password, 1)

    t.same(result, expected)
    t.end()
  })

  test('password: ' + password.toString('base64') + ', salt: ' + salt.toString('base64'), function (t) {
    var result = EVP_BytesToKey(password, salt, keyLen, ivLen)
    var expected = OpenSSL_EVP_BytesToKey.md5_key32_iv16(salt, password, 1)
    t.same(result, expected)
    t.end()
  })

  test('password: ' + password.toString('base64') + ', salt: ' + salt.toString('base64') + ', no iv', function (t) {
    var result = EVP_BytesToKey(password, salt, keyLen, 0)
    var expected = OpenSSL_EVP_BytesToKey.md5_key32_iv0(salt, password, 1)

    t.same(result, expected)
    t.end()
  })
}

test('salt buffer length is 7', function (t) {
  t.throws(function () {
    EVP_BytesToKey(Buffer.alloc(5), Buffer.alloc(7))
  }, /^RangeError: salt should be Buffer with 8 byte length$/)
  t.end()
})
