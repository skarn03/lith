# Lith 0.9.2

## Color grading made easier

Color → Color grading now has four always-visible color wheels for Shadows, Midtones, Highlights and Overall. Drag for hue and saturation, adjust strength independently, and reset each wheel. Keyboard control, per-node settings and undo/redo are supported. Existing grading values are preserved.

## Downloads

- Windows: download the `win-x64.exe` installer. Install once; later releases download inside Lith. Open **Updates**, then **Save & restart to update** when ready.
- Apple Silicon Mac (M1 and later): download the `mac-arm64-unsigned.dmg`.
- Intel Mac: download the `mac-x64-unsigned.dmg`.

Windows and Mac builds are unsigned. Windows may show an unknown-publisher warning. macOS may block the unsigned test app. Mac auto-installation is deliberately disabled until an Apple Developer signing certificate and notarization are configured. The Mac app's **Updates → Open downloads** opens the current release.

The Mac builds are experimental and have not been interactively tested on a Mac.

## Existing portable users

Close the portable app. Install Lith, open **Updates → Import existing library**, and select the old `Luma Library` folder. Restore is only available while the installed library is empty. This copies originals, edits, ratings and custom looks without removing the source. Keep your backup until you verify the copy.

Installed libraries are outside the app installation: `%APPDATA%\Lith\library` on Windows and `~/Library/Application Support/Lith/library` on Mac. Updates do not replace these folders.

The app works offline. Update checks contact GitHub; your photos are not uploaded.
