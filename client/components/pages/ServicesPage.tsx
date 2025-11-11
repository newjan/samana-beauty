'use client';

import { useState } from 'react';
import { TabType } from '../TabNavigation';

interface Service {
  icon: string;
  title: string;
  description: string;
  price: string;
  duration: string;
}

interface ServicesPageProps {
  onNavigate?: (tab: TabType) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const handleScheduleClick = () => {
    if (onNavigate) {
      onNavigate('appointment');
    } else {
      // Fallback: scroll to appointment section if on scrollable page
      const appointmentSection = document.getElementById('appointment');
      if (appointmentSection) {
        appointmentSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const services: Service[] = [
    {
      icon: '💇',
      title: 'Haircut & Styling',
      description: 'Professional haircuts tailored to your face shape and style preferences. Includes wash, cut, and styling.',
      price: 'Rs.45 - Rs.120',
      duration: '45-90 min',
    },
    {
      icon: '🎨',
      title: 'Hair Coloring',
      description: 'Expert color services including highlights, balayage, ombre, and full color transformations.',
      price: 'Rs.80 - Rs.250',
      duration: '2-4 hours',
    },
    {
      icon: '💆',
      title: 'Hair Treatment',
      description: 'Deep conditioning treatments, keratin smoothing, and repair treatments for healthy, shiny hair.',
      price: 'Rs.60 - Rs.180',
      duration: '60-120 min',
    },
    {
      icon: '💅',
      title: 'Manicure & Pedicure',
      description: 'Luxurious nail care services with premium polish and nail art options.',
      price: 'Rs.35 - Rs.85',
      duration: '60-90 min',
    },
    {
      icon: '✨',
      title: 'Facial Treatment',
      description: 'Rejuvenating facials customized for your skin type. Includes cleansing, exfoliation, and hydration.',
      price: 'Rs.70 - Rs.150',
      duration: '60-90 min',
    },
    {
      icon: '🧘',
      title: 'Massage Therapy',
      description: 'Relaxing massage services to relieve tension and promote wellness.',
      price: 'Rs.80 - Rs.140',
      duration: '60-90 min',
    },
    {
      icon: '💄',
      title: 'Makeup Application',
      description: 'Professional makeup for special events, weddings, or everyday glamour.',
      price: 'Rs.60 - Rs.200',
      duration: '60-120 min',
    },
    {
      icon: '👁️',
      title: 'Eyebrow & Eyelash',
      description: 'Brow shaping, tinting, and lash extensions for defined, beautiful eyes.',
      price: 'Rs.40 - Rs.120',
      duration: '30-90 min',
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
            Our <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
            Discover our range of premium beauty and wellness services
          </p>
          <div className="mx-auto mt-3 sm:mt-4 h-1 w-16 sm:w-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => setSelectedService(selectedService === index ? null : index)}
              className={`
                group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-5 sm:p-6 shadow-lg transition-all duration-300
                ${selectedService === index
                  ? 'scale-105 ring-2 sm:ring-4 ring-pink-500 shadow-2xl'
                  : 'hover:scale-105 hover:shadow-xl active:scale-100'
                }
              `}
            >
              {/* Gradient Background on Hover */}
              <div className={`
                absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 opacity-0 transition-opacity duration-300
                ${selectedService === index ? 'opacity-10' : 'group-hover:opacity-5'}
              `}></div>

              <div className="relative z-10">
                <div className="mb-3 sm:mb-4 text-4xl sm:text-5xl transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-bold text-gray-800">{service.title}</h3>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 border-t border-gray-200 pt-3 sm:pt-4">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-pink-600">{service.price}</p>
                    <p className="text-xs text-gray-500">{service.duration}</p>
                  </div>
                  <button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:scale-110 active:scale-95 w-full sm:w-auto">
                    Book Now
                  </button>
                </div>
              </div>

              {/* Expandable Details */}
              {selectedService === index && (
                <div className="relative z-10 mt-3 sm:mt-4 animate-fade-in border-t border-gray-200 pt-3 sm:pt-4">
                  <p className="mb-2 text-xs sm:text-sm font-semibold text-gray-700">What's Included:</p>
                  <ul className="space-y-1 text-xs sm:text-sm text-gray-600">
                    <li>• Consultation with expert</li>
                    <li>• Premium products</li>
                    <li>• Complimentary refreshments</li>
                    <li>• Aftercare advice</li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 p-6 sm:p-8 text-white shadow-xl">
            <h3 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold">Ready to Transform?</h3>
            <p className="mb-4 sm:mb-6 text-base sm:text-lg">
              Book your appointment today and experience the luxury you deserve
            </p>
            <button 
              onClick={handleScheduleClick}
              className="rounded-full bg-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold text-pink-600 transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
            >
              Schedule Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

