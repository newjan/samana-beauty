'use client';

import BookingForm from '../BookingForm';

export default function AppointmentPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Book Your <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Appointment</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
            Schedule your visit and experience our premium services
          </p>
          <div className="mx-auto mt-3 sm:mt-4 h-1 w-16 sm:w-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
        </div>

        <div className="flex justify-center">
          <div className="w-full">
            <BookingForm />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: '⏰',
              title: 'Flexible Scheduling',
              desc: 'Book at your convenience',
            },
            {
              icon: '💳',
              title: 'Easy Payment',
              desc: 'Multiple payment options',
            },
            {
              icon: '✨',
              title: 'Premium Service',
              desc: 'Expert care guaranteed',
            },
          ].map((info, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-5 sm:p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-100"
            >
              <div className="mb-3 text-3xl sm:text-4xl">{info.icon}</div>
              <h3 className="mb-2 text-base sm:text-lg font-bold text-gray-800">{info.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{info.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

