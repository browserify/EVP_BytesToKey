#include <node.h>
#include <nan.h>
#include <openssl/evp.h>

NAN_METHOD(md5_key32_iv16) {
  Nan::HandleScope scope;

  const EVP_CIPHER* cipher = EVP_get_cipherbyname("aes-256-cbc");

  const unsigned char* salt = NULL;
  if (!info[0]->IsNull()) {
    salt = (const unsigned char*) node::Buffer::Data(info[0].As<v8::Object>());
  }

  v8::Local<v8::Object> data_buffer = info[1].As<v8::Object>();
  const unsigned char* data = (const unsigned char*) node::Buffer::Data(data_buffer);

  const int count = info[3].As<v8::Integer>()->Value();
  unsigned char key[32] = {0};
  unsigned char iv[16] = {0};

  int key_len = EVP_BytesToKey(cipher, EVP_md5(), salt, data, node::Buffer::Length(data_buffer), count, key, iv);
  if (key_len != 32) {
    return Nan::ThrowRangeError("invalid key length returned");
  }

  v8::Local<v8::Object> obj = Nan::New<v8::Object>();
  obj->Set(Nan::New<v8::String>("key").ToLocalChecked(), Nan::CopyBuffer((const char*) key, 32).ToLocalChecked());
  obj->Set(Nan::New<v8::String>("iv").ToLocalChecked(), Nan::CopyBuffer((const char*) iv, 16).ToLocalChecked());
  info.GetReturnValue().Set(obj);
}

NAN_METHOD(md5_key32_iv0) {
  Nan::HandleScope scope;

  const EVP_CIPHER* cipher = EVP_get_cipherbyname("aes-256-cbc");

  const unsigned char* salt = NULL;
  if (!info[0]->IsNull()) {
    salt = (const unsigned char*) node::Buffer::Data(info[0].As<v8::Object>());
  }

  v8::Local<v8::Object> data_buffer = info[1].As<v8::Object>();
  const unsigned char* data = (const unsigned char*) node::Buffer::Data(data_buffer);

  const int count = info[3].As<v8::Integer>()->Value();
  unsigned char key[32] = {0};

  int key_len = EVP_BytesToKey(cipher, EVP_md5(), salt, data, node::Buffer::Length(data_buffer), count, key, NULL);
  if (key_len != 32) {
    return Nan::ThrowRangeError("invalid key length returned");
  }

  v8::Local<v8::Object> obj = Nan::New<v8::Object>();
  obj->Set(Nan::New<v8::String>("key").ToLocalChecked(), Nan::CopyBuffer((const char*) key, 32).ToLocalChecked());
  obj->Set(Nan::New<v8::String>("iv").ToLocalChecked(), Nan::CopyBuffer((const char*) NULL, 0).ToLocalChecked());
  info.GetReturnValue().Set(obj);
}

NAN_MODULE_INIT(Init) {
  Nan::Export(target, "md5_key32_iv16", md5_key32_iv16);
  Nan::Export(target, "md5_key32_iv0", md5_key32_iv0);
}

NODE_MODULE(OpenSSL_EVP_BytesToKey, Init)
