/* eslint-disable camelcase */
try {
  require('bindings')('OpenSSL_EVP_BytesToKey')
} catch (err) {
  console.error('Run "npm run test:prepare" first')
  process.exit(1)
}

var OpenSSL_EVP_BytesToKey = require('bindings')('OpenSSL_EVP_BytesToKey')
var crypto = require('crypto')
var test = require('tape')
var EVP_BytesToKey = require('../')

function createHashMD5 () { return crypto.createHash('md5') }
var keyLen = 32
var ivLen = 16

var counts = [1, 2, 100]
for (var i = 0; i < counts.length; ++i) {
  var count = counts[i]

  test('count = ' + count, function (t) {
    var salt = crypto.randomBytes(8)
    var data = crypto.randomBytes(10 + Math.round(Math.random() * 100))

    t.test('salt is null', function (t) {
      var result = EVP_BytesToKey(createHashMD5, null, data, count, keyLen, ivLen)
      var expected = OpenSSL_EVP_BytesToKey.md5_key32_iv16(null, data, count)
      t.same(result, expected)
      t.end()
    })

    t.test('salt is not null', function (t) {
      var result = EVP_BytesToKey(createHashMD5, salt, data, count, keyLen, ivLen)
      var expected = OpenSSL_EVP_BytesToKey.md5_key32_iv16(salt, data, count)
      t.same(result, expected)
      t.end()
    })

    t.end()
  })
}

test('salt buffer length is 7', function (t) {
  t.throws(function () {
    EVP_BytesToKey(createHashMD5, new Buffer(7))
  }, /^RangeError: salt should be Buffer with 8 byte length$/)
  t.end()
})
