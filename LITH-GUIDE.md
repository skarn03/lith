# Lith Photo Studio · 0.8

Close Lith and reopen **Launch Lith.lnk** to load this update. The existing local library remains in place.

## One node is enough

Every photo starts with **Node 1**, already selected. Light, color, curves, grading, detail, masks, optical effects and looks all belong to that node. Additional nodes are optional. There is no operation picker or separate base-photo target.

Click the labelled node tabs above the Develop tools, or a card in the graph, to change your editing target. Left/right arrows on a focused target tab also switch nodes. Each node keeps its own adjustments, masks, selected looks and blend strengths. Open **Node settings** to rename it or adjust its overall strength. The final node cannot be deleted; **Reset edits** clears the selected node instead.

The graph runs left to right. Drag nodes or use the arrow buttons to reorder them. Bypass temporarily disables a node, including its looks and frame changes. Frame choices are stored with the selected node; enabled nodes contribute them in graph order, with later choices overriding earlier choices for the same crop or border control. Framing is applied once to the final photograph.

Older edits are preserved during migration. A previous base edit becomes a node, and previous specialized nodes retain their rendered adjustments. All tools are available on migrated nodes for further editing. Resetting one removes its preserved prior edits too.

## Layer looks with a click

- Click a look to select it. Click it again to deselect it.
- Select several looks to combine them in the current node. They run in the order they were first added.
- **Right-click a look** to adjust its strength from 0–100%. Keyboard users can use Shift+F10 or the context-menu key. Adjusting an unselected look for the first time adds it.
- The **Selected looks** list shows each active look and its strength. Click its name or percentage to adjust it, or × to deselect it.
- Deselecting retains its strength for the next time you select it. Selecting **Original** deselects all looks in that node and preserves manual adjustments.
- Manual Develop adjustments run before that node's looks. **Node strength** blends the complete node, including those looks.

There are 60 film, vintage and dreamy looks, searchable by name and collection. Film-stock names describe artistic interpretations, not calibrated emulations.

## Quieter Develop controls

Light, Color, Detail, Effects, Masks and Frame have separate tabs. Tone Curve is an expandable section inside Light; Color Mixer and Color Grading are expandable sections inside Color. Tool sections expand one at a time within each tab. Effects also have Optics, Film and Finish categories. Less frequently used parameters are under **Fine controls**. Nothing is removed from the renderer.

Optics contains diffusion/mist, threshold-gated bloom, layered halation and generated anamorphic flares. Film contains grain and dynamic matte shadows. Finish contains vignette. Use the visible strength controls first, then expand Fine controls to shape an effect.

## Navigation and masking

Double-click a point on the photo to zoom to 100% there; double-click again to fit. Drag to pan. Zoom previews are capped at 4096 pixels; exports retain the chosen resolution. **Focus** enlarges the photograph by hiding side panels and the graph. Contact sheet and node graph can collapse separately.

The tone curve has draggable points, accessible sliders, and Linear / Soft S / Matte starting shapes. Double-click the graph or an individual slider to reset it.

Masks include Brush, Gradient, Radial and Color. For Color, click the source color in the image and adjust tolerance, feather, saturation and lightness bounds. Invert selects the complementary area. Masks remain attached to source coordinates through crop and rotation. Up to 12 masks per node are supported.

Use the preview menu for a wipe, side-by-side comparison or original view. Crop supports ratios, free crop drawing, straighten, rotation and flips. Print borders include white, gallery and instant-print styles.

## Saving and export

Edits save locally per photo. Undo/redo includes look selection, strength, node edits and framing. JPEG, PNG and WebP originals remain untouched; Export creates a rendered copy. RAW development, lens profiles and color-managed printing are not implemented.

## Validation

Native-app checks cover the default single node, independent node targets, reversible look selection, right-click strength, stacked-look rendering, frame ownership and bypass, undo/redo, and restoration after restart. Pixel checks compare migrated legacy edits against their original rendered output. Storage tests cover importing, local saves and export writing.


## Browsing, custom looks and shortcuts · 0.8

Click **Browse looks** or focus a look, then use any arrow key to audition the adjacent visible look. Auditioning replaces the node's active look selection with one look; it never stacks them. Manual adjustments are preserved. Home/End jump to the first/last visible look. Ordinary clicks still layer looks. Undo restores the previous selection.

