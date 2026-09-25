# Download Lith

| Windows | Mac · Apple Silicon (M1 or later) | Mac · Intel |
| --- | --- | --- |
| **[Download for Windows](https://github.com/skarn03/lith/releases/latest/download/Lith-Windows.exe)** | **[Download for Apple Silicon](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-AppleSilicon.dmg)** | **[Download for Intel Mac](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-Intel.dmg)** |

These links always download the latest release. [All downloads & release notes](https://github.com/skarn03/lith/releases/latest).

Windows includes in-app updates. Mac builds are unsigned experimental test builds with manual updates; macOS may block them. Both platforms are unsigned and may show security warnings. Mac builds have not been interactively tested on a Mac.

# Lith Photo Studio

An offline desktop photo editor for film-inspired, vintage and dreamy photography. Edit JPEGs and supported camera RAW files, organize separate projects, and keep your originals untouched.

![Lith editing workspace with a sample photograph](docs/images/workspace.jpg)

## Create your look

- **Film and dreamy looks:** actual-photo thumbnails, arrow-key auditioning, layered looks with inline strength sliders, and saved custom presets.
- **Light and color:** tone curves, individual color mixing, and always-visible shadow, midtone, highlight and overall grading wheels.
- **Atmosphere:** halation, diffusion and mist, threshold-gated bloom, anamorphic flares, matte shadows, texture and grain.
- **Flexible nodes:** begin with one node; add, rename and toggle more when needed. Every node holds its own edits.
- **Combined masks:** add, subtract or intersect brush, linear, radial and color selections, then adjust the combined area.
- **Finish the frame:** social crop ratios, white borders, cinematic text, before/after and double-click zoom.

| Layer looks and adjust their strength | Grade shadows, midtones and highlights |
| --- | --- |
| ![Layered looks with inline strength](docs/images/layered-looks.jpg) | ![Color grading wheels](docs/images/color-grading.jpg) |

| Combine masks | Explore virtual copies |
| --- | --- |
| ![Mask combination controls](docs/images/mask-combinations.jpg) | ![Virtual copy controls](docs/images/virtual-copies.jpg) |

## A few edits from the creator’s project

These are real exported edits, resized for this gallery with embedded metadata removed. They illustrate finished looks, rather than before/after comparisons.

| Forest | Street | Night |
| --- | --- | --- |
| ![Forest walk](docs/images/sample-forest.jpg) | ![Street scene](docs/images/sample-street.jpg) | ![Night scene](docs/images/sample-night.jpg) |

| Town | Green | City lights |
| --- | --- | --- |
| ![Town scene](docs/images/sample-town.jpg) | ![Green architectural scene](docs/images/sample-green.jpg) | ![City lights](docs/images/sample-city-lights.jpg) |

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

Camera RAW support uses LibRaw and depends on the camera model and compression. RAW files are developed into a cached image; the current editing/export pipeline is 8-bit, not a complete high-bit-depth RAW workflow. Film looks are artistic interpretations. Nodes currently form a serial chain. AI masking and healing are not included.

Read the [full user guide](LITH-GUIDE.md), [release notes](RELEASE-NOTES.md), and [RAW third-party notices](THIRD-PARTY-RAW.md).

## Development

```sh
npm ci
npm start
npm test
```

Build installers with `npm run dist:win` on Windows or `npm run dist:mac` on macOS. See the [publishing guide](RELEASING.md). The renderer is isolated from Node.js; native file operations use a narrow preload bridge.
