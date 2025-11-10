'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold text-gray-800 md:text-6xl">
            Contact <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-xl text-gray-600">
            Get in touch with us - we'd love to hear from you!
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="mb-6 text-3xl font-bold text-gray-800">Visit Us</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-800">Address</h4>
                    <p className="text-gray-600">
                      Suryabinayak, Pandubazar<br />
                      Bhaktapur, Nepal
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-800">Phone</h4>
                    <a href="tel:+9779851277936" className="text-pink-600 hover:text-pink-700">
                      (977) 9851277936
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-800">Email</h4>
                    <a href="mailto:samanabeautygallery@gmail.com" className="text-pink-600 hover:text-pink-700">
                      samanabeautygallery@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                    <span className="text-2xl">🕒</span>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-800">Hours</h4>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 7:30 PM<br />
                      Sunday: 11:00 AM - 7:30 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 p-8 text-white">
              <h3 className="mb-4 text-2xl font-bold">Follow Us</h3>
              <div className="flex space-x-4">
                {['📘', '📷', '🐦', '💼'].map((icon, index) => (
                  <button
                    key={index}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl transition-all duration-300 hover:scale-110 hover:bg-white/30"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form & Map */}
          <div className="space-y-6">
            {/* Map */}
            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <h3 className="mb-4 text-2xl font-bold text-gray-800">Find Us</h3>
              <div className="relative h-64 overflow-hidden rounded-xl bg-gray-200">
                {/* Embedded Google Map - Replace with actual map embed code */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.6720998959113!2d85.41950077544247!3d27.66561492733084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1b52aa08b59b%3A0xb4006ac0101cf3fe!2sSAMANA%20The%20Beauty%20Gallery!5e0!3m2!1sen!2snp!4v1762760502005!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="mb-6 text-3xl font-bold text-gray-800">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

