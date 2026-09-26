# Image engine · 0.15

Electron and the existing editor remain intact. Edits are nondestructive parameter documents; originals are never overwritten. `render-client.js` handles worker messaging, while `image-engine.js` is the Electron-independent rendering boundary. Native/Rust backends can later implement this same parameter contract without replacing the controls.

## Pipeline

Preview: original → cached geometry / reduced source → worker GPU or CPU effects → transferred ImageBitmap → display. Interactive proxies adapt between 640 and 1280 pixels. Settled previews use viewport size, device pixel ratio and zoom. At 100% zoom, eligible stacks refine a viewport-sized source region above a reduced base preview, with a 16 MiB region cache. Unsupported stacks or HQ use the full source. Fast and final renders use separate worker lanes with stale-result rejection. Panning changes layout immediately and schedules the newly visible detail region after 90 ms.

Export: original → same parameter stack and precision mode → full-resolution or requested-size render → output sharpening → encoder. The same backend selector is used; a fresh export worker normally returns CPU output while GPU initialization warms up. Large sources and unsupported work also use CPU workers. Eligible full-size PNG exports stream 256-row strips; other eligible large renders use tiled intermediates. PNG exports from high-precision mode are 16-bit; JPEG/WebP and ordinary display output are 8-bit.

`precision-source.js` reads the actual 16-bit LibRaw-developed PNG cache without passing its channels through an 8-bit browser decode. Geometry and reduced previews are prepared directly from that data. Area-averaged mip levels reduce aliasing before bilinear sampling; native-size processing retains the source samples. JPEG/browser sources start with their existing 8-bit data. Small version thumbnails use the browser-decoded proxy rather than decoding the full 16-bit RAW again for every copy. They are display aids, not export-quality proofs. Sources are sent once per worker lane and reused until the photo or precision mode changes.

## Precision and compatibility

New imports use float32. Existing photos keep their previous rendering; Quality can opt them into the new path with Undo. `float-engine.js` and `float-kernels.js` keep image channels in Float32Array buffers between effects, including values above display white when the operation permits them. Curves are continuous rather than 256-entry quantized lookup tables. PNG16 export quantizes only the finished result. GPU arithmetic/storage use float32, rather than claiming every stage is float16.

Opt-in RAW development uses LibRaw white balance (camera/auto/custom multipliers/neutral greybox), exposure and highlight reconstruction before producing a 16-bit linear Rec.2020 cache. `raw-color.js` explicitly transforms it to extended encoded sRGB float for compatibility with the existing creative kernels. Optical blurs linearize/re-encode on CPU or GPU for this source; the entire edit stack is not scene-linear. Legacy source caches and existing saved edits retain their interpretation. Custom camera profiles and soft-proofing are not provided. Browser-decoded inputs use Chromium color handling and explicit sRGB canvas contexts. PNG16 includes sRGB metadata; JPEG/WebP include a generated sRGB matrix/TRC ICC profile through `color-metadata.js`. The display remains an sRGB canvas, not an independently profiled/HDR presentation path. Mask coverage and text rasterization remain 8-bit. The flare generator uses a legacy 8-bit effect intermediate whose delta is added to the float image. Some effects intentionally clamp or remap values by design. The normal display is still 8-bit, so a 16-bit export can contain more tonal levels than the on-screen canvas.

The original-rendering CPU path retains stage-by-stage rounding to preserve existing edits. Its optional GPU fast path supports basic tonal stacks. The float path has broader GPU coverage; optical blur uses a three-box approximation and may differ from the older canvas-based rendering. Keeping the original mode avoids silently changing saved edits.

## GPU and workers

- Float GPU fuses exposure, contrast, highlights/shadows, white balance, saturation/vibrance, curves, HSL and grading within a compatible operation.
- Separable blur, diffusion, bloom threshold extraction, glow, halation, detail/sharpening, grain/fade and local mask adjustment/compositing run on GPU. This does not include GPU mask shape rasterization: geometry and combinations remain cached worker work.
- Image buffers remain on the GPU between compatible effects. CPU-specific operations create a synchronization boundary; no claim of zero readbacks across all stacks.
- Source buffers, a working-buffer pool and unchanged mask coverage are reused. Per worker: GPU retained source up to 64 MiB, reusable pool up to 96 MiB, mask coverage up to 64 MiB; GPU working allocation cap 256 MiB. Device limits can reduce eligibility further.
- Source float preparation is cached by source, geometry and resolution. CPU transformed-base cache: 64 MiB / 3 entries; mask geometry cache: 32 MiB / 12 entries; RAW mip cache: 64 MiB per decoded source. Caches are bounded individually, not by one app-wide memory cap. Multiple worker lanes may hold independent source/cache copies.
- GPU initialization warms up in the background; first frames can use CPU. Missing WebGPU, device failures, oversized buffers, excessive working allocations and large blur radii fall back to float CPU processing. Full-resolution CPU fallbacks and LibRaw decoding still need substantial RAM.
- Mask overlays have a dedicated latest-request worker, separate from image effects. Expensive work stays off the UI thread. CPU operations share pixel data where compatible; redundant explicit pre-message cloning was removed.

