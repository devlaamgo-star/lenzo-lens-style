# Organized Back & Lens import

The adjacent original `catalog.json` and `LOVABLE_PROMPT.txt` are the authoritative source mapping and instructions.

- Imported: 22 ready products, original numbers 01–16, 18–22, 24.
- Pending 17: Amber Duck Bar has mismatched artwork; both original files are preserved as asset pointers but are not active products.
- Missing 23: no image files were supplied; no placeholder was created.
- Original PNG bytes for all 46 supplied images were checked against the manifest SHA-256 values before upload. Asset pointers are in `src/assets/backlens/organized-2026-11`.
- Ready records use the manifest external reference as their unique product ID and retain the external reference, source number and display order. Each has exactly two ordered gallery images.
- The saved Horizon Céleste factory supplies unchanged descriptions, stock, device and category settings. Existing shared pricing and purchasing controls remain authoritative (129 MAD; iPhone 17 Pro and Pro Max; no new color variants).
- The product page keeps its original image frame and purchasing layout, adding two image thumbnails to make the supplied second gallery image accessible.

Verification: all 22 product URLs, both image loads, original listing order, model selection and add-to-cart were exercised in the local preview. The cart contained 22 separate matching identifiers at 129 MAD each, total 2,838 MAD with free delivery. No order was submitted.