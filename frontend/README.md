# SumoPower

SumoPower is a premium Apple-inspired commercial experience built with Next.js and Fastify.

## Architecture
- **Frontend**: Next.js App Router (TailwindCSS, Framer Motion)
- **Backend**: Fastify API with Prisma ORM
- **Database**: PostgreSQL (Neon)

## Deploy Instructions

### Vercel (Frontend)
1. Import the repository into Vercel.
2. Set the **Root Directory** to rontend/.
3. Build command: 
pm run build
4. Add the Environment Variables from rontend/.env.example, including NEXT_PUBLIC_API_URL pointing to the deployed backend.

### Railway + Neon (Backend)
1. Create a logical database in [Neon.tech](https://neon.tech/) and grab the pooled connection string.
2. Uncheck 'Local Files Only' / Choose empty repo layout, deploy ackend/ from GitHub on Railway.
3. In Railway Variables, set:
   - DATABASE_URL (your Neon connection string)
   - JWT_SECRET (a secure random string)
   - ALLOWED_ORIGIN (the URL of your Vercel frontend)
   - CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
4. Make sure to run 
px prisma migrate deploy locally or add it to a startup script.
5. Create your initial admin user via Railway terminal: 
pm run create-admin.

