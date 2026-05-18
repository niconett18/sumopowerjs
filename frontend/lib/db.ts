/**
 * JSON file database for admin CRUD.
 * Source of truth: data/db.json
 * Seed it first by running: node scripts/seed-db.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface DbProduct {
  id: string;
  brand: string;
  nameId: string;
  model: string;
  code: string;
  mAh: number;
  voltage: string;
  limitedChargeVoltage: string;
  compatibleFor: string;
  dimension: string;
  type: string;
  warranty: string;
  origin: string;
  price: number;
  stock: number;
  image: string;
  shopeeUrl: string;
  active: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Db { products: DbProduct[] }

const DB_PATH = join(process.cwd(), 'data', 'db.json');

function readDb(): Db {
  if (!existsSync(DB_PATH)) {
    console.error('[db] data/db.json not found! Run: node scripts/seed-db.mjs');
    return { products: [] };
  }
  try {
    return JSON.parse(readFileSync(DB_PATH, 'utf-8')) as Db;
  } catch (e) {
    console.error('[db] Failed to parse db.json:', e);
    return { products: [] };
  }
}

function writeDb(db: Db): void {
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

export function getAllProducts(): DbProduct[] {
  return readDb().products;
}

export function getProductById(id: string): DbProduct | undefined {
  return readDb().products.find((p) => p.id === id);
}

export function createProduct(
  data: Omit<DbProduct, 'id' | 'createdAt' | 'updatedAt'>
): DbProduct {
  const db = readDb();
  const now = new Date().toISOString();
  const product: DbProduct = { ...data, id: `prod_${Date.now()}`, createdAt: now, updatedAt: now };
  db.products.unshift(product);
  writeDb(db);
  return product;
}

export function updateProduct(id: string, data: Partial<DbProduct>): DbProduct | null {
  const db = readDb();
  const idx = db.products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  db.products[idx] = { ...db.products[idx], ...data, id, updatedAt: new Date().toISOString() };
  writeDb(db);
  return db.products[idx];
}

export function deleteProduct(id: string): boolean {
  const db = readDb();
  const before = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length === before) return false;
  writeDb(db);
  return true;
}