Look thumbnails show each look at full strength on the selected original photo, without your other edits. They refresh when switching photos and render at low resolution in a separate background worker. They are previews, not export-quality samples.

Click **＋ Save** beside Looks to name a custom preset. It captures color, effects, look layers and strengths from all enabled nodes, preserving their order. It excludes masks, crop and borders. Find saved presets in **My looks**, and use them on other photos just like built-in looks. Custom presets live in the local library's catalog and survive restarts. Back up the library to preserve them. Apply a saved recipe to a clean node/photo if you do not want to add it on top of the same original edits.

Default shortcuts:

| Keys | Action |
|---|---|
| Arrows while a look is focused | Audition one look |
| Left / Right elsewhere | Previous / next photo |
| 1–5 / 0 | Set / clear star rating |
| P / U | Favorite / remove favorite |
| M | Open Masks |
| O | Toggle mask overlay |
| F or F11 / Escape | Toggle / exit fullscreen |
| Tab from photo area | Toggle Focus view |
| Ctrl+Z / Ctrl+Shift+Z | Undo / redo |
| Ctrl+O / Ctrl+Shift+E | Import / export |
| Y / backslash | Side comparison / original |
| ? | Shortcut reference |

Text fields, sliders, select boxes and open dialogs keep their normal keyboard behavior. Focused node tabs retain arrow navigation between nodes.

The repaired **Launch Lith.lnk** points to this folder's script. Windows shortcuts contain absolute paths, so moving or renaming the folder can break them. **Launch Lith.cmd** and **Launch Lith.vbs** find their files relative to themselves and are the portable choices after moving or sharing the folder. Extract the complete folder before launching.


## Cinematic text · 0.8

Open **Text** in Develop. Start with Film title, Subtitle, Editorial, Credits or Date stamp, then replace the words. Each style creates a separate editable layer; up to 12 layers per node are supported.

Choose a serif, sans-serif or monospaced font; adjust size, letter spacing, line spacing, alignment, color, opacity, shadow, bold and italic. Enter new lines in the text field for multiline titles or credits. Long lines automatically shrink to fit the canvas width.

Drag the selected text's outline on the photograph to place it. Horizontal and vertical sliders provide precise placement. With the outline focused, arrow keys nudge text; Shift+Arrow moves farther. Position is relative to the final cropped and bordered image. The outline is an editing guide and is never exported.

Duplicate, hide or delete a layer using the Text controls. Text belongs to the selected node, follows its bypass and overall strength, and survives photo switching and restarts. It is drawn after photo effects and print borders, and is included in JPEG, PNG and WebP exports. Original comparison excludes it. Saved custom looks exclude photo-specific text.

Verified with a generated image: editing a title and subtitle, dragging, hide/show undo, separate node text, export rendering and restart persistence.


### More fonts and quick node renaming

The font picker now has 18 families grouped into Serif, Sans serif, Display, Handwritten and Monospace. Choices include Georgia, Cambria, Palatino Linotype, Arial, Calibri, Candara, Segoe UI, Trebuchet MS, Verdana, Impact, Bahnschrift, Gabriola, Segoe Script, Segoe Print, Comic Sans MS, Times New Roman, Courier New and Consolas. These use system fonts; a machine without a selected family may substitute a font.

Hover a graph node or its Develop target tab and press **R** to rename it. Enter saves; Escape cancels. This also works with a node keyboard-focused. The shortcut does not interrupt typing in text fields or open dialogs. Node renames support undo and are saved per photo.


### Color-grading wheels

Open **Color → Color grading** for four always-visible wheels: Shadows, Midtones, Highlights and Overall. Drag around the wheel for hue and outward for saturation. The center is neutral. Choosing color starts a zero-strength range at 25%; adjust its Strength slider for a subtler or stronger result. Each wheel has a reset button.

Focus a wheel and use Left/Right for hue, Up/Down for saturation, or Home for neutral. Shift makes larger steps. A complete drag is one undo step. Values stay independent per node and survive restarts. Existing grading settings are preserved until changed.


### Projects and faster loading

