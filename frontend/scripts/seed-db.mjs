import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = join(__dirname, '../..', 'merged_master_samsung_sorted.csv');
const outPath = join(__dirname, '..', 'data', 'db.json');

const raw = readFileSync(csvPath, 'utf-8');
const lines = raw.split('\n').filter(Boolean);
const rows = lines.slice(1); // skip header

const seenNames = new Set();
const seenIds   = new Set();
const products = [];
const NOW = '2024-01-01T00:00:00.000Z';
let autoIdx = 1000; // fallback counter for rows with empty CSV ids

for (const line of rows) {
  const cols = line.split(',');
  if (cols.length < 11) continue;

  // Strip decimal ".0" suffix (e.g. "3.0" → "3")
  const rawId    = cols[0].trim().replace(/\.0$/, '');
  const category = cols[1].trim();
  const nameId   = cols[2].trim();
  const price    = parseInt(cols[3].trim()) || 0;
  const code     = cols[4].trim();
  const voltage  = cols[5].trim();
  const capacity = cols[6].trim();
  const limitedV = cols[8].trim();
  const compat   = cols[9].trim();
  const image    = cols[10].trim();
  const shopeeUrl = cols.slice(11).join(',').trim();

  if (!category || !nameId) continue;

  // Deduplicate by name
  if (seenNames.has(nameId)) continue;
  seenNames.add(nameId);

  // Guarantee a unique, non-empty id
  let id = rawId || String(autoIdx++);
  while (seenIds.has(id)) id = String(autoIdx++);
  seenIds.add(id);

  const mAhMatch = capacity.match(/(\d[\d,]*)/);
  const mAh = mAhMatch ? parseInt(mAhMatch[1].replace(',', '')) : 0;

  const brandMap = {
    Infinix:'Infinix', Samsung:'Samsung', Vivo:'Vivo',
    Oppo:'Oppo', Xiaomi:'Xiaomi', iPhone:'iPhone', Asus:'Asus', Nokia:'Nokia',
  };
  const brand = brandMap[category] ?? category;

  products.push({
    id,
    brand,
    nameId,
    model: nameId,
    code,
    mAh,
    voltage,
    limitedChargeVoltage: limitedV,
    compatibleFor: compat,
    dimension: '—',
    type: 'Li-ion',
    warranty: '12 bulan',
    origin: 'Original Sumo',
    price,
    stock: 1,
    image: image || '',
    shopeeUrl: shopeeUrl || '',
    active: true,
    featured: false,
    createdAt: NOW,
    updatedAt: NOW,
  });
}

writeFileSync(outPath, JSON.stringify({ products }, null, 2), 'utf-8');
console.log(`✅  Written ${products.length} products to ${outPath}`);
console.log(`   IDs assigned automatically for rows with blank CSV id: ${autoIdx - 1000}`);
