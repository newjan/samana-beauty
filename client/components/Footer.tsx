'use client';

import { useSalonServices } from '@/lib/queries/useSalonServices';
import { useDashboardContent } from '@/lib/queries/useDashboardContent';
import { TabType } from './TabNavigation';
import Image from 'next/image';
import SkeletonLoader from './SkeletonLoader';

interface FooterProps {
  onNavigate?: (tab: TabType) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { data: services = [] } = useSalonServices();
  const { data: dashboardContent } = useDashboardContent();

  const handleLinkClick = (tab: TabType) => {
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  const contactInfo = dashboardContent?.contact || {};
  const teamInfo = dashboardContent?.team || {};

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center space-x-2">
              <Image src="/samana-logo.png" alt="Samana Beauty Logo" width={50} height={50} className="rounded-full object-contain flex-shrink-0" priority />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Samana The Beauty Gallery
              </h3>
            </div>
            <p className="mb-4 text-sm sm:text-base text-gray-400">
              {dashboardContent?.about?.body || 'Your destination for beauty, wellness, and self-care. Experience luxury treatments in a serene environment.'}
            </p>
            <div className="flex space-x-4">
              {teamInfo?.members?.[0]?.social?.facebook && (
                <a href={teamInfo.members[0].social.facebook} className="text-gray-400 hover:text-pink-400 transition-colors active:scale-95" aria-label="Facebook">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {teamInfo?.members?.[0]?.social?.instagram && (
                <a href={teamInfo.members[0].social.instagram} className="text-gray-400 hover:text-pink-400 transition-colors active:scale-95" aria-label="Instagram">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="text-sm sm:text-base text-gray-400 hover:text-pink-400 transition-colors active:scale-95"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="text-sm sm:text-base text-gray-400 hover:text-pink-400 transition-colors active:scale-95"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('services')}
                  className="text-sm sm:text-base text-gray-400 hover:text-pink-400 transition-colors active:scale-95"
                >
                  Services
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-400">
              {services.length > 0 ? (
                services.slice(0, 5).map((service: any) => (
                  <li key={service.id}>{service.title}</li>
                ))
              ) : (
                <>
                  {[...Array(5)].map((_, i) => (
                    <li key={i}>
                      <SkeletonLoader className="h-4 w-3/4" />
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
              {dashboardContent ? (
                <>
                  <li className="flex items-start space-x-2 sm:space-x-3">
                    <span className="flex-shrink-0">📍</span>
                    <span className="min-w-0">{contactInfo.address}</span>
                  </li>
                  <li className="flex items-center space-x-2 sm:space-x-3">
                    <span className="flex-shrink-0">📞</span>
                    <a href={`tel:${contactInfo.phone}`} className="hover:text-pink-400 transition-colors break-all">
                      {contactInfo.phone}
                    </a>
                  </li>
                  <li className="flex items-center space-x-2 sm:space-x-3">
                    <span className="flex-shrink-0">✉️</span>
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-pink-400 transition-colors break-all text-xs sm:text-sm">
                      {contactInfo.email}
                    </a>
                  </li>
                  <li className="flex items-start space-x-2 sm:space-x-3">
                    <span className="flex-shrink-0">🕒</span>
                    <span className="min-w-0">
                      {contactInfo.hours?.map((h: any, i: number) => (
                        <span key={i}>{h.day}: {h.time}<br /></span>
                      ))}
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start space-x-2 sm:space-x-3">
                    <span className="flex-shrink-0">📍</span>
                    <SkeletonLoader className="h-4 w-3/4" />
                  </li>
                  <li className="flex items-center space-x-2 sm:space-x-3">
                    <span className="flex-shrink-0">📞</span>
                    <SkeletonLoader className="h-4 w-1/2" />
                  </li>
                  <li className="flex items-center space-x-2 sm:space-x-3">
                    <span className="flex-shrink-0">✉️</span>
                    <SkeletonLoader className="h-4 w-2/3" />
                  </li>
                  <li className="flex items-start space-x-2 sm:space-x-3">
                    <span className="flex-shrink-0">🕒</span>
                    <SkeletonLoader className="h-4 w-full" />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col items-center justify-between space-y-3 sm:space-y-4 md:flex-row md:space-y-0">
            <p className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
              © {currentYear} Samana Beauty. All rights reserved.
            </p>
            <div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <button
                onClick={() => handleLinkClick('appointment')}
                className="text-gray-400 hover:text-pink-400 transition-colors active:scale-95"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

