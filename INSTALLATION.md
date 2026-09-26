# Installing Lith

Download only from [skarn03/lith releases](https://github.com/skarn03/lith/releases/latest). Each release includes SHA256SUMS.txt for checking complete downloads. Checksums verify bytes, not a trusted publisher identity.

## Mac: damaged after copying to Applications

Use Apple Silicon for M1 or newer, and Intel for Intel Macs. Version 0.11.1 changes test packaging from no signing to explicit ad-hoc bundle signing, and verifies bundle signatures and disk images in CI. It also launches the native app and tests importing, previewing and saving a photo. Replace the previous Lith.app with the current release; your library is separate at ~/Library/Application Support/Lith/library. Do not delete that library.

An ad-hoc signature checks integrity but is not Apple Developer ID signing or notarization. Gatekeeper can still block a downloaded app. If the message is about an unidentified developer or an app Apple cannot verify, [Apple’s instructions](https://support.apple.com/en-us/102445) explain the per-app Open Anyway option in System Settings → Privacy & Security. Use it only for a download you choose to trust. If the app still says damaged, provide the exact message, macOS version, chip type and release version. A damaged message alone does not prove download corruption. Do not disable Gatekeeper globally.

If the DMG itself cannot open, re-download it and compare its SHA-256 checksum with SHA256SUMS.txt. Report whether the failure happens opening the DMG or opening the installed app.

## Windows: More info / Run anyway

Lith’s current test installers have no verified publisher certificate. SmartScreen can warn about unsigned or low-reputation downloads. Rebuilding, changing the installer UI, or renaming the file will not establish publisher trust. A certificate-backed signature and reputation are needed; signing alone does not guarantee warnings disappear immediately. [Microsoft explains SmartScreen reputation](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation).

Use the official release download, verify its checksum if needed, and follow your organization’s installation policies. No installer script disables Windows security settings. Installed libraries remain separate from the application at %APPDATA%\Lith\library.

## Production distribution still needs

- Apple Developer ID signing and notarization, with credentials stored as GitHub secrets, to establish Apple publisher trust.
- Windows publisher signing, updater signature verification and an appropriate distribution/reputation strategy.

Those credentials are not currently configured. No passwords or private keys should be committed to the repository or pasted into chat.
