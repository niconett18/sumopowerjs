import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { db } from '../db';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function authRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post('/api/admin/login', async (request, reply) => {
    const result = loginSchema.safeParse(request.body);
    if (!result.success) {
      return reply.code(400).send({ error: 'Validation error', details: result.error.flatten() });
    }
    const { email, password } = result.data;

    const admin = await db.admin.findUnique({ where: { email } });
    if (!admin) return reply.code(401).send({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return reply.code(401).send({ error: 'Invalid credentials' });

    const token = fastify.jwt.sign(
      { adminId: admin.id, email: admin.email },
      { expiresIn: '12h' }
    );
    return { token };
  });
}
