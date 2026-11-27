# Camera collection replacement

The user's explicit request to replace the active camera collection supersedes the ZIP instruction to append.

## Preserved configuration

`../../settings-before-replacement.json` captures the existing camera configuration before replacement: 79 MAD per unit, 149 MAD per three camera skins, both existing iPhone model options with no default selection, 20 MAD delivery for an exactly-one-camera-only basket, free delivery for three camera skins and mixed baskets, separate Air bundle groups. No commercial settings were changed.

`../../retired-products.json` retains all 107 previous camera product records and image URLs. Historical product lookup and legacy pack readback include these records, while active listings and product slug lookup contain only the replacement collection. No customer/order rows or previous assets were deleted.

## Import mapping

- `products.json` is the unmodified source manifest. Its 72 entries define names, descriptions, slugs, tags, order and gallery mapping.
- Each active ID equals its supplied `import_key`; SKU is retained. The static replacement is deterministic, not additive, so reruns cannot create duplicates.
- `01-cover.webp` is each design's own card image and first gallery image. All 493 gallery photos retain supplied order; 144 smaller cover derivatives are not gallery entries.
- All 637 WebP files were uploaded unchanged with asset pointers in `src/assets/lens/batch72`. Listings use width-based responsive covers; galleries retain the supplied larger files.
- French title, description and alt text use the supplied values. English/Arabic names preserve the supplied design name; descriptions fall back to supplied French instead of inventing translations. Existing interface translations/RTL remain unchanged.

## Verification

- All manifest paths exist; image dimensions, positions and design-folder associations validated before replacement.
- All 637 served image URLs return byte-identical WebP data (SHA-256 parity with ZIP).
- 404 tests pass, including all 72 product mappings, unique identities, no active retired records, archived order lookup, unchanged commercial settings and both identical/different-design bundle totals.
- Chromium desktop and mobile viewport: all 72 card images decode; first/middle/last products open with ordered galleries, both model options, actual add-to-cart, three-product cart and checkout total 149 MAD/free delivery. No browser errors. No order was submitted.
- Preview build reports OK. Physical phones and the live skinup.ma replacement were not tested or deployed. skinup.ma uses a separately hosted Cloudflare copy and needs that deployment updated; Lovable publishing alone does not update it.