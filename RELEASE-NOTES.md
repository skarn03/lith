# Lith 0.10.0

**[Download Windows](https://github.com/skarn03/lith/releases/latest/download/Lith-Windows.exe)** · **[Download Mac (Apple Silicon)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-AppleSilicon.dmg)** · **[Download Mac (Intel)](https://github.com/skarn03/lith/releases/latest/download/Lith-Mac-Intel.dmg)**

## What’s new

- Separate photo projects, project settings and remembered export folders.
- Faster photo switching, cached previews, background rendering and responsive interactive previews that refine after adjustments.
- Supported camera RAW import alongside JPEGs, with cached development and original files preserved.
- Virtual copies, copy/paste edits and independent versions without duplicating originals.
- Combined masks: add, subtract and intersect brush, linear, radial and color selections.
- Screen and Print export sharpening, with independent strength controls.
- Customizable keyboard shortcuts, fullscreen photo view, direct node selection and quick Develop navigation.
- Ctrl/Command+S quick save at original resolution and 100% JPEG quality by default.
- Inline look-strength sliders, Instagram crop ratios, and improved contact-sheet wheel scrolling.
- Download-first project page, feature screenshots and a gallery of selected real exported edits.

## Installation and updates

Windows: install the `.exe` above. Later releases download inside Lith; open **Updates → Save & restart to update** when ready.

Mac: choose Apple Silicon for M1 or later, or Intel for older Intel Macs, then install from the `.dmg`. These are unsigned experimental builds, not interactively tested on a Mac. macOS may block the app. Mac automatic installation is disabled until signing and notarization are configured; **Updates → Open downloads** opens the latest release for manual installation.

Both platforms are unsigned. Windows may show an unknown-publisher warning.

RAW support depends on the camera and compression. The current editing/export pipeline is 8-bit; this release does not add a full high-bit-depth RAW workflow.

## Existing portable users

Close the portable app. Install Lith, open **Updates → Import existing library**, and select the old `Luma Library` folder. Restore is only available while the installed library is empty. This copies originals, edits, ratings and custom looks without removing the source. Keep your backup until you verify the copy.

Installed libraries are outside the app installation: `%APPDATA%\Lith\library` on Windows and `~/Library/Application Support/Lith/library` on Mac. Updates do not replace these folders.

The app works offline. Update checks contact GitHub; your photos are not uploaded.