Use **Project → + New** at the top of the left sidebar to create a separate photo collection. Choose a project from the selector to switch. Lith saves the current edits first and remembers the last photo in each project. Existing photos automatically belong to **My photographs**; originals and edits are preserved.

The gear beside the project selector opens its name, notes, and default export format, quality and size. Export dialog changes also become that project's defaults. **Move to project** beside the photo rating moves the current photo with all its edits, nodes and rating. Custom looks remain shared across projects. Import always adds photos to the current project.

Contact-sheet and library thumbnails load only as they approach the visible area, and small JPEG thumbnails are cached locally for subsequent launches. Original photos load directly from disk without base64 IPC copies. Look previews render only near visible looks, and the contact sheet is reused when changing photo or rating. Switching projects releases the previous preview worker. The thumbnail cache is disposable; original photos remain untouched.


### Custom keyboard shortcuts

Click the **keyboard icon** beneath the photo (or press **?**) to open shortcut settings. Click an action's key button and press a new key or combination. Conflicting shortcuts are rejected with the existing action's name. Clear disables a shortcut; Reset restores that action's default, and Restore all defaults resets the whole set. Escape cancels recording.

Shortcuts save automatically on this device and apply across projects. On Mac, Command takes the place of Ctrl. Typing and open dialogs do not trigger editing shortcuts. Arrow-key navigation inside looks, nodes, text positioning and grading controls stays built in; Tab retains normal focus navigation outside the photo area.


### Develop and node navigation keys

- **Ctrl+F** (Command+F on Mac): fullscreen photo preview with editing panels hidden. Press again or Escape to return.
- **Ctrl+1–9**: select that node. If the number is beyond the current node count, add exactly one next node and select it. For example, Ctrl+5 with one node creates and selects Node 2. Node creation supports Undo.
- **1–7**: Light, Color, Detail, Effects, Masks, Frame, Text. 8–9 are reserved for additional Develop tabs.
- **Alt+1–5** (Option on Mac): star ratings. **0** clears the rating.

These actions appear in keyboard shortcut settings and can be reassigned. The new number and Ctrl+number bindings replace conflicting older custom assignments once; unrelated custom shortcuts are preserved. Shortcuts do not run while typing or while a dialog is open.


### Quick save and image quality

**Ctrl+S** (Command+S on Mac) exports the current photo immediately. Choose a destination folder once; Lith remembers it for that project. Change it in **Project settings → Quick-save destination**, or in the Export dialog. A normal Export also remembers the folder you selected.

Quick save always uses original output resolution and 100% encoder quality, with the project's JPEG/PNG/WebP format. Crop and borders still apply. Repeated saves create numbered files instead of replacing earlier exports. Editing changes continue to save locally as before. Export dialogs now start at 100% quality; you can still lower it or choose a smaller size for a normal export. Choose PNG for lossless encoding of the rendered image.

Fit previews now render at least a 2560-pixel longest edge (without enlarging smaller originals), and scale up for high-density displays. Zoomed previews use native image resolution, including images larger than 4096 pixels. While dragging an adjustment, a 1536-pixel preview keeps interaction responsive, followed by the sharper final render when you pause. Before/after views use the same improved resolution. Canvas downsampling uses high-quality interpolation.


### Faster photo switching

Lith reuses recently decoded originals and finished previews, with cache budgets of 160 MiB and 64 MiB respectively. Preview cache entries include the edit settings and render size, so changing an edit or zoom level cannot reuse an outdated render. Nearby photos pre-load after navigation pauses. Look-thumbnail generation waits briefly so rapid photo navigation gets priority.

Unchanged color/curve passes are skipped, duplicate edit saves are avoided, and the next photo can decode while the previous edits finish saving. Final editing-preview resolution and full-resolution export quality are unchanged. Tests cover rapid back-and-forth selection, cached edit correctness, saved edits, and cache memory limits.


### Inline look strength and responsive editing

Every selected look now has a 0–100% slider in **Selected looks**, directly below the node settings. Drag to blend, double-click to reset to 100%, and use × to remove it. One drag is one Undo step. The optional right-click strength dialog still works.

