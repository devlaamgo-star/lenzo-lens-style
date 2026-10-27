# Category removal

# Camera-only pricing
- [ ] Separate camera and Air bundle groups; add 20 MAD delivery only for an exactly-one-camera-only basket.
- [ ] Update camera offer text, cart, checkout and saved order delivery totals; verify calculations and customer flow.

# Ozon delivery address

- [x] Add reusable Casablanca/Agadir example zones and searchable required selection.
- [x] Validate full addresses and persist separate delivery zone/full address fields.
- [x] Show separate location fields in Orders; checkout verified on desktop/mobile with a saved order and exact database readback. Signed-in admin browser check unavailable: requesting user has no matching account.
- [x] Expand to all verified Ozon Express Morocco destinations: official 1,024-record snapshot, 955 distinct real labels (exact duplicates collapsed, two test placeholders omitted), parent-city aliases, exact values preserved. Source parity checked; 61 tests pass; browser search and selection verified with a real product in checkout, without placing an order. Checkout UI unchanged.

- [x] Remove Full Body Skins homepage section, collection selector and search entries.
- [x] Retire Full Body Skins collection/product pages and remove unused card links.
- [x] Verify remaining categories, customizer access and gap-free layout.

# Public contact update

- [x] Update phone, WhatsApp, email and active social links consistently.
- [x] Verify all five links and mobile alignment.

# Mobile menu close button

- [x] Remove the duplicate close icon from the mobile navigation drawer.
- [x] Verify one close button, tap area, label and close/reopen on mobile.

# TikTok Pixel

- [x] Add a once-only global TikTok install without changing Meta.
- [x] Block consent-required/unknown regions and provide privacy disclosure and opt-out.
- [x] Verify permitted pageviews, blocked regions, navigation and opt-out (five tests; browser Pageview transmissions succeeded under simulated Morocco, with one SDK install).
- [ ] Publish and verify TikTok on skinup.ma — awaiting a publishing request; no published-site or TikTok account receipt check performed.

# TikTok successful form event

- [x] Connect a once-only SubmitForm event to confirmed successful checkout submissions, preserving regional blocking and opt-outs.
- [x] Test success, failure, duplicate calls and blocked visitors; update privacy disclosure. Eight automated tests pass. Browser mocked checkout success produced exactly one TikTok Lead transmission (SDK maps SubmitForm to Lead); simulated failure/invalid form/refresh produced no additional conversion. France remained blocked. No production test order was created.

# Checkout information notice

- [x] Add a compact trilingual warning note above the checkout customer fields (exact FR/AR/EN wording, accent styling, warning icon, RTL-correct in Arabic); 34 tests pass, typecheck clean, verified in all three languages in the browser.
