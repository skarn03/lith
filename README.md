# Lith Photo Studio

Close the existing Lith window and double-click **Launch Lith.lnk** in this folder. Existing photos and edits are preserved. If you move the entire folder, use **Launch Lith.cmd** or **Launch Lith.vbs**, which locates the app relative to itself.

Lith is an offline Windows photo editor with nondestructive edits, brush/linear/radial/color-range masks, dark-gray and light themes, 60 film, vintage and dreamy looks, layered halation, diffusion/mist, gated bloom, anamorphic flares, dynamic matte shadows, grain, clarity, texture, HSL mixing, tonal color grading, curves, aligned before/after views, freehand/custom cropping, white borders, and a serial node graph starting with one full-edit node with per-photo labels, toggleable layered looks with individual blend amounts, double-click zoom, and a compact focus view.

See **[LITH-GUIDE.md](LITH-GUIDE.md)** for controls, shortcuts, halation recipes, node behavior, storage, limitations, and validation results.

The legacy **Luma Library** directory name is retained to keep your existing originals and edits in place. Keep the whole app folder together and back up that library.

## Development

Run `npm start` to launch and `npm test` for image-processing and storage checks. Electron is bundled in `node_modules`. The renderer is isolated from Node.js, with a narrow preload bridge for native dialogs and local storage.

- `main.cjs` / `preload.cjs`: local library, native dialogs, safe save-on-close, and single-instance protection.
- `app.js`: library, history, basic controls, presets, and preview scheduling.
- `render-client.js` / `render-worker.js`: background rendering, latest-frame queue, source-image caching, and export.
- `processing.js` / `effects.js`: shared preview/export pipeline, source-coordinate masks, actual node ordering, detail, color, bloom, grain, and borders.
- `masks.js` / `advanced.js` / `custom-nodes.js` / `review.js`: mask drawing, color controls, toolbar, and node graph.
- `style.css` / `themes.css` / `advanced.css`: layout and dark/light themes.

Film looks are artistic approximations, not calibrated emulations. The graph currently supports serial nodes, not parallel branches. RAW processing, AI masking, and healing are not included.

Version 0.7 adds actual-photo look thumbnails, exclusive arrow-key look auditioning, saved custom looks, star ratings, standard keyboard shortcuts and fullscreen editing. Press **?** for the shortcut list.

Version 0.8 adds a Text tab with cinematic title/caption styles, editable typography, draggable placement and exported text layers saved per node.
