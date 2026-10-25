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
- Public contact destinations are centralized in `src/lib/catalog.ts`; reuse them for footer entries and WhatsApp links to prevent conflicting contact information.
- Shared sheet panels render a built-in corner close button; any panel that supplies its own close control must pass `showCloseButton={false}` so two close icons never appear.
- TikTok's global head bootstrap uses same-origin regional blocking before loading the SDK; one pathname pageview is dispatched via the root navigation effect, with persistent opt-outs shared across tabs.
- TikTok SubmitForm runs only after checkout returns a saved order number; deduplicate locally per order without sending that number or customer identifiers, and never replay blocked submissions.
