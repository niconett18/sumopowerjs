import { FastifyInstance } from 'fastify';
import { requireAdmin } from '../auth/middleware';
import { uploadBuffer, UploadResult } from '../lib/cloudinary';

export async function uploadRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post('/api/admin/upload', { preHandler: requireAdmin }, async (request, reply) => {
    const parts = request.files();
    const results: UploadResult[] = [];

    for await (const part of parts) {
      const chunks: Buffer[] = [];
      for await (const chunk of part.file) {
        chunks.push(chunk as Buffer);
      }
      const buffer = Buffer.concat(chunks);
      if (buffer.length === 0) continue;
      const result = await uploadBuffer(buffer);
      results.push(result);
    }

    if (results.length === 0) {
      return reply.code(400).send({ error: 'No files received' });
    }
    return { images: results };
  });
}
