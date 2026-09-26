# Download Lith

| Windows | Mac · Apple Silicon (M1 or later) | Mac · Intel |
| --- | --- | --- |
| **[Download for Windows](https://github.com/skarn03/lith/releases/latest/download/Lith-Windows.exe)** | **[Download for Apple Silicon](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-AppleSilicon.dmg)** | **[Download for Intel Mac](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-Intel.dmg)** |

These links always download the latest release. [All downloads & release notes](https://github.com/skarn03/lith/releases/latest).

Windows includes in-app updates. Mac builds are experimental, ad-hoc signed and not Apple-notarized, with automatic release notifications and manual installation; macOS may block them. Windows has no publisher certificate and may show SmartScreen warnings. See [installation troubleshooting](INSTALLATION.md). Mac bundle/DMG integrity and native app launch are checked in CI; this does not guarantee Gatekeeper approval on downloaded copies.

# Lith Photo Studio

**Privacy matters. Your photos belong to you.**

Lith is a free, offline desktop photo editor for film-inspired, vintage and dreamy photography. You shouldn’t have to pay big tech companies expensive subscriptions to make your photos look the way you want. No account required, no subscription, and no cloud upload needed to edit.

Your library and edits stay on your computer. Work with JPEGs and supported camera RAW files, organize separate projects, and keep your originals untouched. Update checks connect to GitHub; your photos stay local.

![Lith editing workspace with a sample photograph](docs/images/workspace.jpg)

## Create your look

- **Film and dreamy looks:** actual-photo thumbnails, arrow-key auditioning, layered looks with inline strength sliders, and saved custom presets.
- **Light and color:** tone curves, individual color mixing, and always-visible shadow, midtone, highlight and overall grading wheels.
- **Atmosphere:** halation, diffusion and mist, threshold-gated bloom, anamorphic flares, matte shadows, texture and grain.
- **Creative darkroom:** prism and glass reflections, highlight compression, double exposures, CMY print filters and paper tones.
- **Share your looks:** import/export recipes with descriptions and creator credits, without sharing private photos.
- **Batch and dual displays:** sync selected sections, export multiple photos, and use a second monitor for full-resolution viewing.
- **Flexible nodes:** begin with one node; add, rename and toggle more when needed. Every node holds its own edits.
- **Combined masks:** add, subtract or intersect brush, linear, radial and color selections, then adjust the combined area.
- **Finish the frame:** social crop ratios, white borders, cinematic text, before/after and double-click zoom.

| Layer looks and adjust their strength | Grade shadows, midtones and highlights |
| --- | --- |
| ![Layered looks with inline strength](docs/images/layered-looks.jpg) | ![Color grading wheels](docs/images/color-grading.jpg) |

| Combine masks | Explore virtual copies |
| --- | --- |
| ![Mask combination controls](docs/images/mask-combinations.jpg) | ![Virtual copy controls](docs/images/virtual-copies.jpg) |

## Made with Lith · 15 edits from the creator’s project

These are real exported edits, resized for this gallery with embedded metadata removed. They illustrate finished looks, rather than before/after comparisons.

| Forest | Street | Night |
| --- | --- | --- |
| ![Forest walk](docs/images/sample-forest.jpg) | ![Street scene](docs/images/sample-street.jpg) | ![Night scene](docs/images/sample-night.jpg) |

| Town | Green | City lights |
| --- | --- | --- |
| ![Town scene](docs/images/sample-town.jpg) | ![Green architectural scene](docs/images/sample-green.jpg) | ![City lights](docs/images/sample-city-lights.jpg) |

| Lamplight | Quiet alley | Monochrome street |
| --- | --- | --- |
| ![Lamplight](docs/images/sample-lamplight.jpg) | ![Quiet alley](docs/images/sample-alley.jpg) | ![Monochrome street](docs/images/sample-monochrome.jpg) |

| Café window | Soft sunlight | Evening glow |
| --- | --- | --- |
| ![Café window](docs/images/sample-cafe.jpg) | ![Soft sunlight](docs/images/sample-sunlight.jpg) | ![Evening glow](docs/images/sample-evening.jpg) |

| Dreamy haze | Flowers and foliage | Golden street |
| --- | --- | --- |
| ![Dreamy haze](docs/images/sample-haze.jpg) | ![Flowers and foliage](docs/images/sample-flowers.jpg) | ![Golden street](docs/images/sample-golden-street.jpg) |

## New in 0.11 · faster previews and more tonal detail

New imports use **High precision · 32-bit** processing. Supported RAW files retain their developed 16-bit source detail; high-precision PNG exports are 16-bit. Existing photos keep **Original rendering · 8-bit** to preserve their appearance; change Quality beside the photo name to opt in.

WebGPU accelerates compatible color, curves, grading, diffusion, glow, halation, detail, grain and mask adjustments. Fast previews appear during adjustments and refine automatically afterward. **HQ** requests a full-resolution settled preview; **100% zoom** shows native source detail. Mask shapes and fallback effects run in workers. Availability and speed depend on the GPU and edit stack.

Virtual copies are grouped under one photo with larger hover previews. Ctrl/Command-click Develop tabs to select several, then copy or move only those sections. **Ctrl/Command+C / V** copies selected tabs or the clicked node. **New mask → Inverted copy of active mask** creates an independent opposite selection. **Ctrl/Command+D** enables/disables a node; **Ctrl/Command+Backspace** removes it (one node is always retained).

## A smoother editing workflow

Keep separate projects with their own export settings and destination folders. Create virtual copies without duplicating originals, copy edits between photos, and export with separate Screen or Print sharpening. Preview caching and background rendering improve switching and interactive edits; final previews refine after you stop dragging.

**Ctrl/Command+S** saves an edited copy at original resolution and 100% JPEG quality to your chosen folder. Repeated saves use numbered filenames. **Ctrl/Command+F** opens the full-photo view. **Ctrl/Command+1–9** selects a node, adding one next node when the requested slot is missing. **1–7** selects a Develop section. Press **?** or the keyboard icon to customize shortcuts.

![Customizable keyboard shortcuts](docs/images/keyboard-settings.jpg)

## Getting started

1. Download the installer for your computer above and install Lith.
2. Create a project and import your photos.
3. Choose a look or develop your own edit. Originals remain unchanged.
4. Choose an export destination in project settings, then save an edited copy.

For existing portable libraries, close the old app and use **Updates → Import existing library** in an empty installed library. Keep a backup until you verify the import. Installed libraries live outside the application folder, so app updates preserve your work.

Lith works offline. Update checks contact GitHub; your photo library is not uploaded. Only the selected example exports on this page have been published.

## Current limits

Camera RAW support uses LibRaw and depends on the camera model and compression. RAW files are developed by LibRaw into a 16-bit sRGB cache. High-precision mode uses float32 image buffers and can export 16-bit PNG; JPEG/WebP and the normal display remain 8-bit. This is not a scene-linear or fully color-managed RAW workflow: there are no custom camera profiles, sensor-level white balance or highlight reconstruction controls. Mask coverage and text rasterization remain 8-bit, and the flare generator retains a legacy 8-bit intermediate. Large images and unsupported operations use float CPU fallback, which can take longer and use more RAM. Film looks are artistic interpretations. Nodes currently form a serial chain. AI masking and healing are not included.

Read the [full user guide](LITH-GUIDE.md), [release notes](RELEASE-NOTES.md), and [RAW third-party notices](THIRD-PARTY-RAW.md).

## Development

```sh
npm ci
npm start
npm test
```

Build installers with `npm run dist:win` on Windows or `npm run dist:mac` on macOS. See the [publishing guide](RELEASING.md). The renderer is isolated from Node.js; native file operations use a narrow preload bridge.
