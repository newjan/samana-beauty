"use client";

import { useState, useEffect } from "react";
import { fetchProducts, Product } from "@/lib/api";
import ProductCard from "../ProductCard";
import ProductCardSkeleton from "../ProductCardSkeleton";

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
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Expected array but got:", data);
          setProducts([]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
        setProducts([]);
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

  // ... (prevSlide, nextSlide, goToSlide functions remain the same) ...
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

  // Helper function to render the main content
  const renderContent = () => {
    // 1. Loading state: Render skeletons
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Render 6 skeletons as placeholders */}
          {Array.from({ length: 3 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    // 2. Error state: Render an inline error message
    if (error) {
      return (
        <div className="rounded-lg bg-red-100 p-6 sm:p-8 text-center text-red-800">
          <p className="mb-2 text-xl sm:text-2xl font-semibold">Error loading products</p>
          <p className="text-sm sm:text-base">{error}</p>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="rounded-lg bg-gray-100 p-6 sm:p-8 text-center text-gray-600">
          <p className="text-lg sm:text-xl">No products available at the moment.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {products.map((product) => (
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

        {/* Featured Products Carousel (unchanged) */}
        {/* ... */}

        {/* All Products Grid */}
        <div className="mt-12 sm:mt-16">
          <h3 className="mb-6 sm:mb-8 text-center text-2xl sm:text-3xl font-bold text-gray-800">
            All Products
          </h3>
          {/* Use the renderContent helper to show the correct state */}
          {renderContent()}
        </div>
      </div>
    </section>
  );
}
