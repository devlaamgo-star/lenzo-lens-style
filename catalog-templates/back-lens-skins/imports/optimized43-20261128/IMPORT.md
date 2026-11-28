# Back & Lens replacement — 28 November 2026

Source: the supplied `products.json`, 43 unique products in `sort_order` order.
Replaces all 43 previous active Back & Lens imports; those modules and their assets remain immutable in historical lookup via `src/data/archive/back-lens-imports.ts`. The original 30-design archive also remains unchanged. No order records are deleted or rewritten.

258 unchanged permanent asset pointers: 215 ordered 1000 × 1000 gallery WebPs and 43 separate 480 × 480 `card.webp` thumbnails. Source hashes are saved in `source-checksums.json`. Main cover is gallery position one; card thumbnails never enter galleries or order snapshots.

Run `python3 catalog-templates/back-lens-skins/imports/optimized43-20261128/generate.py` to regenerate the code catalog from this manifest and existing pointers. Identities are deterministic namespaced UUIDs keyed by supplied slug; reruns replace the generated list, never append or upload duplicates.

Commerce inherits `createBackLensProduct` and shared category controls: 129 MAD, iPhone 17 Pro / Pro Max, existing stock, delivery and checkout behavior. Names use the supplied French text in all languages because no translated names were supplied. Other categories, customizer and shared pricing remain untouched.