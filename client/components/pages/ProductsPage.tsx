"use client";

import ProductCard from "../ProductCard";
import ProductCardSkeleton from "../ProductCardSkeleton";
import { useRouter } from 'next/navigation'; 
import { useProducts } from '@/lib/queries/useProducts'; // Import useProducts
import { Product } from '@/lib/api'; // Import Product type

export default function ProductsPage() {
  const { data: featuredProducts = [], isLoading, isError, error } = useProducts(true); // Fetch only featured products

  const router = useRouter(); // Initialize useRouter

  // Helper function to render the main content
  const renderContent = (skeletonCount: number = 3) => {
    // 1. Loading state: Render skeletons
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Render skeletons as placeholders */}
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    // 2. Error state: Render an inline error message
    if (isError) {
      return (
        <div className="rounded-lg bg-red-100 p-6 sm:p-8 text-center text-red-800">
          <p className="mb-2 text-xl sm:text-2xl font-semibold">Error loading products</p>
          <p className="text-sm sm:text-base">{error?.message}</p>
        </div>
      );
    }

    if (featuredProducts.length === 0) {
      return (
        <div className="rounded-lg bg-gray-100 p-6 sm:p-8 text-center text-gray-600">
          <p className="text-lg sm:text-xl">No featured products available at the moment.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {featuredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-pink-50 px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
            Our{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
            Discover our curated collection of beauty and wellness products
          </p>
          <div className="mx-auto mt-3 sm:mt-4 h-1 w-16 sm:w-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
        </div>

        {/* Featured Products Section */}
        <div className="mt-12 sm:mt-16">
          <h3 className="mb-6 sm:mb-8 text-center text-2xl sm:text-3xl font-bold text-gray-800">
            Featured Products
          </h3>
          {renderContent(6)} {/* Render up to 6 skeletons for featured */}
          <div className="text-center mt-8">
            <button
              onClick={() => router.push('/products')}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Explore All Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}