// Generate data/products.raw.js from public/assets/js/products.js
// Converts the global `allProducts` array to an ESM export `products`
// and normalizes the module structure for Next.js usage.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = path.join(__dirname, '..', 'public', 'assets', 'js', 'products.js').replace('scripts\\..', '');
const root = path.join(__dirname, '..');
const outPath = path.join(root, 'data', 'products.raw.js');

const src = fs.readFileSync(sourcePath, 'utf8');

let out = src
  .replace(/const\s+allProducts\s*=\s*\[/, 'const products = [')
  .replace(/allProducts\.push\(/g, 'products.push(');

out = `// AUTO-GENERATED from public/assets/js/products.js\n// Do not edit by hand.\n\n${out}\n\nexport default products;\n`;

fs.mkdirSync(path.join(root, 'data'), { recursive: true });
fs.writeFileSync(outPath, out, 'utf8');
console.log('Wrote', outPath, '(', out.length, 'bytes )');

