
'use client';

import { Service } from '@/lib/api';
import Image from 'next/image';
import parse from 'html-react-parser';
import { useState } from 'react';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
        {service.image && service.image.length > 0 ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl sm:text-4xl text-pink-300">
            💅
          </div>
        )}
      </div>
      <div className="p-4 sm:p-5 md:p-6">
        <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2 pr-5">{service.title}</h3>
          {service.price && (
            <span className="text-base sm:text-lg font-semibold text-pink-600 flex-shrink-0">
              Rs.{service.price}
            </span>
          )}
        </div>
        {service.category && (
          <span className="mb-2 inline-block rounded-full bg-purple-100 px-2 sm:px-3 py-1 text-xs font-medium text-purple-800">
            {service.category.name}
          </span>
        )}
        {service.description && (
          <div className="mt-2">
            <div className={`prose prose-sm text-xs sm:text-sm text-gray-600 ${isExpanded ? '' : 'line-clamp-2'}`}>
              {parse(service.description)}
            </div>
            {service.description.length > 100 && (
              <button
                onClick={toggleExpanded}
                className="mt-2 text-pink-600 hover:text-pink-800 text-sm font-medium focus:outline-none"
              >
                {isExpanded ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>
        )}
        <div className="mt-4 border-t pt-4">
            <div className="flex justify-between items-center">
                {service.duration_minutes && <p className="text-sm text-gray-500">{service.duration_minutes} min</p>}
                <button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:scale-110 active:scale-95">
                    Book Now
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
