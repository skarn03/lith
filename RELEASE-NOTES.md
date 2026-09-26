# Lith 0.11.1

**[Download Windows](https://github.com/skarn03/lith/releases/latest/download/Lith-Windows.exe)** · **[Download Mac (Apple Silicon)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-AppleSilicon.dmg)** · **[Download Mac (Intel)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-Intel.dmg)**

## What’s new

- All 0.11.0 image-engine and editing improvements, plus clearer Develop cards, expandable headers, nested controls and quicker UI feedback.
- Light mode replaced with Soft gray: a lighter charcoal workspace rather than a bright theme.
- Mac test builds now explicitly receive ad-hoc bundle signatures and disable hardened runtime for this non-notarized testing channel, instead of skipping signing entirely. This repairs bundle integrity without claiming a verified Apple publisher identity.
- Release checks verify both Mac app signatures and DMG checksums, then launch the native packaged Mac app to test photo import, rendering, editing and saving. SHA256SUMS.txt is included with downloads.

## Installation and updates

Windows: install the `.exe` above. Later releases download inside Lith; open **Updates → Save & restart to update** when ready.

Mac: choose Apple Silicon for M1 or later, or Intel for older Intel Macs, then install from the `.dmg`. These are experimental ad-hoc-signed builds, without Apple Developer ID or notarization. macOS can still block the app even when bundle integrity passes. A CI launch test does not reproduce every Mac or Gatekeeper download state. Mac automatic installation is disabled until signing and notarization are configured; **Updates → Open downloads** opens the latest release for manual installation.

Windows does not yet have a publisher certificate, so SmartScreen may show More info / Run anyway. This release does not remove that warning. Signing and publisher reputation are needed for smoother distribution.

If a previous Mac version reports damaged after installation, replace the app with this release without deleting your library. Download Apple Silicon for M1 or newer. For an unidentified-developer/not-notarized message, Apple documents **System Settings → Privacy & Security → Open Anyway** for an app you choose to trust. If macOS still reports damaged, report the exact message and macOS version; do not disable Gatekeeper globally. See [installation troubleshooting](INSTALLATION.md).

RAW support depends on the camera and compression. High precision uses encoded-sRGB float processing, not a scene-linear color-managed workflow. JPEG/WebP/display, mask coverage, text rasterization and the legacy flare intermediate remain 8-bit. Large images and large blurs can use the CPU fallback. Full-resolution HQ previews may take longer; fast slider previews remain enabled. See ENGINE-ARCHITECTURE.md for limits and reproducible benchmarks.

## Existing portable users

Close the portable app. Install Lith, open **Updates → Import existing library**, and select the old `Luma Library` folder. Restore is only available while the installed library is empty. This copies originals, edits, ratings and custom looks without removing the source. Keep your backup until you verify the copy.

Installed libraries are outside the app installation: `%APPDATA%\Lith\library` on Windows and `~/Library/Application Support/Lith/library` on Mac. Updates do not replace these folders.

The app works offline. Update checks contact GitHub; your photos are not uploaded.
