# Optional local Smart Search

Smart Search downloads the quantized [Xenova CLIP ViT-B/32](https://huggingface.co/Xenova/clip-vit-base-patch32) model only after the user selects Download & enable. The pinned model revision is `d15189d7028b43f1d3e65039190477f6af591c2a`. This is an ONNX conversion of [OpenAI CLIP](https://github.com/openai/CLIP), licensed under MIT. Model weights are not bundled in Lith's installer. The local cache is approximately 149 MiB.

Runtime dependencies include Transformers.js (Apache-2.0), ONNX Runtime (MIT), sharp (Apache-2.0 and its bundled codec notices), and exifr (MIT). Their licenses are retained in the installed dependency packages.

Model files are downloaded from Hugging Face. After setup, inference uses local files only. Photos, search prompts, camera metadata and embeddings are not uploaded. Embeddings and metadata are stored in the local photo library's `smart-search` directory. Turning off AI releases the worker and stops AI indexing; it retains the downloaded model and existing index for reuse.

Search operates on small original-image previews, not the current creative edit. Results are approximate nearest matches, not verified labels, face identification, or an exhaustive list. The current project supplies the candidate photos. One image is indexed at a time, with one inference thread. Indexing waits between images while the user edits or the export queue is active, and can be paused manually. Idle workers are released after 30 seconds. A running image finishes before a pause takes effect.

Camera search uses available Make/Model metadata. Images without supported metadata remain searchable by filename and optional content search.
