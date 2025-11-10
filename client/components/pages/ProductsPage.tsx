'use client';

import { useState, useEffect } from 'react';
import { fetchProducts, Product } from '@/lib/api';
import ProductCard from '../ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

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

  useEffect(() => {
    if (autoPlay && products.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, products.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-pink-50">
        <div className="text-center">
          <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-pink-500 border-r-transparent"></div>
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-pink-50 px-4">
        <div className="rounded-lg bg-red-100 p-8 text-center text-red-800">
          <p className="mb-2 text-2xl font-semibold">Error loading products</p>
          <p className="text-sm">{error}</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-pink-50">
        <div className="rounded-lg bg-gray-100 p-8 text-center text-gray-600">
          <p className="text-xl">No products available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-pink-50 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold text-gray-800 md:text-6xl">
            Our <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-xl text-gray-600">
            Discover our curated collection of beauty and wellness products
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
        </div>

        {/* Featured Products Carousel */}
        {/* {products.length > 0 && (
          <div className="relative mb-16">
            <h3 className="mb-8 text-center text-3xl font-bold text-gray-800">Featured Products</h3>
            
            // Navigation Arrows
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-pink-50 md:left-4"
              aria-label="Previous product"
            >
              <svg
                className="h-6 w-6 text-pink-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-pink-50 md:right-4"
              aria-label="Next product"
            >
              <svg
                className="h-6 w-6 text-pink-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>

            // Products Carousel
            <div className="relative overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {products.map((product) => (
                  <div key={product.id} className="min-w-full flex-shrink-0 px-4 md:min-w-[50%] lg:min-w-[33.333%]">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            // Carousel Indicators 
            <div className="mt-8 flex justify-center space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`
                    h-3 rounded-full transition-all duration-300
                    ${index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-pink-500 to-purple-600'
                      : 'w-3 bg-gray-300 hover:bg-gray-400'
                    }
                  `}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )} */}

        {/* All Products Grid */}
        {Array.isArray(products) && products.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-8 text-center text-3xl font-bold text-gray-800">All Products</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

