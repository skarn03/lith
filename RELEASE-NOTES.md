# Lith 0.11.0

**[Download Windows](https://github.com/skarn03/lith/releases/latest/download/Lith-Windows.exe)** · **[Download Mac (Apple Silicon)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-AppleSilicon.dmg)** · **[Download Mac (Intel)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-Intel.dmg)**

## What’s new

- Float32 image processing for new imports, direct 16-bit developed RAW input, and 16-bit PNG export. Existing photos retain their original rendering until you change Quality.
- GPU curves, color mixing/grading, diffusion, glow, halation, sharpening, grain and mask adjustments, with worker fallbacks. Compatible effects remain on the GPU between passes; buffers and unchanged mask coverage are reused.
- Viewport-aware previews, responsive editing proxies, automatic refinement, native detail at 100%, and an HQ button for full-resolution settled previews. Reduced RAW previews use area-averaged mip levels.
- Grouped virtual copies with larger hover previews and quick version switching.
- Ctrl/Command-click multiple Develop tabs, then right-click to copy/move them into an existing or new node. A Copy / move button opens finer section controls.
- Ctrl/Command+C / V copies selected tabs or the clicked node across photos and nodes, with Undo and preservation of unrelated edits.
- Clearer active-mask controls, compact Sub masks and New mask above the active selection. Inverted copy creates an independent mask with the opposite combined coverage.
- Ctrl/Command+D enables/disables a node; Ctrl/Command+Backspace removes the selected node while retaining at least one. Both are customizable.

The local warmed 1024px benchmark measured color edits at 91.9 ms CPU / 11.0 ms GPU, glow at 210.6 / 9.0 ms, and halation at 533.5 / 18.1 ms. These compare the new float implementations on one Windows PC, not all app activity. Tested CPU/GPU previews differed by at most one display channel level. A 65,536-level ramp survived float exposure recovery and 16-bit PNG export without losing levels. A real 26MP Sony RAW import, full-size export and edit reopening also passed.

## Installation and updates

Windows: install the `.exe` above. Later releases download inside Lith; open **Updates → Save & restart to update** when ready.

Mac: choose Apple Silicon for M1 or later, or Intel for older Intel Macs, then install from the `.dmg`. These are unsigned experimental builds, not interactively tested on a Mac. macOS may block the app. Mac automatic installation is disabled until signing and notarization are configured; **Updates → Open downloads** opens the latest release for manual installation.

Both platforms are unsigned. Windows may show an unknown-publisher warning.

RAW support depends on the camera and compression. High precision uses encoded-sRGB float processing, not a scene-linear color-managed workflow. JPEG/WebP/display, mask coverage, text rasterization and the legacy flare intermediate remain 8-bit. Large images and large blurs can use the CPU fallback. Full-resolution HQ previews may take longer; fast slider previews remain enabled. See ENGINE-ARCHITECTURE.md for limits and reproducible benchmarks.

## Existing portable users

Close the portable app. Install Lith, open **Updates → Import existing library**, and select the old `Luma Library` folder. Restore is only available while the installed library is empty. This copies originals, edits, ratings and custom looks without removing the source. Keep your backup until you verify the copy.

Installed libraries are outside the app installation: `%APPDATA%\Lith\library` on Windows and `~/Library/Application Support/Lith/library` on Mac. Updates do not replace these folders.

The app works offline. Update checks contact GitHub; your photos are not uploaded.
