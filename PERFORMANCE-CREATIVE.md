# Creative effects validation

Measured on the local Windows development PC, using the repository sample-town JPEG at a 1024-pixel longest edge. Each measurement is the median of three warmed worker renders. These are render times, not total application latency or guarantees for other hardware.

| Effect | Initial automatic renderer (ms) | Final automatic renderer (ms) | Final worker CPU (ms) |
| --- | ---: | ---: | ---: |
| Neutral | 8.7 | 8.1 | 4.4 |
| Highlight compression | 8.0 | 8.1 | 7.3 |
| Three-reflection prism | 205.6 | 9.1 | 156.5 |
| Darkroom paper toning | 25.8 | 7.8 | 10.8 |
| Double exposure | 39.1 | 47.1 | 33.8 |

Prism and darkroom initially used worker CPU callbacks within the float GPU pipeline. Dedicated GPU passes remove those round trips. Highlight compression is combined with the existing GPU light/color pass. Double exposure currently remains a CPU worker operation; timings show there is room to accelerate it. Disabled effects do not add image passes.

Validation: CPU versus GPU display results differed by at most one 8-bit channel value for prism, and zero for the other measured effects. A transformed, shadow-targeted double exposure combined with prism, compression and printing differed from its 16-bit PNG export by at most one displayed channel level. A real Sony ARW was successfully used as a high-precision second exposure.

Run `npm test` for kernel/storage tests and `npm run test:creative` for isolated Electron UI, rendering, persistence, export and benchmark checks. The UI test creates a temporary library; it does not open the user's photo library. GPU support and working-memory limits can select a CPU fallback.
