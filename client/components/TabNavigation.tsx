'use client';

import { useState } from 'react';
import Image from 'next/image';
export type TabType = 'home' | 'about' | 'services' | 'appointment' | 'contact';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const tabs: { id: TabType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    // { id: 'products', label: 'Products' },
    { id: 'appointment', label: 'Book Now' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleTabClick = (tab: TabType) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 h-17">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 md:py-2">
          {/* Logo */}
          <div className="flex items-center space-x-2 min-w-0">
            <Image 
              src="/samana-logo.png" 
              alt="Samana Beauty Logo" 
              width={40}
              height={40} 
              className="rounded-full object-contain flex-shrink-0 hidden sm:block" 
              priority 
            />
            <Image 
              src="/samana-logo.png" 
              alt="Samana Beauty Logo" 
              width={32} 
              height={32} 
              className="rounded-full object-contain flex-shrink-0 sm:hidden" 
              priority 
            />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent truncate">
              Samana The Beauty Gallery
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  relative rounded-full px-4 xl:px-5 py-2 text-xs xl:text-sm font-semibold transition-all duration-300 whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xl/25 scale-105'
                    : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                  }
                `}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-white"></span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-pink-50 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    relative rounded-lg px-4 py-3 text-left text-sm font-semibold transition-all duration-300
                    ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
