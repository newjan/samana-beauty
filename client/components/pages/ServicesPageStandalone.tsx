
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import ServiceCard from '@/components/ServiceCard';
import ServiceCardSkeleton from '@/components/ServiceCardSkeleton';
import { useSalonServices } from '@/lib/queries/useSalonServices';
import { useServiceCategories } from '@/lib/queries/useServiceCategories';
import { Service } from '@/lib/api';

type SortOption = 'title' | '-title' | 'price' | '-price';

export default function ServicesPageStandalone() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('title');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useSalonServices({
    search: searchTerm,
    category: selectedCategory,
    ordering: sortOption,
  });

  const { data: categories = [] } = useServiceCategories();

  const services = useMemo(() => data?.pages.flatMap(page => page.results) ?? [], [data]);

  const observer = useRef<IntersectionObserver>();
  const lastServiceElementRef = (node: HTMLDivElement) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    if (node) observer.current.observe(node);
  };

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-red-50">
        <div className="text-center text-red-700">
          <h2 className="mb-2 text-2xl font-bold">Oops! Something went wrong.</h2>
          <p>We couldn&apos;t load the services. Please try again later.</p>
          {error && <p className="mt-4 text-sm text-red-500">Error: {error.message}</p>}
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-pink-50 px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
            Our{' '}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
            Discover our premium range of beauty and wellness services
          </p>
          <div className="mx-auto mt-3 sm:mt-4 h-1 w-16 sm:w-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
        </div>

        {/* Filter, Search, Sort Controls */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 text-gray-700 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
            <svg
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full rounded-full border border-gray-300 bg-white py-2 pl-4 pr-8 text-gray-700 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 sm:w-auto"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="block w-full rounded-full border border-gray-300 bg-white py-2 pl-4 pr-8 text-gray-700 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 sm:w-auto"
            >
              <option value="title">Name (A-Z)</option>
              <option value="-title">Name (Z-A)</option>
              <option value="price">Price (Low to High)</option>
              <option value="-price">Price (High to Low)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading && Array.from({ length: 9 }).map((_, index) => <ServiceCardSkeleton key={index} />)}
          {services.map((service: Service, index: number) => {
            if (services.length === index + 1) {
              return <div ref={lastServiceElementRef} key={service.id}><ServiceCard service={service} /></div>;
            }
            return <ServiceCard key={service.id} service={service} />;
          })}
        </div>
        {isFetchingNextPage && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            {Array.from({ length: 3 }).map((_, index) => <ServiceCardSkeleton key={index} />)}
          </div>
        )}
        {!isLoading && services.length === 0 && (
            <div className="rounded-lg bg-gray-100 p-6 text-center text-gray-600 col-span-full">
                <p className="text-lg sm:text-xl">No services found matching your criteria.</p>
            </div>
        )}
      </div>
    </section>
  );
}
