// Mock Prisma Client — reads from data/db.json (the live admin-managed database)
// This means active/inactive changes in the admin dashboard are reflected here immediately.
import { getAllProducts } from './db';

type FindManyArgs = {
  where?: {
    brand?: string;
    OR?: Array<{
      brand?:  { contains: string; mode?: string };
      model?:  { contains: string; mode?: string };
      code?:   { contains: string; mode?: string };
    }>;
  };
  orderBy?: { price?: 'asc' | 'desc'; createdAt?: 'desc' };
};

function matchesSearch(product: ReturnType<typeof getAllProducts>[number], q: string): boolean {
  const needle = q.toLowerCase();
  return [product.brand, product.nameId, product.model, product.code].some(
    (field) => (field || '').toLowerCase().includes(needle)
  );
}

export const prisma = {
  product: {
    findMany: async ({ where = {}, orderBy }: FindManyArgs = {}) => {
      // Always read fresh from db.json so admin active/inactive changes take effect immediately
      let filtered = getAllProducts().filter((p) => p.active); // ← only active products

      if (where.brand) {
        filtered = filtered.filter(
          (p) => p.brand.toLowerCase() === where.brand!.toLowerCase()
        );
      }

      const searchTerm = where.OR?.[0]?.brand?.contains;
      if (searchTerm) {
        filtered = filtered.filter((p) => matchesSearch(p, searchTerm));
      }

      if (orderBy?.price === 'asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (orderBy?.price === 'desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else {
        // Default: newest first (by createdAt string, stable)
        filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      }

      return filtered;
    },
    create: async () => ({}),
  },
  admin: {
    findUnique: async () => null,
  },
};

export default prisma;
