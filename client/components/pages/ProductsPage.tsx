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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="rounded-lg bg-red-100 p-8 text-center text-red-800">
          <p className="mb-2 text-2xl font-semibold">Error loading products</p>
          <p className="text-sm">{error}</p>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="rounded-lg bg-gray-100 p-8 text-center text-gray-600">
          <p className="text-xl">No products available at the moment.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-pink-50 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold text-gray-800 md:text-6xl">
            Our{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Discover our curated collection of beauty and wellness products
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
        </div>

        {/* Featured Products Carousel (unchanged) */}
        {/* ... */}

        {/* All Products Grid */}
        <div className="mt-16">
          <h3 className="mb-8 text-center text-3xl font-bold text-gray-800">
            All Products
          </h3>
          {/* Use the renderContent helper to show the correct state */}
          {renderContent()}
        </div>
      </div>
    </section>
  );
}
