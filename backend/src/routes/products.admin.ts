import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '../db';
import { requireAdmin } from '../auth/middleware';
import { uniqueSlug } from '../lib/slug';

const imageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  order: z.number().int().min(0).default(0),
});

const productBodySchema = z.object({
  nameEn: z.string().min(1),
  nameId: z.string().min(1),
  descEn: z.string().default(''),
  descId: z.string().default(''),
  brand: z.string().min(1),
  category: z.string().min(1),
  price: z.number().int().positive().nullable().optional(),
  currency: z.string().default('IDR'),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  externalUrl: z.string().url().nullable().optional(),
  images: z.array(imageSchema).default([]),
});

export async function adminProductRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/api/admin/products', { preHandler: requireAdmin }, async () => {
    const products = await db.product.findMany({
      include: { images: { orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });
    return { products };
  });

  fastify.post('/api/admin/products', { preHandler: requireAdmin }, async (request, reply) => {
    const result = productBodySchema.safeParse(request.body);
    if (!result.success) {
      return reply.code(400).send({ error: 'Validation error', details: result.error.flatten() });
    }
    const { images, ...data } = result.data;
    const slug = await uniqueSlug(data.nameEn);

    const product = await db.product.create({
      data: { ...data, slug, images: { create: images } },
      include: { images: { orderBy: { order: 'asc' } } },
    });
    return reply.code(201).send({ product });
  });

  fastify.patch<{ Params: { id: string } }>(
    '/api/admin/products/:id',
    { preHandler: requireAdmin },
    async (request, reply) => {
      const result = productBodySchema.partial().safeParse(request.body);
      if (!result.success) {
        return reply.code(400).send({ error: 'Validation error', details: result.error.flatten() });
      }
      const { images, nameEn, ...rest } = result.data;

      const existing = await db.product.findUnique({ where: { id: request.params.id } });
      if (!existing) return reply.code(404).send({ error: 'Product not found' });

      const product = await db.product.update({
        where: { id: request.params.id },
        data: {
          ...rest,
          ...(nameEn ? { nameEn, slug: await uniqueSlug(nameEn, request.params.id) } : {}),
          ...(images !== undefined
            ? { images: { deleteMany: {}, create: images } }
            : {}),
        },
        include: { images: { orderBy: { order: 'asc' } } },
      });
      return { product };
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    '/api/admin/products/:id',
    { preHandler: requireAdmin },
    async (request, reply) => {
      const existing = await db.product.findUnique({ where: { id: request.params.id } });
      if (!existing) return reply.code(404).send({ error: 'Product not found' });

      await db.product.update({
        where: { id: request.params.id },
        data: { active: false },
      });
      return reply.code(204).send();
    }
  );
}
