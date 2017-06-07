/* eslint-disable camelcase */
function EVP_BytesToKey(createHash, salt, data, count, keyLen, ivLen) {
  if (Buffer.isBuffer(salt) && salt.length !== 8) {
    throw new RangeError('salt should be Buffer with 8 byte length')
  }
  var key = new Buffer(keyLen)
  var iv = new Buffer(ivLen)
  var mdBuf = new Buffer(0)
  while (keyLen > 0 || ivLen > 0) {
    var hash = createHash()
    hash.update(mdBuf)
    hash.update(data)
    if (salt) {
hash.update(salt)
}
    for (var i = 1; i < count; ++i) {
      mdBuf = createHash().update(mdBuf).digest()
    }
    mdBuf = hash.digest()
    var used = 0
    if (keyLen > 0) {
      var keyStart = key.length - keyLen
      used = Math.min(keyLen, mdBuf.length)
      mdBuf.copy(key, keyStart, 0, used)
      keyLen -= used
    }
    if (used < mdBuf.length && ivLen > 0) {
      var ivStart = iv.length - ivLen
      var length = Math.min(ivLen, mdBuf.length - used)
      mdBuf.copy(iv, ivStart, used, used + length)
      ivLen -= length
    }
  }
  for (var j = 0; j < mdBuf.length; ++j) {
mdBuf[j] = 0
}
  return { key: key, iv: iv }
}
module.exports = EVP_BytesToKey
