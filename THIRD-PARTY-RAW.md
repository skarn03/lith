# RAW decoder dependencies

Lith bundles libraw-wasm 1.6.0 (package metadata: ISC), unmodified.
Source and rebuild instructions: https://github.com/ybouane/LibRaw-Wasm/tree/v1.6.0

Its build uses LibRaw 0.22.1 and Little CMS 2.19.1. LibRaw is available under LGPL 2.1 or CDDL 1.0; Lith distributes it under CDDL 1.0. Corresponding unmodified source: https://github.com/LibRaw/LibRaw/tree/0.22.1 . Copyright and license texts are in licenses/. Little CMS is MIT licensed: https://github.com/mm2/Little-CMS/tree/lcms2.19.1 . The upstream WebAssembly build also links the Emscripten libjpeg, libpng and zlib ports; their license notices are available in their upstream source distributions and the Emscripten source: https://github.com/emscripten-core/emscripten .

Lossless cache encoding uses pngjs 7.0.0 (MIT), bundled with its LICENSE in node_modules/pngjs.
