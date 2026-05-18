import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = join(__dirname, '../..', 'merged_master_samsung_sorted.csv');
const outPath = join(__dirname, '..', 'data', 'products.js');

const raw = readFileSync(csvPath, 'utf-8');
const lines = raw.split('\n').filter(Boolean);

// skip header
const rows = lines.slice(1);

const seen = new Set();
const products = [];

for (const line of rows) {
  // CSV parse (naive but works for this file — no quoted commas in data)
  const cols = line.split(',');
  if (cols.length < 11) continue;

  const rawId       = cols[0].trim();
  const id          = rawId.replace(/\.0$/, '');  // "3.0" → "3"
  const category    = cols[1].trim();
  const nameId      = cols[2].trim();
  const price       = parseInt(cols[3].trim()) || 0;
  const code        = cols[4].trim();
  const voltage     = cols[5].trim();
  const capacity    = cols[6].trim();   // "4900 mAh"
  // cols[7] = Merk (always Sumopower)
  const limitedV    = cols[8].trim();
  const compatible  = cols[9].trim();
  const image       = cols[10].trim();
  // cols[11] = Shopee URL (may contain commas inside the URL if extra-params encoded — handle below)
  const shopeeUrl   = cols.slice(11).join(',').trim();

  if (!category || !nameId) continue;

  // Deduplicate by nameId
  if (seen.has(nameId)) continue;
  seen.add(nameId);

  // Parse mAh
  const mAhMatch = capacity.match(/(\d[\d,]*)/);
  const mAh = mAhMatch ? parseInt(mAhMatch[1].replace(',', '')) : 0;

  const brandMap = {
    Infinix: 'Infinix',
    Samsung: 'Samsung',
    Vivo: 'Vivo',
    Oppo: 'Oppo',
    Xiaomi: 'Xiaomi',
    iPhone: 'iPhone',
    Asus: 'Asus',
    Nokia: 'Nokia',
  };
  const brand = brandMap[category] ?? category;

  products.push({
    id, brand, nameId, code, voltage, limitedV, compatible,
    mAh, price, image: image || '', shopeeUrl: shopeeUrl || '',
  });
}

const ISO_DATE = '2024-01-01T00:00:00.000Z';

const lines2 = [
  '// AUTO-GENERATED from merged_master_samsung_sorted.csv — do not edit manually',
  '// Run: node scripts/generate-products.mjs to regenerate',
  '',
  'export const products = [',
  ...products.map(p => {
    const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `  {
    id: '${esc(p.id)}',
    brand: '${esc(p.brand)}',
    nameId: '${esc(p.nameId)}',
    model: '${esc(p.nameId)}',
    code: '${esc(p.code)}',
    mAh: ${p.mAh},
    voltage: '${esc(p.voltage)}',
    limitedChargeVoltage: '${esc(p.limitedV)}',
    compatibleFor: '${esc(p.compatible)}',
    dimension: '—',
    type: 'Li-ion',
    warranty: '12 bulan',
    origin: 'Original Sumo',
    price: ${p.price},
    stock: 1,
    image: '${esc(p.image)}',
    shopeeUrl: '${esc(p.shopeeUrl)}',
    createdAt: '${ISO_DATE}',
    updatedAt: '${ISO_DATE}',
  },`;
  }),
  '];',
  '',
];

writeFileSync(outPath, lines2.join('\n'), 'utf-8');
console.log(`✅  Written ${products.length} products to ${outPath}`);
