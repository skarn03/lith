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
