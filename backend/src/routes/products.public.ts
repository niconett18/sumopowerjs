import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '../db';

const listQuerySchema = z.object({
  brand: z.string().optional(),
  category: z.string().optional(),
  featured: z
    .string()
    .optional()
    .transform((v) => v === 'true' ? true : undefined),
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Math.min(Math.max(1, Number(v)), 100) : 20)),
  cursor: z.string().optional(),
});

export async function publicProductRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/api/products', async (request, reply) => {
    const result = listQuerySchema.safeParse(request.query);
    if (!result.success) {
      return reply.code(400).send({ error: 'Invalid query params', details: result.error.flatten() });
    }
    const { brand, category, featured, limit, cursor } = result.data;

    const products = await db.product.findMany({
      where: {
        active: true,
        ...(brand ? { brand } : {}),
        ...(category ? { category } : {}),
        ...(featured ? { featured: true } : {}),
        ...(cursor ? { id: { lt: cursor } } : {}),
      },
      include: { images: { orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return { products };
  });

  fastify.get<{ Params: { slug: string } }>('/api/products/:slug', async (request, reply) => {
    const product = await db.product.findUnique({
      where: { slug: request.params.slug, active: true },
      include: { images: { orderBy: { order: 'asc' } } },
    });
    if (!product) return reply.code(404).send({ error: 'Product not found' });
    return { product };
  });

  fastify.get('/api/brands', async () => {
    const groups = await db.product.groupBy({
      by: ['brand'],
      where: { active: true },
      _count: { id: true },
      orderBy: { brand: 'asc' },
    });
    return { brands: groups.map((g) => ({ brand: g.brand, count: g._count.id })) };
  });

  fastify.get('/api/categories', async () => {
    const groups = await db.product.groupBy({
      by: ['category'],
      where: { active: true },
      _count: { id: true },
      orderBy: { category: 'asc' },
    });
    return { categories: groups.map((g) => ({ category: g.category, count: g._count.id })) };
  });
}
