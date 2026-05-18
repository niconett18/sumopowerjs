# SumoPower Backend

Fastify + Prisma + PostgreSQL API for SumoPower. Deployed on Railway, database on Neon.

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill in environment variables
cp .env.example .env

# 3. Generate the Prisma client
npm run db:generate

# 4. Push schema to your local / Neon dev database
npm run db:push

# 5. (Optional) Seed legacy products from frontend/data/products.raw.js
npm run seed

# 6. Start the dev server
npm run dev
```

Server runs at `http://localhost:4000`. Health check: `GET /health`.

## Environment variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon pooled) |
| `JWT_SECRET` | Random string ≥ 16 chars for signing tokens |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `ALLOWED_ORIGIN` | Frontend origin for CORS (e.g. `https://your-site.vercel.app`) |
| `PORT` | Port to listen on (Railway sets this automatically) |

## Creating the first admin user

After deploying (or locally):

```bash
npm run create-admin -- admin@example.com yourpassword
```

## Railway deployment

1. Create a new Railway project and connect this repo.
2. Set all environment variables listed above in Railway's dashboard.
3. Set `DATABASE_URL` to the **pooled** Neon connection string.
4. In Railway's **Build Command** field, set:
   ```
   npm install && npx prisma generate && npx prisma migrate deploy
   ```
5. In **Start Command**:
   ```
   node dist/server.js
   ```
   Or if Railway runs `npm start`:
   ```
   npm run build && npm start
   ```
6. Railway exposes `PORT` automatically — the server binds to `0.0.0.0:$PORT`.
7. After the first successful deploy, run the create-admin script once via Railway's shell or a one-off command.

## API reference

### Public endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/products` | List active products. Query: `brand`, `category`, `featured`, `limit`, `cursor` |
| `GET` | `/api/products/:slug` | Single product with images |
| `GET` | `/api/brands` | Distinct brands with product counts |
| `GET` | `/api/categories` | Distinct categories with product counts |

### Admin endpoints (JWT required — `Authorization: Bearer <token>`)

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/admin/login` | Returns a 12h JWT |
| `GET` | `/api/admin/products` | List all products including inactive |
| `POST` | `/api/admin/products` | Create a product |
| `PATCH` | `/api/admin/products/:id` | Update a product |
| `DELETE` | `/api/admin/products/:id` | Soft-delete (sets `active: false`) |
| `POST` | `/api/admin/upload` | Upload images → Cloudinary, returns URLs |
