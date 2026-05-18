'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '../../../_components/ProductForm';
import { adminGetProduct } from '../../../../../lib/admin-api';

export default function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    adminGetProduct(id)
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-24 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto" /></div>;
  if (error)   return <p className="text-red-500 text-sm py-8">{error}</p>;
  if (!product) return null;

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Produk</h1>
        <p className="text-sm text-gray-400 mt-0.5 truncate max-w-xl">{product.nameId}</p>
      </div>
      <ProductForm product={product} />
    </>
  );
}
