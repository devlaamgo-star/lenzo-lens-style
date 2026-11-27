# Camera archive3 — additive import

Both original JSON manifests are authoritative; CSVs repeat them and are not imported separately. This adds 40 products and 197 unchanged WebPs after the 72 existing camera designs. Names, slugs, SKUs, import keys and gallery positions come directly from the manifests; no descriptions or translations were supplied, so none are invented.

The shop's existing catalog is code-backed, not a product database table. Products use standard UUID v4 IDs saved in `identities.json`, distinct from exact supplied import keys/SKUs. No customer or historical order records are modified. Historical lookup resolves the UUIDs through the existing shared catalog.

Every main `image` equals the product's first gallery photo and references its own `-01-cover.webp` asset pointer. Cards, purchase controls and cart receive that same main image. No responsive replacements, crops, borrowed photos, color variants or compatibility guesses are introduced.

Run `python3 catalog-templates/camera-lens-skins/imports/archive3-20261127/generate.py` from the project root after uploading supplied WebPs into the `src/assets/lens/archive3` pointer folder. The generator reuses saved UUIDs by import key/SKU and produces identical source on repeated runs. The catalog merges by these keys instead of concatenating repeated imports.

Shared camera price (79 MAD), three-skin offer (149 MAD), single-only delivery (20 MAD), four compatible model options, COD, cart and checkout remain unchanged. Assets retain original filenames, dimensions, bytes and WebP encoding.

Verification: all 197 stored assets were fetched and matched against manifest SHA-256 hashes. All 40 cards, product pages, ordered gallery positions, quick-add model selections and saved cart thumbnails were checked on desktop and mobile after refresh. Checkout displayed the matching cover and 99 MAD single-item total; no order was submitted. Repeated generator runs produced identical source and UUID maps. All 134 selected catalog/model tests pass and the preview build is OK. No missing assets. The separate skinup.ma Cloudflare deployment is not updated by these source changes.