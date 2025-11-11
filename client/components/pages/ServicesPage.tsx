'use client';

import { useState, useEffect } from 'react';
import { TabType } from '../TabNavigation';
import { fetchSalonServices, Service } from '../../lib/api';
import parse from 'html-react-parser';

interface ServicesPageProps {
  onNavigate?: (tab: TabType) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchSalonServices()
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleScheduleClick = () => {
    if (onNavigate) {
      onNavigate('appointment');
    } else {
      const appointmentSection = document.getElementById('appointment');
      if (appointmentSection) {
        appointmentSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 text-gray-500 text-xl">Loading services...</div>;
  }
  if (error) {
    return <div className="flex items-center justify-center min-h-screen w-full bg-red-100 text-red-500 text-xl">{error}</div>;
  }
  if (services.length === 0) {
    return <div className="flex items-center justify-center min-h-screen w-full text-gray-400 text-xl">No services available</div>;
  }

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
              key={service.id}
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
                {/* Service Image if available */}
                {service.image && (
                  <img src={service.image} alt={service.title} className="mb-3 sm:mb-4 w-full h-40 object-cover rounded-xl" />
                )}
                <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-bold text-gray-800">{service.title}</h3>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 border-t border-gray-200 pt-3 sm:pt-4">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-pink-600">{service.price ? `Rs.${service.price}` : ''}</p>
                    <p className="text-xs text-gray-500">{service.duration_minutes ? `${service.duration_minutes} min` : ''}</p>
                    {service.category && (
                      <p className="text-xs text-purple-600 font-semibold">{service.category.name}</p>
                    )}
                  </div>
                  <button
                    className="relative z-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:scale-110 active:scale-95 w-full sm:w-auto"
                    style={{ pointerEvents: 'auto' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScheduleClick();
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* Expandable Details */}
              {selectedService === index && (
                <div className="relative z-10 mt-3 sm:mt-4 animate-fade-in border-t border-gray-200 pt-3 sm:pt-4 text-gray-500">
                  {/* Render CKEditor5 HTML if present using html-react-parser */}
                  {service.additional_info && (
                    parse(service.additional_info)
                  )}
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

