const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

// --- API response types ---

export interface ApiProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string | null;
  width: number | null;
  height: number | null;
  order: number;
}

export interface ApiProduct {
  id: string;
  slug: string;
  nameEn: string;
  nameId: string;
  descEn: string;
  descId: string;
  brand: string;
  category: string;
  price: number | null;
  currency: string;
  featured: boolean;
  active: boolean;
  externalUrl: string | null;
  images: ApiProductImage[];
  createdAt: string;
  updatedAt: string;
}

// --- Shape expected by existing legacy components (ProductsPage, FeaturedProducts, etc.) ---

export interface LegacyProduct {
  id: string;
  name_en: string;
  name_id: string;
  category_key: string; // e.g. "category.samsung"
  imageUrl: string;
  shopeeUrl: string;
  // pass through for components that use the new shape
  _api: ApiProduct;
}

export function toLegacyProduct(p: ApiProduct): LegacyProduct {
  return {
    id: p.id,
    name_en: p.nameEn,
    name_id: p.nameId,
    category_key: `category.${p.brand}`,
    imageUrl: p.images[0]?.url ?? '',
    shopeeUrl: p.externalUrl ?? '',
    _api: p,
  };
}

// --- Fetch helpers (safe: return empty on error) ---

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 60 },
      ...init,
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

export interface GetProductsParams {
  brand?: string;
  category?: string;
  featured?: boolean;
  limit?: number;
  cursor?: string;
}

export async function getProducts(params?: GetProductsParams): Promise<ApiProduct[]> {
  const qs = new URLSearchParams();
  if (params?.brand) qs.set('brand', params.brand);
  if (params?.category) qs.set('category', params.category);
  if (params?.featured) qs.set('featured', 'true');
  if (params?.limit) qs.set('limit', String(params.limit));
  if (params?.cursor) qs.set('cursor', params.cursor);
  const query = qs.toString();
  const data = await apiFetch<{ products: ApiProduct[] }>(`/api/products${query ? `?${query}` : ''}`);
  return data?.products ?? [];
}

export async function getProductBySlug(slug: string): Promise<ApiProduct | null> {
  const data = await apiFetch<{ product: ApiProduct }>(`/api/products/${encodeURIComponent(slug)}`);
  return data?.product ?? null;
}

export async function getBrands(): Promise<{ brand: string; count: number }[]> {
  const data = await apiFetch<{ brands: { brand: string; count: number }[] }>('/api/brands');
  return data?.brands ?? [];
}

export async function getCategories(): Promise<{ category: string; count: number }[]> {
  const data = await apiFetch<{ categories: { category: string; count: number }[] }>('/api/categories');
  return data?.categories ?? [];
}
