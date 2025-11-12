'use client';

import BookingForm from '../BookingForm';
import { useDashboardContent } from '@/lib/queries/useDashboardContent';
import Image from 'next/image';

export default function AppointmentPage() {
  const { data, isLoading, isError, error } = useDashboardContent();

  if (isLoading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>
          <p className="text-lg font-semibold text-gray-700">Loading Appointment Page...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-red-50">
        <div className="text-center text-red-700">
          <h2 className="mb-2 text-2xl font-bold">Oops! Something went wrong.</h2>
          <p>We couldn't load the page content. Please try again later.</p>
          {error && <p className="mt-4 text-sm text-red-500">Error: {error.message}</p>}
        </div>
      </section>
    );
  }

  const appointmentContent = data?.appointment || {};
  const extraCardsContent = data?.extra_cards || {};

  const title = appointmentContent.title || 'Book Your Appointment';
  const titleParts = title.split(' ');
  const lastWord = titleParts.pop();
  const firstPart = titleParts.join(' ');

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            {firstPart} <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">{lastWord}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
            {appointmentContent.subtitle || 'Schedule your visit and experience our premium services'}
          </p>
          <div className="mx-auto mt-3 sm:mt-4 h-1 w-16 sm:w-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
        </div>

        <div className="flex justify-center">
          <div className="w-full">
            <BookingForm />
          </div>
        </div>

        {/* Additional Info */}
        {extraCardsContent.cards && (
          <div className="mt-12 sm:mt-16">
            {extraCardsContent.title && (
              <h3 className="mb-8 text-center text-2xl sm:text-3xl font-bold text-gray-800">
                {extraCardsContent.title}
              </h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {extraCardsContent.cards.map((info: any, index: number) => (
                <div
                  key={index}
                  className="rounded-xl bg-white p-5 sm:p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-100"
                >
                  <div className="mb-3 text-3xl sm:text-4xl">
                    {info.icon_type === 'image' && info.image ? (
                      <Image src={info.image} alt={info.title} width={48} height={48} className="object-contain mx-auto" />
                    ) : (
                      info.emoji
                    )}
                  </div>
                  <h3 className="mb-2 text-base sm:text-lg font-bold text-gray-800">{info.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

