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
