'use client';

import { useEffect, useRef } from 'react';
import { TabType } from '../TabNavigation';
import Image from 'next/image';

interface HomePageProps {
  onNavigate: (tab: TabType) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Floating animation for decorative elements
    const elements = document.querySelectorAll('.float-animation');
    elements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.2}s`;
    });
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="float-animation absolute top-20 left-10 h-32 w-32 rounded-full bg-pink-200/30 blur-3xl"></div>
        <div className="float-animation absolute top-40 right-20 h-40 w-40 rounded-full bg-purple-200/30 blur-3xl"></div>
        <div className="float-animation absolute bottom-20 left-1/4 h-36 w-36 rounded-full bg-blue-200/30 blur-3xl"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-8 animate-fade-in">
          <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-1">
            <div className="rounded-full bg-white p-4">
              <Image src="/samana-logo.png" alt="Samana Beauty Logo" width={70} height={70} className="rounded-full object-contain" priority />
            </div>
          </div>
        </div>

        <h1 className="mb-6 animate-fade-in text-5xl font-bold text-gray-800 md:text-7xl lg:text-8xl">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
            Samana The Beauty Gallery
          </span>
        </h1>

        <p className="mb-4 animate-fade-in text-xl text-gray-600 md:text-2xl lg:text-3xl">
          Your destination for beauty, wellness, and self-care
        </p>

        <p className="mb-12 animate-fade-in max-w-2xl text-lg text-gray-500">
          Experience luxury beauty treatments in a serene and welcoming environment. 
          We combine expert techniques with premium products to bring out your natural beauty.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => onNavigate('appointment')}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
          >
            <span className="relative z-10">Book Your Appointment</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </button>
          <button
            onClick={() => onNavigate('services')}
            className="rounded-full border-2 border-pink-500 bg-white px-8 py-4 text-lg font-semibold text-pink-600 transition-all duration-300 hover:scale-110 hover:bg-pink-50 hover:shadow-lg"
          >
            Explore Our Services
          </button>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl">
          {[
            { icon: '💆', title: 'Expert Stylists', desc: 'Trained professionals' },
            { icon: '🌿', title: 'Natural Products', desc: 'Premium quality ingredients' },
            { icon: '⭐', title: '5-Star Service', desc: 'Luxury experience' },
          ].map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="mb-4 text-5xl">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNavigate('about');
            }}
            type="button"
            className="flex flex-col items-center text-pink-500 transition-all duration-300 hover:scale-110 hover:text-pink-600 cursor-pointer"
            aria-label="Navigate to About Us"
          >
            <span className="mb-2 text-sm font-medium">Scroll to explore</span>
            <svg
              className="h-8 w-8 transition-transform duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

