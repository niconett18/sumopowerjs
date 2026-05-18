// Admin API client — calls local Next.js Route Handlers
const BASE = '/api/admin';

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

export type ProductBody = Partial<Omit<DbProduct, 'id' | 'createdAt' | 'updatedAt'>>;

function getToken(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('admin_token') ?? '';
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(path, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers as Record<string, string> | undefined),
    },
  });

  // Handle empty-body responses
  if (res.status === 204) return undefined as T;

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new Error(`Server error (${res.status})`);
  }

  if (!res.ok) {
    throw new Error((data as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  return data as T;
}

export async function adminLogin(email: string, password: string): Promise<void> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  let data: { ok?: boolean; token?: string; error?: string } = {};
  try { data = await res.json(); } catch { /* ignore */ }
  if (!res.ok) throw new Error(data.error ?? 'Login gagal');
  if (data.token) {
    if (typeof window !== 'undefined') localStorage.setItem('admin_token', data.token);
  }
}

export async function adminGetProducts(): Promise<DbProduct[]> {
  const data = await apiFetch<{ products: DbProduct[] }>(`${BASE}/products`);
  return data.products;
}

export async function adminGetProduct(id: string): Promise<DbProduct> {
  const data = await apiFetch<{ product: DbProduct }>(`${BASE}/products/${id}`);
  return data.product;
}

export async function adminCreateProduct(body: ProductBody): Promise<DbProduct> {
  const data = await apiFetch<{ product: DbProduct }>(`${BASE}/products`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return data.product;
}

export async function adminUpdateProduct(id: string, body: ProductBody): Promise<DbProduct> {
  const data = await apiFetch<{ product: DbProduct }>(`${BASE}/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
  return data.product;
}

export async function adminDeleteProduct(id: string): Promise<void> {
  await apiFetch<void>(`${BASE}/products/${id}`, { method: 'DELETE' });
}

export async function adminUploadImage(file: File): Promise<string> {
  const token = getToken();
  const formData = new FormData();
  formData.append('file', file);
  
  const res = await fetch(`${BASE}/upload`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      // Do NOT set Content-Type here, let the browser set it automatically for FormData with boundary
    },
    body: formData,
  });

  let data: any;
  try { data = await res.json(); } catch { throw new Error(`Server error (${res.status})`); }
  if (!res.ok) throw new Error(data.error ?? 'Gagal mengupload gambar');
  return data.url;
}
