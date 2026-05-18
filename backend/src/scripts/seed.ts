import { readFileSync } from 'fs';
import { resolve } from 'path';
import vm from 'vm';
import * as dotenv from 'dotenv';

dotenv.config();

import { db } from '../db';
import { toSlug } from '../lib/slug';

const REPO_ROOT = resolve(__dirname, '../../../');

function loadLegacyProducts(): any[] {
  const filePath = resolve(REPO_ROOT, 'frontend/public/assets/js/products.js');
  let code = readFileSync(filePath, 'utf-8');
  // vm.runInNewContext only sees `var` declarations, not `const`/`let`
  code = code.replace(/(?:const|let)\s+allProducts\s*=/, 'var allProducts =');
  const ctx: { allProducts?: any[] } = {};
  try {
    vm.runInNewContext(code, ctx);
  } catch (e) {
    console.error('Failed to parse products.js:', e);
    process.exit(1);
  }
  return ctx.allProducts ?? [];
}

function normalizePath(p: string): string {
  if (!p) return p;
  const stripped = p.replace(/^(\.\.\/)+/, '');
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

// If Cloudinary env vars are present, upload the local image paths to CDN.
// Otherwise, store the original path as-is (useful for local dev).
async function resolveImageUrl(localPath: string): Promise<string | null> {
  if (!localPath) return null;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (cloudName && apiKey && apiSecret) {
    try {
      const { uploadFromUrl } = await import('../lib/cloudinary');
      // Convert local path to absolute filesystem path
      const absPath = resolve(REPO_ROOT, 'frontend/public', localPath.replace(/^\//, ''));
      const fileUrl = `file://${absPath}`;
      const result = await uploadFromUrl(fileUrl);
      return result.url;
    } catch (e) {
      console.warn(`  ⚠  Cloudinary upload failed for ${localPath}:`, (e as Error).message);
    }
  }
  return localPath;
}

async function main() {
  const raw = loadLegacyProducts();
  console.log(`Loaded ${raw.length} legacy products from products.js`);

  let created = 0;
  let skipped = 0;

  for (const p of raw) {
    const nameEn = String(p.name_en || p.name_id || '').trim();
    const nameId = String(p.name_id || p.name_en || '').trim();

    if (!nameEn) {
      skipped++;
      continue;
    }

    const slug = toSlug(nameEn);
    const existing = await db.product.findUnique({ where: { slug } });
    if (existing) {
      skipped++;
      continue;
    }

    const rawImagePath = normalizePath(p.imageUrl || '');
    const brand = String(p.category_key || '').replace('category.', '');

    const imageUrl = rawImagePath ? await resolveImageUrl(rawImagePath) : null;

    await db.product.create({
      data: {
        slug,
        nameEn,
        nameId,
        descEn: '',
        descId: '',
        brand,
        category: brand,
        externalUrl: p.shopeeUrl || null,
        ...(imageUrl
          ? { images: { create: [{ url: imageUrl, alt: nameEn, order: 0 }] } }
          : {}),
      },
    });
    created++;
    if (created % 20 === 0) console.log(`  ${created} products created...`);
  }

  console.log(`\nSeed complete: ${created} created, ${skipped} skipped`);
  await db.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
