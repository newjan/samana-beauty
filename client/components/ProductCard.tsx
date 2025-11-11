'use client';

import { Product } from '@/lib/api';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-100">
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl sm:text-4xl text-pink-300">
            ✨
          </div>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded bg-red-500 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4 sm:p-5 md:p-6">
        <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2">{product.name}</h3>
          <span className="text-base sm:text-lg font-semibold text-pink-600 flex-shrink-0">
            Rs.{product.price}
          </span>
        </div>
        {product.category && (
          <span className="mb-2 inline-block rounded-full bg-pink-100 px-2 sm:px-3 py-1 text-xs font-medium text-pink-800">
            {product.category}
          </span>
        )}
        <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
      </div>
    </div>
  );
}

