'use client';

import { Product } from '@/lib/api';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-pink-300">
            ✨
          </div>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded bg-red-500 px-4 py-2 text-white font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
          <span className="text-lg font-semibold text-pink-600">
            ${product.price}
          </span>
        </div>
        {product.category && (
          <span className="mb-2 inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-800">
            {product.category}
          </span>
        )}
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
      </div>
    </div>
  );
}

