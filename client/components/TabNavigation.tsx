'use client';

import { useState } from 'react';
import Image from 'next/image';
export type TabType = 'home' | 'about' | 'services' | 'products' | 'appointment' | 'contact';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'products', label: 'Products' },
    { id: 'appointment', label: 'Book Now' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Image src="/samana-logo.png" alt="Samana Beauty Logo" width={60} height={60} className="rounded-full object-contain" priority />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"> Samana The Beauty Gallery
            </h1>
          </div>
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105'
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
        </div>
      </div>
    </nav>
  );
}

