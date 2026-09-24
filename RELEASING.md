# Lith release setup

Repository: https://github.com/skarn03/lith
Downloads: https://github.com/skarn03/lith/releases/latest

## Publish a new version

1. Change `version` in `package.json`; run `npm install --package-lock-only`.
2. Update `RELEASE-NOTES.md`, run `npm test`, and commit the changes.
3. Push the commit, then create and push a matching tag, for example `v0.9.1`.
4. GitHub Actions builds Windows x64 and Mac arm64/x64, then publishes the installers and update metadata together. No personal token is bundled in Lith.

Windows checks shortly after launch and every four hours while open. **Updates → Check for updates** checks immediately. Downloads happen in the background. Installation happens only after **Save & restart to update**, after pending photo edits have been saved successfully. The update UI reports offline/server failures without blocking editing.

## Current signing limitations

Windows NSIS builds are unsigned and update signature checks are disabled for this unsigned testing channel. GitHub HTTPS and updater checksums protect transport/integrity, but this does not provide a verified publisher identity. Before public production distribution, configure Windows signing and re-enable `verifyUpdateCodeSignature`.

Mac builds are unsigned tests, with manual download links only. Standard Mac automatic installation requires a signed app. Future Mac signing should use GitHub secrets, not files committed to this repository. Do not turn on the Mac updater merely by setting an environment variable without signing/notarizing the actual release.

## Local builds

`npm ci`, then `npm run dist:win` on Windows or `npm run dist:mac` on macOS. Outputs go to `dist/`. The checked-in lockfile pins dependencies. The extractor override avoids a stale upstream dependency version in the original development lockfile.

## Data and privacy

The builder uses an explicit list of app files. Photo libraries, tests, installers, workspace files and private credentials are excluded. `.gitignore` excludes the original `Luma Library` directory. Do not upload that library to GitHub.

Portable development continues to use the adjacent library for compatibility. Packaged apps use the operating system's user-data directory. Use the in-app library importer to copy an old library into an empty installation.
