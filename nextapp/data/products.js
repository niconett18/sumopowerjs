// Client-side utility to read the legacy `allProducts` array injected by
// /public/assets/js/products.js and normalize its image paths to root-relative
// `/assets/...` so they work in Next.js.

const normalizePath = (path) => {
  if (typeof path !== 'string' || !path) return path;
  // remove any leading ../ segments
  const stripped = path.replace(/^(\.\.\/)+/, '');
  if (stripped.startsWith('/assets/')) return stripped;
  if (stripped.startsWith('assets/')) return `/${stripped}`;
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
};

export const normalizeProducts = (list) => {
  if (!Array.isArray(list)) return [];
  return list.map((p) => ({
    ...p,
    imageUrl: normalizePath(p.imageUrl),
  }));
};

export const getProductsFromWindow = () => {
  if (typeof window === 'undefined') return [];
  const list = window.allProducts || [];
  return normalizeProducts(list);
};

export default getProductsFromWindow;
