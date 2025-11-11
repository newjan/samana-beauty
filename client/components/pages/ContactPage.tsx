"use client";

import { useState } from "react";
import { SiFacebook, SiInstagram } from "react-icons/si";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
            Contact{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Us
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
            Get in touch with us - we'd love to hear from you!
          </p>
          <div className="mx-auto mt-3 sm:mt-4 h-1 w-16 sm:w-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-2xl bg-white p-5 sm:p-6 md:p-8 shadow-lg">
              <h3 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-gray-800">
                Visit Us
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex-shrink-0">
                    <span className="text-xl sm:text-2xl">📍</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-1 text-sm sm:text-base font-semibold text-gray-800">
                      Address
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      Suryabinayak, Pandubazar
                      <br />
                      Bhaktapur, Nepal
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex-shrink-0">
                    <span className="text-xl sm:text-2xl">📞</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-1 text-sm sm:text-base font-semibold text-gray-800">Phone</h4>
                    <a
                      href="tel:+9779851277936"
                      className="text-sm sm:text-base text-pink-600 hover:text-pink-700 break-all"
                    >
                      (977) 9851277936
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex-shrink-0">
                    <span className="text-xl sm:text-2xl">✉️</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-1 text-sm sm:text-base font-semibold text-gray-800">Email</h4>
                    <a
                      href="mailto:samanabeautygallery@gmail.com"
                      className="text-sm sm:text-base text-pink-600 hover:text-pink-700 break-all"
                    >
                      samanabeautygallery@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex-shrink-0">
                    <span className="text-xl sm:text-2xl">🕒</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-1 text-sm sm:text-base font-semibold text-gray-800">Hours</h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      Monday - Saturday: 9:00 AM - 7:30 PM
                      <br />
                      Sunday: 11:00 AM - 7:30 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 p-5 sm:p-6 md:p-8 text-white">
              <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/makeoverbysamana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/80 text-blue-600 transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white active:scale-95"
                >
                  <SiFacebook className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>

                <a
                  href="https://instagram.com/samanathebeautygallery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/80 text-pink-500 transition-all duration-300 hover:scale-110 hover:bg-pink-500 hover:text-white active:scale-95"
                >
                  <SiInstagram className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form & Map */}
          <div className="space-y-4 sm:space-y-6">
            {/* Map */}
            <div className="rounded-2xl bg-white p-3 sm:p-4 shadow-lg">
              <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold text-gray-800">Find Us</h3>
              <div className="relative h-48 sm:h-64 overflow-hidden rounded-xl bg-gray-200">
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
            <div className="rounded-2xl bg-white p-5 sm:p-6 md:p-8 shadow-lg">
              <h3 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-gray-800">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 sm:mb-2 block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 sm:mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 sm:mb-2 block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
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
