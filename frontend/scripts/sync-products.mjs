import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const CATEGORY_BRAND = {
  'category.infinix': 'Infinix',
  'category.samsung': 'Samsung',
  'category.vivo': 'Vivo',
  'category.oppo': 'Oppo',
  'category.xiaomi': 'Xiaomi',
  'category.iphone': 'iPhone',
  'category.asus': 'Asus',
  'category.nokia': 'Nokia',
  'category.charger': 'Charger',
};

function extractCode(name) {
  const dash = name.match(/\s-\s([A-Z0-9][\w-]+)\s*$/i);
  if (dash) return dash[1];
  const tokens = name.match(/\b([A-Z]{2,}[-]?[A-Z0-9]{2,})\b/g);
  if (tokens?.length) return tokens[tokens.length - 1];
  return 'N/A';
}

function extractModel(name, brand) {
  let model = name
    .replace(/^Baterai Sumopower\s+/i, '')
    .replace(/^Sumopower Battery\s+/i, '')
    .replace(new RegExp(`^${brand}\\s+`, 'i'), '')
    .trim();
  model = model.replace(/\s-\s[A-Z0-9][\w-]+\s*$/i, '').trim();
  return model || name;
}

// Source of truth: repo-root assets/js/products.js (also mirrored to public/)
const sourcePath = path.join(root, '../assets/js/products.js');
const publicPath = path.join(root, 'public/assets/js/products.js');
const js = fs.readFileSync(
  fs.existsSync(sourcePath) ? sourcePath : publicPath,
  'utf8'
);
if (fs.existsSync(sourcePath)) {
  fs.mkdirSync(path.dirname(publicPath), { recursive: true });
  fs.writeFileSync(publicPath, js, 'utf8');
}
const sandbox = {};
vm.runInNewContext(js.replace('const allProducts', 'var allProducts') + '\nallProducts;', sandbox);
const legacy = sandbox.allProducts;

const products = legacy.map((p) => {
  const brand = CATEGORY_BRAND[p.category_key] || 'Other';
  const nameId = (p.name_id || p.name_en || '').trim();
  const name = nameId || p.name_en || '';
  const code = extractCode(name);
  const model = extractModel(name, brand);
  const image = (p.imageUrl || '').replace(/^\.\.\/assets\//, '/assets/');

  return {
    id: String(p.id),
    brand,
    nameId,
    model,
    code,
    mAh: 0,
    voltage: '3.85V',
    dimension: '-',
    type: 'Li-ion Polymer',
    warranty: '12 Bulan',
    origin: 'Original 100%',
    price: 0,
    stock: 99,
    image,
    shopeeUrl: p.shopeeUrl || '',
  };
});

const outPath = path.join(root, 'lib/products.data.ts');
const body = `// Auto-generated from assets/js/products.js — run: node scripts/sync-products.mjs\nexport const MOCK_PRODUCTS = ${JSON.stringify(products, null, 2)};\n`;
fs.writeFileSync(outPath, body, 'utf8');

const counts = {};
products.forEach((p) => {
  counts[p.brand] = (counts[p.brand] || 0) + 1;
});
console.log(`Wrote ${products.length} products to lib/products.data.ts`);
console.log(counts);