**Frame → Crop & composition → Instagram crops** offers 4:5 Portrait, 1:1 Square, 9:16 Story/Reel and 1.91:1 Landscape buttons. These apply the crop to the current node and support Undo.

Interactive previews and high-quality refinements now use separate workers. Changes first render a quick preview; full-quality refinement follows after a short pause. Live resolution adapts between 640 and 1280 pixels based on rendering time. Obsolete full-quality results are discarded so they cannot replace a newer adjustment. Exports and settled preview resolution are unchanged. These adaptive live sizes supersede the earlier fixed 1536-pixel interactive preview.


### RAW and JPEG photos

Import or drop camera RAWs alongside JPEG, PNG and WebP files. The chooser includes ARW, CR2/CR3, NEF/NRW, RAF, DNG, ORF, RW2, PEF and other common RAW extensions. Actual decoding depends on the camera and compression supported by the bundled LibRaw build; a matching extension alone does not guarantee support. Current limits are 150 MB per file and 60 megapixels for RAW development.

RAW originals remain unchanged. On first opening, a background worker demosaics the sensor data with camera white balance into a full-resolution sRGB, 16-bit lossless PNG cache. Later visits and restarts reuse that cache. Contact sheets use embedded JPEG previews where available. RAWs use the same nodes, masks, looks, projects and export controls as JPEGs. Quick save exports the full developed dimensions with the photo's edits. Library restoration also supports RAW originals; caches regenerate locally.

This is RAW import support, not yet a high-precision RAW editing engine: existing effects and exported edited images still pass through Lith's 8-bit canvas pipeline. Dedicated RAW white-balance/highlight-recovery controls and an end-to-end high-precision pipeline are not included. First decode can take longer, especially for large files. RAW caches live under the active library's raw-cache folder. Decoding runs offline, one job at a time, and unsuccessful files show an error without changing their originals.

Verified with a real Sony FX30 ARW (6240 × 4168) and a generated DNG, including mixed JPEG import, original preservation, full-size export, restart cache reuse, and malformed-file recovery. The Windows packaged build was also tested; the decoder is platform-independent WebAssembly, but a Mac runtime test has not been performed here.


### Virtual copies and copying edits

Hover a photo in the contact sheet or Library to reveal four controls: **⧉+ Create virtual copy**, **⧉ Copy edits**, **↧ Paste edits**, and **▤ Show versions**. Controls also appear when keyboard focus enters the photo tile. Badges identify the Original and Copy 1, Copy 2, etc. Show versions lists related versions in the current project.

Virtual copies begin with the source photo's current edits, then keep their settings and ratings independently. They share the original file, decoded source and RAW cache; no duplicate original is created. Library restoration preserves shared originals. Copy edits works from any hovered photo; Paste replaces the destination's complete edit stack, including nodes, masks, crop, borders and text, but not its rating or favorite flag. Paste supports Undo. The edit clipboard lasts for the app session.

### Export sharpening

Export and Project settings offer **Off**, **Screen**, or **Print**, with Low / Standard / High amount. Screen uses a fine radius; Print uses broader edge definition. Sharpening is applied after final resizing, only during export, and also applies to Ctrl+S. It does not change Develop settings or editing previews. Off is the default. Settings are remembered per project. This is output-size sharpening, not printer/paper-profile soft proofing.


### Combined masks

In **Masks**, create or select a mask, then use **Combine this mask**. Choose **Add**, **Subtract**, or **Intersect** under New shape mode, then add a Brush, Gradient, Radial or Color range. Draw or sample directly on the photo. A mask supports its base shape plus up to 11 additional shapes.

Add expands coverage; Subtract removes coverage; Intersect keeps only overlap. Shapes combine in listed order with feathered alpha preserved. Local exposure, contrast, temperature and saturation apply once to the final combined selection. The pink overlay shows that combined selection.

Use Editing shape to revisit any component. Change its Blend, toggle Shape enabled, or Remove shape. Feather and color controls follow the selected shape. Invert shape affects only that shape, while Invert combined result reverses the entire combined selection. Existing inverted masks retain their original base selection when shapes are added. Enabled toggles the entire mask group. Adding, changing and deleting components supports Undo/Redo and persists per photo/node, including virtual copies and copied edits.
