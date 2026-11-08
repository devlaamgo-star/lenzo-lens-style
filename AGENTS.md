<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Retired storefront category URLs redirect permanently to `/collection`; preserve source assets and historical product lookup data so existing orders remain readable.
- Back & Lens active designs live separately from the immutable original archive used by historical product lookup; future designs use `createBackLensProduct` and the preserved setup under `catalog-templates/back-lens-skins` so replacement artwork does not alter shared commerce or page behavior.
- Organized Back & Lens imports retain each batch manifest in the saved template folder, append in batch order and merge only by external reference (source numbers are batch-local); preserve ordered gallery pairs and shared purchasing controls.
- Public contact destinations are centralized in `src/lib/catalog.ts`; reuse them for footer entries and WhatsApp links to prevent conflicting contact information.
- Shared sheet panels render a built-in corner close button; any panel that supplies its own close control must pass `showCloseButton={false}` so two close icons never appear.
- TikTok's global head bootstrap uses same-origin regional blocking before loading the SDK; one pathname pageview is dispatched via the root navigation effect, with persistent opt-outs shared across tabs.
- TikTok SubmitForm runs only after checkout returns a saved order number; deduplicate locally per order without sending that number or customer identifiers, and never replay blocked submissions.
- TikTok Purchase fires from the same checkout success path with value/currency MAD/contents/quantity; it deduplicates per order number independently from SubmitForm and follows the same regional and opt-out blocking.
- Delivery-zone labels and parent-city search aliases live in `src/data/delivery-zones.ts`, sourced from Ozon's public destinations endpoint; preserve labels verbatim, collapse exact duplicates and exclude explicit test placeholders. Shared validation in `src/lib/delivery-address.ts` lets nationwide dataset updates apply to checkout and order validation without form changes.
- New orders persist canonical `delivery_zone` and `full_address` separately and mirror legacy city/address for existing consumers; admin falls back for historical orders without inventing an approved zone.
- Shared pricing helpers in `src/lib/pricing.ts` isolate bundle quantities by category and determine delivery from the entire basket, including legacy pack designs; use them in cart/checkout and order saving to keep displayed and persisted totals consistent.
- Orders revenue is read-only derived from filtered admin order records via `src/lib/revenue.ts`, using Casablanca creation-date calendar days and stored final totals; this avoids repricing historical orders or changing status workflows.
- Customizer model aliases reuse the existing coverage-specific template geometry through `templateFor` while returning the selected model identity; selector-only additions must not reshape previews or relabel the saved model as the source template model.
- Meta Pixel lives in a global head bootstrap (`src/lib/meta-pixel.ts`) with same-origin regional gating: consent regions/unknown need a stored banner acceptance; React code calls only its window helpers (PageView per URL from root, Purchase deduped per order in localStorage) so the pixel is installed once.
- Camera club imports merge by stable slug and retain matching IDs; full-phone image presentation is opt-in per product so new artwork does not change existing catalog imagery or shared purchase behavior.
- Browser JS is built for older phones (`environments.client.build.target` in `vite.config.ts`, CSS target pinned separately) and a plain-ES5 head shim (`src/lib/browser-compat.ts`) runs before bundles; dependencies ship newer syntax/APIs that otherwise crash pages on older iOS and Android WebViews.
- An inline ES5 boot guard (`src/lib/boot-guard.ts`, injected in `__root` before the app entry) owns startup failure detection, the server-rendered retry bar, error classification and the single shared reload allowance; `chunk-recovery.ts` and `AppErrorFallback` delegate to it so no path can start a second automatic reload or reload during order submission.
