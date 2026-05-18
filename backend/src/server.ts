import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import { ZodError } from 'zod';
import { env } from './env';
import { authRoutes } from './routes/auth';
import { publicProductRoutes } from './routes/products.public';
import { adminProductRoutes } from './routes/products.admin';
import { uploadRoutes } from './routes/upload';

const fastify = Fastify({
  logger: {
    level: env.NODE_ENV === 'production' ? 'warn' : 'info',
  },
});

async function bootstrap() {
  await fastify.register(cors, {
    origin: env.ALLOWED_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  await fastify.register(jwt, { secret: env.JWT_SECRET });

  await fastify.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
      files: 10,
    },
  });

  fastify.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      return reply.code(400).send({ error: 'Validation error', details: error.flatten() });
    }
    if (error.statusCode) {
      return reply.code(error.statusCode).send({ error: error.message });
    }
    fastify.log.error(error);
    return reply.code(500).send({ error: 'Internal server error' });
  });

  await fastify.register(authRoutes);
  await fastify.register(publicProductRoutes);
  await fastify.register(adminProductRoutes);
  await fastify.register(uploadRoutes);

  fastify.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  await fastify.listen({ port: env.PORT, host: '0.0.0.0' });
  fastify.log.info(`Server listening on port ${env.PORT}`);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
