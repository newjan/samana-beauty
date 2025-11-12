'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { TabType } from './TabNavigation';
import { useBanners } from '@/lib/queries/useBanners';
import { useDashboardContent } from '@/lib/queries/useDashboardContent';

interface CarouselImage {
  id: number;
  image: string;
  title?: string;
  subtitle?: string;
  description?: string;
  alt?: string;
}

interface ImageCarouselProps {
  onNavigate?: (tab: TabType) => void;
}

export default function ImageCarousel({ onNavigate }: ImageCarouselProps) {
  const { data: carouselImages = [], isLoading: loading, error } = useBanners();
  const { data: dashboardContent, isLoading: isDashboardLoading } = useDashboardContent();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Consistent auto-play logic using a simple 5s timer
  useEffect(() => {
    if (!isAutoPlaying || carouselImages.length === 0) return;

    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => carouselImages.length > 0 ? (prev + 1) % carouselImages.length : 0);
    }, 5000);

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
        autoPlayTimeoutRef.current = null;
      }
    };
  }, [isAutoPlaying, currentIndex, carouselImages.length]);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (carouselRef.current) {
        const rect = carouselRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePosition({ x, y });
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('mousemove', handleMouseMove);
      return () => carousel.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const goToSlide = (index: number) => {
    if (carouselImages.length === 0) return;
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    
    // Resume autoplay after 5 seconds
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const nextSlide = () => {
    if (carouselImages.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    setIsAutoPlaying(false);
    
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const prevSlide = () => {
    if (carouselImages.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    setIsAutoPlaying(false);
    
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const handleNavigate = (tab: TabType) => {
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  const carouselContent = dashboardContent?.carousel || {};
  const { ctas, cards } = carouselContent;

  if (loading || isDashboardLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400">
        <div className="relative w-full h-screen">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 opacity-80" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-2/3 max-w-2xl h-14 rounded-lg bg-gray-300/80 mb-6 animate-pulse" />
            <div className="w-1/2 max-w-lg h-10 rounded-lg bg-gray-200/80 mb-3 animate-pulse" />
            <div className="w-1/3 max-w-md h-8 rounded-lg bg-gray-100/80 mb-2 animate-pulse" />
            <div className="w-1/2 max-w-lg h-12 rounded-lg bg-gray-300/70 mt-10 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-red-100 text-red-500 text-xl">{error.message}</div>
    );
  }
  if (carouselImages.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full text-gray-400 text-xl">No banners available</div>
    );
  }

  return (
    <div 
      ref={carouselRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Progress bar (CSS-animated, 5s per slide) */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-white/20 overflow-hidden">
        <div key={currentIndex} className="h-full bg-gradient-to-r from-pink-500 to-purple-600 animate-carousel-progress" />
      </div>
      {/* Carousel Images */}
      <div className="relative h-screen w-full">
        {carouselImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentIndex 
                ? 'opacity-100 z-10 scale-95' 
                : 'opacity-0 z-0 scale-100'
            }`}
            style={{
              transform: index === currentIndex 
                ? `scale(1.1) translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
                : 'scale(1.05)',
            }}
          >
            <div className="relative h-full w-full">
              <Image
                src={image.image}
                alt={image.title || 'Carousel Image'}
                fill
                className="object-cover transition-transform duration-700"
                priority={index === 0}
                sizes="100vw"
                style={{
                  transform: index === currentIndex 
                    ? `scale(1.1) translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
                    : 'scale(1)',
                }}
              />
              {/* Animated Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
              
              {/* Floating Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div 
                  className="float-animation absolute top-20 left-10 h-32 w-32 rounded-full bg-pink-300/20 blur-3xl"
                  style={{ animationDelay: `${index * 0.2}s` }}
                ></div>
                <div 
                  className="float-animation absolute top-40 right-20 h-40 w-40 rounded-full bg-purple-300/20 blur-3xl"
                  style={{ animationDelay: `${index * 0.3}s` }}
                ></div>
                <div 
                  className="float-animation absolute bottom-20 left-1/4 h-36 w-36 rounded-full bg-blue-300/20 blur-3xl"
                  style={{ animationDelay: `${index * 0.4}s` }}
                ></div>
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="mx-auto w-full max-w-screen-xl text-white h-full flex items-center">
                  <div 
                    className={`w-full max-w-4xl transition-all duration-1000 scale-90 sm:scale-95 md:scale-100 pl-5 pb-10 pt-5 ${
                      index === currentIndex 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-10'
                    }`}
                  >
                    {/* Icon Badge */}
                    {index === 0 && (
                      <div className="mb-3 sm:mb-2 md:mb-1.5 inline-block animate-fade-in">
                        <div className="mb-3 sm:mb-2 inline-block rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-0.5 sm:p-1 shadow-2xl">
                          <div className="rounded-full bg-black/90 p-2 sm:p-2 md:p-1.5 backdrop-blur-sm">
                            <Image src="/samana-logo.png" alt="Samana Beauty Logo" width={36} height={36} className="rounded-full object-contain sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-16 lg:h-16" priority />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Subtitle */}
                    {image.subtitle && (
                      <div 
                        className={`mb-2 sm:mb-3 text-sm sm:text-base md:text-lg font-medium text-pink-300 transition-all duration-700 delay-100 ${
                          index === currentIndex 
                            ? 'opacity-100 translate-x-0' 
                            : 'opacity-0 -translate-x-10'
                        }`}
                      >
                        {image.subtitle}
                      </div>
                    )}

                    {/* Main Title */}
                    {image.title && (
                      <h1 
                        className={`mb-3 sm:mb-4 md:mb-5 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight transition-all duration-700 delay-200 ${
                          index === currentIndex 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10'
                        }`}
                      >
                        {index === 0 ? (
                          <>
                            Welcome to{' '}
                            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                              {image.title}
                            </span> 
                          </>
                        ) : (
                          <span className="bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
                            {image.title}
                          </span>
                        )}
                      </h1>
                    )}

                    {/* Description */}
                    {image.description && (
                      <p 
                        className={`mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 transition-all duration-700 delay-300 ${
                          index === currentIndex 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10'
                        }`}
                      >
                        {image.description}
                      </p>
                    )}

                    {/* Additional text for first slide */}
                    {index === 0 && dashboardContent?.about?.body && (
                      <p 
                        className={`mb-4 sm:mb-5 md:mb-6 max-w-2xl text-sm sm:text-base md:text-lg text-gray-300 transition-all duration-700 delay-400 ${
                          index === currentIndex 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10'
                        }`}
                      >
                        {dashboardContent.about.body}
                      </p>
                    )}

                    {/* CTA Buttons - Only show on first slide */}
                    {index === 0 && ctas && (
                      <div 
                        className={`mb-4 sm:mb-5 md:mb-6 flex flex-col gap-2 sm:gap-3 md:gap-4 sm:flex-row sm:justify-start transition-all duration-700 delay-500 ${
                          index === currentIndex 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10'
                        }`}
                      >
                        {ctas.primary && (
                          <button
                            onClick={() => handleNavigate(ctas.primary.action as TabType)}
                            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-pink-500/50 active:scale-95"
                          >
                            <span className="relative z-10">{ctas.primary.label}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                          </button>
                        )}
                        {ctas.secondary && (
                          <button
                            onClick={() => handleNavigate(ctas.secondary.action as TabType)}
                            className="rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-lg font-semibold text-white transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:shadow-lg active:scale-95"
                          >
                            {ctas.secondary.label}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Feature Cards - Only on first slide */}
                    {index === 0 && cards && (
                      <div 
                        className={`mt-3 sm:mt-4 md:mt-5 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full max-w-5xl transition-all duration-700 delay-700 ${
                          index === currentIndex 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10'
                        }`}
                      >
                        {cards.map((feature: any, idx: number) => (
                          <div
                            key={idx}
                            className="group rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-md p-2.5 sm:p-3 md:p-4 shadow-lg border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-2xl overflow-hidden"
                          >
                            <div className="mb-1.5 sm:mb-2 text-2xl sm:text-3xl md:text-4xl transition-transform duration-300 group-hover:scale-110">
                              {feature.icon_type === 'image' && feature.image ? (
                                <Image src={feature.image} alt={feature.title} width={48} height={48} className="object-contain" />
                              ) : (
                                feature.emoji
                              )}
                            </div>
                            <h3 className="mb-1 text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white break-words">{feature.title}</h3>
                            <p className="text-gray-200 text-[11px] sm:text-xs md:text-sm break-words leading-snug">{feature.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="group absolute left-2 sm:left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/10 p-2 sm:p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 hover:shadow-lg border border-white/20"
        aria-label="Previous image"
      >
        <svg
          className="h-4 w-4 sm:h-6 sm:w-6 text-white transition-transform duration-300 group-hover:-translate-x-1"
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
        className="group absolute right-2 sm:right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/10 p-2 sm:p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 hover:shadow-lg border border-white/20"
        aria-label="Next image"
      >
        <svg
          className="h-4 w-4 sm:h-6 sm:w-6 text-white transition-transform duration-300 group-hover:translate-x-1"
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

      
      {/* Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 z-30 flex -translate-x-1/2 space-x-2 sm:space-x-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToSlide(index);
            }}
            type="button"
            className={`
              relative h-2 sm:h-3 rounded-full transition-all duration-300 cursor-pointer touch-manipulation
              ${index === currentIndex
                ? 'w-8 sm:w-12 bg-white shadow-lg'
                : 'w-2 sm:w-3 bg-white/50 hover:bg-white/75 hover:scale-125 active:scale-110'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          >
            {index === currentIndex && (
              <span className="absolute inset-0 rounded-full bg-white animate-pulse"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}