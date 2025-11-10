'use client';

import BookingForm from '../BookingForm';

export default function AppointmentPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-5xl font-bold text-gray-800 md:text-6xl">
            Book Your <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Appointment</span>
          </h2>
          <p className="text-xl text-gray-600">
            Schedule your visit and experience our premium services
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
        </div>

        <div className="flex justify-center">
          <BookingForm />
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
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
              className="rounded-xl bg-white p-6 text-center shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="mb-3 text-4xl">{info.icon}</div>
              <h3 className="mb-2 font-bold text-gray-800">{info.title}</h3>
              <p className="text-gray-600">{info.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