## Measured results

Warmed worker round trips on the development Windows PC, bundled 1024px public photograph, new float CPU compared with new float GPU:

| Stack | CPU | GPU |
| --- | ---: | ---: |
| Color / curves / grading | 91.9 ms | 11.0 ms |
| Glow | 210.6 ms | 9.0 ms |
| Diffusion | 411.7 ms | 8.7 ms |
| Halation | 533.5 ms | 18.1 ms |
| Four masks | 62.9 ms | 8.8 ms |
| Grain / fade | 21.6 ms | 9.7 ms |
| Clarity / texture / sharpening | 568.0 ms | 11.7 ms |

A combined stack with CPU-only work measured 1545.8 ms CPU / 374.1 ms GPU, illustrating the remaining fallback cost. Tested GPU/CPU outputs differed by at most one 8-bit display channel level. These are local warmed measurements, not a guarantee for all hardware, cold compilation, exports or photo switching. They compare float implementations, not old 8-bit versus new float behavior.

Earlier legacy CPU batching/cache changes reduced the 1440px four-mask/color test from 412.7 to 310.0 ms, with byte-identical output. Legacy basic tonal GPU processing measured 26.5 ms CPU / 3.2 ms GPU at 1440px. Removing synchronous GPU warmup reduced first-frame blocking from roughly 786 to 12.7 ms by returning CPU output first.

## Validation

- `npm test`: normal regressions plus direct 16-bit decode/encode, 65,536-level exposure recovery, source identity, anti-aliased reduction and continuous curves.
- `npm run benchmark:float`: native Electron float CPU/GPU timing and display parity for color, optics, masks, grain and detail, using an isolated temporary library and bundled public sample.
- `npm run benchmark:engine`: legacy basic GPU/CPU comparison.
- Additional development checks passed real Sony FX30 RAW import (6240×4168), full-size export, save/reopen; GPU 16-bit ramp export with all 65,536 levels; grouped versions; tab/node copying; inverted masks; node shortcuts; HQ/native preview; quick-save destination persistence.

GPU benchmarks need a graphical desktop and GPU access. Fallback-only devices remain supported and should not be represented as having measured GPU acceleration. No custom .cube LUT importer is introduced by this change.

## Tiled rendering and source development (0.15)

`TiledEngine.forSource` rejects transformations/resized browser sources and unsupported spatial operations. The planner conservatively sums three-box blur neighborhoods across nodes and looks. Masks, grain, matte, vignette, text, frames, prism, double exposure, flare and excessive halos retain whole-image processing. No effect is silently dropped. Eligible renders above 4 MP use 768-pixel tile widths and 512-row strips; PNG16 exports above 2 MP use 256-row streamed strips, including output sharpening. `PNG16.encodeStrips` compresses rows incrementally. Non-PNG output still assembles the final full image; RAW decode and PNG16 source decode still hold the full source. Disk RAW variants are keyed by source and normalized development parameters; automatic disk eviction is not yet implemented.

A 3000×2000 CPU PNG benchmark measured whole-image 682 ms versus streaming 1041 ms. The largest individual Float32 allocation fell from 96,000,000 to 12,288,000 bytes (87.2% smaller). This measures the largest allocation, **not peak process RAM**; streaming is a memory tradeoff and not a blanket speed improvement. Small images stay on the whole-image path. Detailed measurements are in [raw-pipeline-0.15.json](docs/benchmarks/raw-pipeline-0.15.json).

Before/after warmed GPU measurements at 1024px: color 10.2 → 8.9 ms, glow 12.5 → 14.6 ms, diffusion 16.2 → 22.5 ms, halation 25.9 → 21.1 ms, masks 13.0 → 9.2 ms, grain 10.1 → 8.3 ms, detail 19.6 → 19.0 ms. There is no uniform speedup; these runs include timing variability and retain the existing GPU kernels for legacy inputs. Linear-light RAW optical processing is a quality change with its own cost.

`npm run test:raw-pipeline` tests synthetic DNG development/cache variants, undo/redo/reopen, visible 1:1 detail while panning, export dimensions/color tags and whole-image/tile parity. Point, detail, optical and modern RAW optical CPU tile output matched exactly; modern RAW optical GPU/CPU differed by less than 0.0001 in 0–255 float units in the fixture. Geometry/resizing fallback is tested explicitly. No real camera RAW files were available for this controls update; synthetic coverage does not establish support for every model or compression. `npm run benchmark:tiles` reproduces the PNG memory-allocation/time comparison using an isolated temporary library.
