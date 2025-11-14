'use client';

import { useEffect, useRef } from 'react';
import { TabType } from '../TabNavigation';
import ImageCarousel from '../ImageCarousel';
import AboutPage from './AboutPage';
import ServicesPage from './ServicesPage';
import ProductsPage from './ProductsPage';
import AppointmentPage from './AppointmentPage';
import ContactPage from './ContactPage';

interface ScrollableHomePageProps {
  onTabChange: (tab: TabType) => void;
  activeTab: TabType;
}

export default function ScrollableHomePage({ onTabChange, activeTab }: ScrollableHomePageProps) {
  const sectionsRef = useRef<{ [key in TabType]: HTMLElement | null }>({
    home: null,
    about: null,
    services: null,
    products: null,
    appointment: null,
    contact: null,
  });

  const ignoreScrollEventsRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActiveTabRef = useRef<TabType>(activeTab);
  const shouldScrollRef = useRef(true); // Track if we should scroll

  // Scroll to section when activeTab changes
  useEffect(() => {
    // Only scroll if tab actually changed
    if (lastActiveTabRef.current === activeTab) {
      return;
    }

    lastActiveTabRef.current = activeTab;

    // Don't scroll if this change came from manual scrolling
    if (!shouldScrollRef.current) {
      shouldScrollRef.current = true; // Reset for next time
      return;
    }

    const section = sectionsRef.current[activeTab];
    if (!section) return;

    // Ignore scroll events during programmatic scroll
    ignoreScrollEventsRef.current = true;

    // Get navigation height
    const nav = document.querySelector('nav');
    const navHeight = nav ? nav.offsetHeight : 80;

    // Calculate scroll position
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
    const scrollPosition = sectionTop - navHeight;

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Re-enable scroll detection after animation
    scrollTimeoutRef.current = setTimeout(() => {
      ignoreScrollEventsRef.current = false;
    }, 1000);
  }, [activeTab]);

  // Intersection Observer for scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Skip if we're scrolling programmatically
        if (ignoreScrollEventsRef.current) return;

        // Find the most visible section
        let maxRatio = 0;
        let mostVisibleSection: TabType | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            const sectionId = entry.target.id as TabType;
            if (sectionId) {
              mostVisibleSection = sectionId;
            }
          }
        });

        // Update active tab if different and sufficiently visible
        if (mostVisibleSection && mostVisibleSection !== activeTab && maxRatio > 0.2) {
          // Mark that this is from scrolling, not clicking
          shouldScrollRef.current = false;
          // Update tab without scrolling
          onTabChange(mostVisibleSection);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-100px 0px -20% 0px',
      }
    );

    // Observe all sections
    Object.values(sectionsRef.current).forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    // Handle viewport resize (like when dev tools open/close)
    const handleResize = () => {
      observer.disconnect();
      setTimeout(() => {
        Object.values(sectionsRef.current).forEach((section) => {
          if (section) {
            observer.observe(section);
          }
        });
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [activeTab, onTabChange]);

  // Handle navigation from child components
  const handleNavigate = (tab: TabType) => {
    shouldScrollRef.current = true; // Ensure we scroll for clicks
    onTabChange(tab);
  };

  return (
    <div className="relative">
      {/* Home Section with Image Carousel */}
      <section
        ref={(el) => {sectionsRef.current.home = el}}
        id="home"
        className="relative"
      >
        <ImageCarousel onNavigate={handleNavigate} />
      </section> 

      {/* About Section */}
      <section
        ref={(el) => {sectionsRef.current.about = el}}
        id="about"
        className="scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-18"
      >
        <AboutPage />
      </section> 

      {/* Services Section */}
      <section
        ref={(el) => {sectionsRef.current.services = el}}
        id="services"
        className="scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-18"
      >
        <ServicesPage onNavigate={handleNavigate} />
      </section>

      {/* Products Section */}
      <section
        ref={(el) => {sectionsRef.current.products = el}}
        id="products"
        className="scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-18"
      >
        <ProductsPage />
      </section>

      {/* Appointment Section */}
      <section
        ref={(el) => {sectionsRef.current.appointment = el}}
        id="appointment"
        className="scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-18"
      >
        <AppointmentPage />
      </section>

      {/* Contact Section */}
      <section
        ref={(el) => {sectionsRef.current.contact = el}}
        id="contact"
        className="scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-18"
      >
        <ContactPage />
      </section>
    </div>
  );
}