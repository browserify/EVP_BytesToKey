{
  "targets": [{
    "target_name": "OpenSSL_EVP_BytesToKey",
    "sources": [
      "./test/main.cc",
    ],
    "cflags": [
      "-Wall",
      "-Wno-maybe-uninitialized",
      "-Wno-uninitialized",
      "-Wno-unused-function",
      "-Wextra"
    ],
    "cflags_cc+": [
      "-std=c++0x"
    ],
    "include_dirs": [
      "/usr/local/include",
      "<!(node -e \"require('nan')\")"
    ],
    "conditions": [
      [
        "OS=='mac'", {
          "libraries": [
            "-L/usr/local/lib"
          ],
          "xcode_settings": {
            "MACOSX_DEPLOYMENT_TARGET": "10.7",
            "OTHER_CPLUSPLUSFLAGS": [
              "-stdlib=libc++"
            ]
          }
        }
      ]
    ]
  }]
}
