export interface Product {
  id: string;
  brand: string;
  nameId: string;
  model: string;
  code: string;
  mAh: number;
  voltage: string;
  limitedChargeVoltage?: string;
  compatibleFor?: string;
  dimension: string;
  type: string;
  warranty: string;
  origin: string;
  price: number;
  stock: number;
  image?: string;
  shopeeUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const CATEGORIES = [
  { id: 'all',     name: 'Semua Produk',    brand: null },
  { id: 'asus',    name: 'Baterai Asus',    brand: 'Asus' },
  { id: 'infinix', name: 'Baterai Infinix', brand: 'Infinix' },
  { id: 'samsung', name: 'Baterai Samsung', brand: 'Samsung' },
  { id: 'xiaomi',  name: 'Baterai Xiaomi',  brand: 'Xiaomi' },
  { id: 'vivo',    name: 'Baterai Vivo',    brand: 'Vivo' },
  { id: 'oppo',    name: 'Baterai Oppo',    brand: 'Oppo' },
  { id: 'iphone',  name: 'Baterai iPhone',  brand: 'iPhone' },
  { id: 'nokia',   name: 'Baterai Nokia',   brand: 'Nokia' },
];
