import ProductForm from '../../_components/ProductForm';

export default function NewProductPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">New Product</h1>
        <p className="text-sm text-gray-400 mt-0.5">Fill in the details and upload images to add a product.</p>
      </div>
      <ProductForm />
    </>
  );
}
