'use client';

import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '@/lib/api';
import ProductCard from './ProductCard';

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        // Ensure data is an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Expected array but got:', data);
          setProducts([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        setProducts([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-pink-500 border-r-transparent"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-100 p-6 text-center text-red-800">
        <p className="font-semibold">Error loading products</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-lg bg-gray-100 p-6 text-center text-gray-600">
        <p>No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

