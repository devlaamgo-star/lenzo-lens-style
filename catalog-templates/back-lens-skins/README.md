# Back & Lens Skins reusable setup

Saved before the ready-made catalog was cleared on 2026-11-05. This is a project-local template, not chat memory and not an active listing.

## Exact preserved setup
- `source/` contains byte-for-byte copies of the original catalog, shared prices, model selectors, cart behavior, translations, product page, category page, cards, homepage category placement and design tokens.
- `src/data/archive/back-lens-skins.ts` retains all 30 original product records, all three languages, original identifiers, stock flags, popularity, image URLs and ordered galleries. Original asset pointers remain under `src/assets/backlens/`; no uploaded image was changed or deleted.
- `src/data/back-lens-product-template.ts` exports `createBackLensProduct`, based on Horizon Céleste. Future approved products are added only to `src/data/back-lens-skins.ts`.

## Fields and settings
Product fields: `id`, `slug`, `name` (fr/ar/en), `description` (fr/ar/en), `image`, ordered `gallery`, `category`, `device`, `inStock`, `isNew`, `popularity`. Category identifier: `back-and-lens-skins`; cart/order category: `backlens`; route: `/dos-camera/$slug`. IDs use `backlens-${slug}`. Exact descriptions and all original values are in the source snapshot and archive.

Unit price: **129 MAD**, currency MAD. No camera or Air bundle eligibility. Existing delivery calculation yields 0 MAD for a Back & Lens basket; mixed-basket delivery and all shared pricing functions are unchanged. Final order prices remain calculated by the existing server-side order code.

Displayed compatibility/device label is **iPhone 17 Pro Max**. The actual shared selector offers **iPhone 17 Pro**, then **iPhone 17 Pro Max**, with no model preselected. Preserve this existing distinction rather than silently correcting it. Quantity defaults to 1 and is clamped to 1–20. No color-option fields, color controls, standalone variant records or color variants exist for this category; the selected iPhone model is recorded on each cart line. Do not invent color/variant configuration.

Every original gallery is `[mainImage]`. The current page shows the main image; it does not implement thumbnail or multi-image gallery controls. Preserve the array structure and current behavior without inventing gallery UI.

## Existing behavior to reuse unchanged
- Cards: linked full card, image, title and product CTA; quick-view dialog with the shared model/quantity controls. Image area uses the existing pure-white `bg-card`, square framing, centered `object-contain`, no image padding or cropping. Outer rounded card remains unchanged.
- Product page: breadcrumb, image, category pill, translated title/description, compatibility label, price, stock message, required model choice, quantity, Add to Cart, Order Now, returns link, free delivery/COD/installation information and related active designs.
- Category: translated heading/subtitle, result count, existing grid tracks and gaps, pinned Create Your Own Skin card. There are no category-specific filter controls on `/dos-camera`; preserve shared collection filters/navigation without adding new ones.
- Homepage category section and header search use the active array. Historical order lookup uses the archive plus active records; do not expose archived designs as storefront listings.
- Shared cart, checkout, discounts, delivery, tracking and admin/order dashboard logic are unchanged. Previously stored cart/order snapshots and original product assets remain readable. Retired ready-made product slugs no longer resolve as active products; their original records remain available to order lookup.

## Adding user-provided designs later
1. Use the supplied artwork as-is via the existing asset pointer flow.
2. Call `createBackLensProduct` with user-approved slug, translated name fields and main image; optional unique ID/gallery may be supplied. Use a new unique ID/slug; never reassign an old order's identifier.
3. Add the returned product to the active `BACK_LENS_SKINS` array. Do not add any product until the user supplies it.
4. Change only name, artwork/images, gallery entries, slug/ID unless explicitly authorized otherwise. All other reference fields and shared settings remain intact.
5. Verify listing, quick view, model selection, quantity and cart using the existing components. Never copy snapshot code back over unrelated live fixes.
