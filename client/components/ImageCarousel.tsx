'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { TabType } from './TabNavigation';

interface CarouselImage {
  id: number;
  url: string;
  alt: string;
  title?: string;
  description?: string;
  subtitle?: string;
}

interface ImageCarouselProps {
  onNavigate?: (tab: TabType) => void;
}

const carouselImages: CarouselImage[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1920&q=80',
    alt: 'Beauty salon interior',
    subtitle: '',
    title: 'Samana The Beauty Gallery',
    description: 'Your destination for beauty, wellness, and self-care',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=80',
    alt: 'Hair styling service',
    subtitle: 'Expert',
    title: 'Hair Styling',
    description: 'Professional stylists at your service',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1920&q=80',
    alt: 'Facial treatment',
    subtitle: 'Rejuvenating',
    title: 'Facial Treatments',
    description: 'Premium skincare and wellness',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=80',
    alt: 'Nail care service',
    subtitle: 'Luxury',
    title: 'Nail Care',
    description: 'Beautiful nails for beautiful you',
  },
];

export default function ImageCarousel({ onNavigate }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Simplified auto-play logic
  useEffect(() => {
    // Cancel any existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (!isAutoPlaying) {
      // Keep progress frozen when not autoplaying
      return;
    }

    // Clear any existing timeout
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }

    // Reset progress
    setProgress(0);

    // Animate progress bar
    const startTime = Date.now();
    const duration = 5000; // 5 seconds per slide

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);

      if (elapsed < duration) {
        animationFrameRef.current = requestAnimationFrame(animateProgress);
      } else {
        // Move to next slide
        setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateProgress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);

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
    setCurrentIndex(index);
    setProgress(0);
    setIsAutoPlaying(false);
    
    // Resume autoplay after 10 seconds
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    setProgress(0);
    setIsAutoPlaying(false);
    
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    setProgress(0);
    setIsAutoPlaying(false);
    
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const handleBookAppointment = () => {
    if (onNavigate) {
      onNavigate('appointment');
    }
  };

  const handleExploreServices = () => {
    if (onNavigate) {
      onNavigate('services');
    }
  };

  return (
    <div 
      ref={carouselRef}
      className="relative min-h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
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
                src={image.url}
                alt={image.alt}
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
              <div className="absolute inset-0 z-20 flex items-center pb-20">
                <div className="mx-auto w-full max-w-7xl px-4 text-white">
                  <div 
                    className={`w-full max-w-4xl transition-all duration-1000 ${
                      index === currentIndex 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-10'
                    }`}
                  >
                    {/* Icon Badge */}
                    {index === 0 && (
                      <div className="pt-20 mb-8 inline-block animate-fade-in">
                        <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-1 shadow-2xl">
                          <div className="rounded-full bg-black/90 p-4 backdrop-blur-sm">
                            <Image src="/samana-logo.png" alt="Samana Beauty Logo" width={80} height={80} className="rounded-full object-contain" priority />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Subtitle */}
                    {image.subtitle && (
                      <div 
                        className={`mb-2 text-lg font-medium text-pink-300 transition-all duration-700 delay-100 ${
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
                        className={`mb-6 text-4xl font-bold md:text-6xl lg:text-7xl transition-all duration-700 delay-200 ${
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
                        className={`mb-8 text-xl text-gray-200 md:text-2xl lg:text-3xl transition-all duration-700 delay-300 ${
                          index === currentIndex 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10'
                        }`}
                      >
                        {image.description}
                      </p>
                    )}

                    {/* Additional text for first slide */}
                    {index === 0 && (
                      <p 
                        className={`mb-8 max-w-2xl text-lg text-gray-300 transition-all duration-700 delay-400 ${
                          index === currentIndex 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10'
                        }`}
                      >
                        Experience luxury beauty treatments in a serene and welcoming environment. 
                        We combine expert techniques with premium products to bring out your natural beauty.
                      </p>
                    )}

                    {/* CTA Buttons - Only show on first slide */}
                    {index === 0 && (
                      <div 
                        className={`mb-8 flex flex-col gap-4 sm:flex-row sm:justify-start transition-all duration-700 delay-500 ${
                          index === currentIndex 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10'
                        }`}
                      >
                        <button
                          onClick={handleBookAppointment}
                          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-pink-500/50"
                        >
                          <span className="relative z-10">Book Your Appointment</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        </button>
                        <button
                          onClick={handleExploreServices}
                          className="rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:shadow-lg"
                        >
                          Explore Our Services
                        </button>
                      </div>
                    )}

                    {/* Feature Cards - Only on first slide */}
                    {index === 0 && (
                      <div 
                        className={`mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 w-full max-w-5xl mx-auto transition-all duration-700 delay-700 ${
                          index === currentIndex 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10'
                        }`}
                      >
                        {[
                          { icon: '💆', title: 'Expert Stylists', desc: 'Trained professionals' },
                          { icon: '🌿', title: 'Natural Products', desc: 'Premium quality ingredients' },
                          { icon: '⭐', title: '5-Star Service', desc: 'Luxury experience' },
                        ].map((feature, idx) => (
                          <div
                            key={idx}
                            className="group rounded-2xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-2xl overflow-hidden min-w-0"
                          >
                            <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-110 flex-shrink-0">{feature.icon}</div>
                            <h3 className="mb-2 text-xl font-bold text-white break-words whitespace-normal">{feature.title}</h3>
                            <p className="text-gray-200 text-sm break-words leading-relaxed whitespace-normal">{feature.desc}</p>
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
        className="group absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/10 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-lg border border-white/20"
        aria-label="Previous image"
      >
        <svg
          className="h-6 w-6 text-white transition-transform duration-300 group-hover:-translate-x-1"
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
        className="group absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/10 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-lg border border-white/20"
        aria-label="Next image"
      >
        <svg
          className="h-6 w-6 text-white transition-transform duration-300 group-hover:translate-x-1"
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

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 z-30 h-1 w-full bg-white/20">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
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
              relative h-3 rounded-full transition-all duration-300 cursor-pointer
              ${index === currentIndex
                ? 'w-12 bg-white shadow-lg'
                : 'w-3 bg-white/50 hover:bg-white/75 hover:scale-125'
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