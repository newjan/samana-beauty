'use client';

import React from 'react';

export default function BookingFormSkeleton() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 sm:space-y-6 rounded-lg bg-white p-4 sm:p-6 md:p-8 shadow-lg animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 sm:mb-6"></div>
      <div className="h-5 bg-gray-200 rounded w-full mb-6"></div>
      
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <div className="h-14 bg-gray-200 rounded-lg"></div>
        <div className="h-14 bg-gray-200 rounded-lg"></div>
        <div className="h-14 bg-gray-200 rounded-lg"></div>
        <div className="h-14 bg-gray-200 rounded-lg"></div>
        <div className="h-14 bg-gray-200 rounded-lg"></div>
        <div className="h-14 bg-gray-200 rounded-lg"></div>
      </div>

      <div className="h-32 bg-gray-200 rounded-lg"></div>

      <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
    </div>
  );
}
