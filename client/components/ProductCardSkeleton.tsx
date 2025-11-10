'use client';

export default function ProductCardSkeleton() {
    return (
      <div className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
        {/* Image Placeholder */}
        <div className="h-64 w-full bg-gray-300"></div>
  
        {/* Content Placeholder */}
        <div className="p-6">
          {/* Title Placeholder */}
          <div className="mb-3 h-6 rounded-md bg-gray-300"></div>
          {/* Category/Subtitle Placeholder */}
          <div className="mb-4 h-4 w-3/4 rounded-md bg-gray-300"></div>
          {/* Price Placeholder */}
          <div className="h-5 w-1/3 rounded-md bg-gray-300"></div>
        </div>
      </div>
    );
  }