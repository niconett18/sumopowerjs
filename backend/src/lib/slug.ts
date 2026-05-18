import slugify from 'slugify';
import { db } from '../db';

export function toSlug(text: string): string {
  return slugify(text, { lower: true, strict: true, trim: true });
}

export async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const slug = toSlug(base);
  let candidate = slug;
  let n = 1;
  while (true) {
    const existing = await db.product.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeId) return candidate;
    candidate = `${slug}-${n++}`;
  }
}
