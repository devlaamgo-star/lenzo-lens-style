"""Regenerate only this replacement catalog from its saved manifest and asset pointers."""
import json
import uuid
from pathlib import Path
ROOT = Path(__file__).resolve().parents[4]
HERE = Path(__file__).resolve().parent
manifest = json.loads((HERE / 'products.json').read_text())
products = sorted(manifest['products'], key=lambda p: p['sort_order'])
assert len(products) == 43 and len({p['slug'] for p in products}) == 43
identities = {p['slug']: str(uuid.uuid5(uuid.NAMESPACE_URL, 'skinup:backlens:optimized43:' + p['slug'])) for p in products}
(HERE / 'identities.json').write_text(json.dumps(identities, indent=2) + '\n')
imports = ['import { createBackLensProduct } from "./back-lens-product-template";']
rows = []
thumbs = []
checksums = json.loads((HERE / 'source-checksums.json').read_text())
for i, p in enumerate(products):
    assert len(p['gallery']) == 5 and p['gallery'][0]['path'] == p['cover']
    paths = [g['path'] for g in p['gallery']] + [p['thumbnail']]
    assert len(set(paths)) == 6
    for j, path in enumerate(paths):
        rel = 'backlens/optimized43/' + path.removeprefix('products/') + '.asset.json'
        pointer = json.loads((ROOT / 'src/assets' / rel).read_text())
        assert pointer['content_type'] == 'image/webp' and path in checksums
        imports.append(f'import p{i}_{j} from "@/assets/{rel}";')
    name = json.dumps(p['name_fr'], ensure_ascii=False)
    rows.append('  createBackLensProduct({\n' +
        f'    id: {json.dumps(identities[p["slug"]])}, slug: {json.dumps(p["slug"])},\n' +
        f'    externalReference: {json.dumps("optimized43:" + p["slug"])}, displayOrder: {p["sort_order"]},\n' +
        f'    name: {{ fr: {name}, ar: {name}, en: {name} }},\n' +
        f'    image: p{i}_0.url, gallery: [' + ', '.join(f'p{i}_{j}.url' for j in range(5)) + '],\n  }),')
    thumbs.append(f'  {json.dumps(identities[p["slug"]])}: {{ src: p{i}_5.url, srcSet: `${{p{i}_5.url}} 480w`, width: 480, height: 480 }},')
source = '\n'.join(imports) + '\n\n// Generated from the saved manifest. Card thumbnails never enter product galleries.\nexport const OPTIMIZED43_BACK_LENS_PRODUCTS = [\n' + '\n'.join(rows) + '\n];\n\nexport const OPTIMIZED43_CARD_THUMBNAILS = {\n' + '\n'.join(thumbs) + '\n};\n'
(ROOT / 'src/data/back-lens-optimized43.ts').write_text(source)
print('Generated 43 stable product identities; 215 ordered gallery images; 43 separate thumbnails')
