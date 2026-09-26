# Lith 0.17.0

**[Download Windows](https://github.com/skarn03/lith/releases/latest/download/Lith-Windows.exe)** · **[Download Mac (Apple Silicon)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-AppleSilicon.dmg)** · **[Download Mac (Intel)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-Intel.dmg)**

- **16 bundled cinematic font families / 30 font faces:** serif, title cards, clean captions, typewriter and handwritten styles. They work offline on Windows and Mac.
- **Text → Browse cinematic fonts:** searchable visual previews and a live sample of your caption.
- **Eight additional caption styles:** Classic cinema, Soft poetry, Luxury editorial, Opening credits, Minimal caption, 35mm diary, Handwritten note and Road movie.
- Included font files are shared by the editor, background renderer and export. Existing system font choices remain available.
- Illustrated README covers the creative effects, preview status, new fonts, workspace customization and editing tools. Added an export gallery with 13 face-screened photographs and two historical screenshots; public copies contain no EXIF/GPS metadata.
- All six creative effects from 0.16 remain included: shutter drag, bokeh painter, fisheye, color bleeding, darkroom light leaks and artificial light placement.

Mac builds remain ad-hoc signed, not Apple-notarized. Windows builds remain unsigned. Font credits and redistribution licenses are included in the app and repository.

---

# Lith 0.16.0

**[Download Windows](https://github.com/skarn03/lith/releases/latest/download/Lith-Windows.exe)** · **[Download Mac (Apple Silicon)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-AppleSilicon.dmg)** · **[Download Mac (Intel)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-Intel.dmg)**

- New **Effects → Creative** section with distinct icons, collapsible controls and per-effect reset.
- **Shutter drag:** directional trails and a movable sharp subject area.
- **Bokeh painter:** paint round or hexagonal discs with color, size and softness controls; undo a whole stroke.
- **Fisheye:** adjustable lens distortion with a click-to-place center.
- **Color bleeding:** spread colors while retaining brightness detail.
- **Darkroom light leaks:** colored washes with placement, angle and spread.
- **Artificial light placement:** click to add soft colored lights, independently grouped by node.
- Preview status beside the zoom controls: quick/refining, fit quality, full resolution or 100% visible detail.
- Painted placements persist through save/reopen, undo/redo, node/tab copying, batch sync and community look sharing.
- README now includes current controls and six real exported examples.

These are creative simulations, not lens correction or depth-aware relighting. New effects run in background workers with float processing and safe whole-image fallback. High-resolution stacks may take longer; no blanket speedup is claimed. Mac builds remain not Apple-notarized and Windows builds remain unsigned.

---

# Lith 0.15.0

**[Download Windows](https://github.com/skarn03/lith/releases/latest/download/Lith-Windows.exe)** · **[Download Mac (Apple Silicon)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-AppleSilicon.dmg)** · **[Download Mac (Intel)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-Intel.dmg)**

- Light → RAW Develop: As Shot/Auto/custom white balance, neutral-area picker, RAW exposure and highlight reconstruction. Apply explicitly; undo and preserve your creative edits.
- Opt-in linear Rec.2020 RAW source, extended sRGB float processing and linear-light optical blur. Existing development remains available.
- Explicit sRGB metadata for PNG16, JPEG and WebP exports.
- Compatible large renders use tiles; compatible PNG exports stream strips with output sharpening. Other stacks safely use the existing renderer.
- Cached visible-area refinement for compatible 100% previews; RAW source settings also reach the second monitor.
- Updated welcome logo and message: “Lith — Art isn’t rented.”

RAW decoding still uses the full source (150 MB / 60 MP limits), and not every operation can be tiled. Creative processing is not entirely scene-linear; mask/text/flare precision limits remain. New RAW controls were tested with a synthetic DNG; camera compatibility varies. See the guide and engine architecture for measured performance and limitations.

Mac builds remain experimental and not Apple-notarized; Windows builds remain unsigned. See [installation help](INSTALLATION.md).

---

# Lith 0.14.0

**[Download Windows](https://github.com/skarn03/lith/releases/latest/download/Lith-Windows.exe)** · **[Download Mac (Apple Silicon)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-AppleSilicon.dmg)** · **[Download Mac (Intel)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-Intel.dmg)**

- New Liᵗʰ app logo and refreshed documentation with current UI screenshots and more exported photographs.
- Softer, warmer Soft white appearance.
- Preview looks without saving them; explicit Apply, Cancel and strength controls beside the photo.
- Scopes beside Nodes: RGB/luminance histograms, luma waveform and RGB parade.
- Customizable workspace, panel resizing, horizontal/vertical arrangements and tab groups, with title/icon dragging and visible drop cues.

Mac builds remain experimental and not Apple-notarized; Windows builds remain unsigned. See [installation help](INSTALLATION.md).

---

# Lith 0.12.1

**[Download Windows](https://github.com/skarn03/lith/releases/latest/download/Lith-Windows.exe)** · **[Download Mac (Apple Silicon)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-AppleSilicon.dmg)** · **[Download Mac (Intel)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-Intel.dmg)**

## What’s new

- **Creative effects:** Prism & Glass reflections, Highlight Compression, Double Exposure, and Darkroom Printing with CMY filters and paper tones. Organized cards include quick recipes, strength sliders and expandable advanced controls.
- **Faster optics:** GPU prism and print processing, plus highlight compression in the existing GPU color pass. The tested 1024-pixel prism preview improved from about 194 ms on the initial CPU implementation to 9 ms on the development PC; results depend on hardware.
- **Community looks:** import and export `.lithlook` files with descriptions and creator credits. Review before importing. Photos and private source references are excluded.
- **Batch workflow:** select photos, sync chosen editing sections, undo a batch sync, and export sequentially with progress and cancellation. Unselected crop, text and masks remain unchanged.
- **Second monitor:** show a full-resolution photo preview on another display, with Fit/100% viewing and a tools-focused editing window.
- **Automatic update overlay:** installed apps check shortly after launch. Windows shows download progress and offers Save & restart when ready. Mac detects releases and offers a manual download. Later dismisses the prompt for that version during the current session.

## Installation and updates

Windows: install the `.exe`. Existing installed versions can receive this release through **Updates → Save & restart**. The new automatic overlay is available after installing 0.12.1. Lith saves before restarting and does not install automatically when you quit.

Mac: choose Apple Silicon for M1 or newer, or Intel for Intel Macs. Copy Lith into Applications. The app is ad-hoc signed, but is **not Apple Developer-ID signed or notarized**. If Apple says it cannot verify Lith is free of malware, close the warning, then use **System Settings → Privacy & Security → Open Anyway** for this app if you trust your download. This is the process confirmed working on the creator’s Mac; do not disable Gatekeeper globally. Other warnings need separate investigation. Mac updates still require replacing the application manually.

Windows remains unsigned and may show SmartScreen warnings. Both Mac bundles and DMGs are verified during release, and the native packaged Mac app is smoke-tested. SHA256SUMS.txt is provided. See [installation troubleshooting](INSTALLATION.md).

RAW support depends on the camera and compression. High precision uses encoded-sRGB float processing, not a scene-linear color-managed workflow. JPEG/WebP/display, mask coverage, text rasterization and the legacy flare intermediate remain 8-bit. Large images and large blurs can use the CPU fallback. Full-resolution HQ previews may take longer; fast slider previews remain enabled. See ENGINE-ARCHITECTURE.md for limits and reproducible benchmarks.

## Existing portable users

Close the portable app. Install Lith, open **Updates → Import existing library**, and select the old `Luma Library` folder. Restore is only available while the installed library is empty. This copies originals, edits, ratings and custom looks without removing the source. Keep your backup until you verify the copy.

Installed libraries are outside the app installation: `%APPDATA%\Lith\library` on Windows and `~/Library/Application Support/Lith/library` on Mac. Updates do not replace these folders.

The app works offline. Update checks contact GitHub; your photos are not uploaded.
