"use client";

import { useEffect, useRef } from "react";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { useDashboardContent } from "@/lib/queries/useDashboardContent";
import ContactPageSkeleton from "../skeletons/ContactPageSkeleton";

interface ContactHour {
  day: string;
  time: string;
}

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError, error } = useDashboardContent();

  useEffect(() => {
    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-fade-in");
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }
  }, [data]);

  if (isLoading) {
    return <ContactPageSkeleton />;
  }

  if (isError) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-red-50">
        <div className="text-center text-red-700">
          <h2 className="mb-2 text-2xl font-bold">
            Oops! Something went wrong.
          </h2>
          <p>We couldn&apos;t load the page content. Please try again later.</p>
          {error && (
            <p className="mt-4 text-sm text-red-500">Error: {error.message}</p>
          )}
        </div>
      </section>
    );
  }

  const contactContent = data?.contact;
  const { title, address, phone, email, hours, map_url } = contactContent || {};
  const socialContent = data?.follow_us;

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
            {title?.split(" ")[0]}{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {title?.split(" ")[1]}
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
            Get in touch with us - we&apos;d love to hear from you!
          </p>
          <div className="mx-auto mt-3 sm:mt-4 h-1 w-16 sm:w-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Phone & Email Card */}
          <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-lg">
            <h3 className="mb-4 text-xl sm:text-2xl font-bold text-gray-800">
              Get in Touch
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex-shrink-0">
                  <span className="text-lg">📞</span>
                </div>
                <div className="min-w-0">
                  <h4 className="mb-1 text-sm font-semibold text-gray-800">
                    Phone
                  </h4>
                  <a
                    href={`tel:${phone}`}
                    className="text-sm text-pink-600 hover:text-pink-700 break-all"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex-shrink-0">
                  <span className="text-lg">✉️</span>
                </div>
                <div className="min-w-0">
                  <h4 className="mb-1 text-sm font-semibold text-gray-800">
                    Email
                  </h4>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm text-pink-600 hover:text-pink-700 break-all"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Address & Hours Card */}
          <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-lg">
            <h3 className="mb-4 text-xl sm:text-2xl font-bold text-gray-800">
              Visit Us
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex-shrink-0">
                  <span className="text-lg">📍</span>
                </div>
                <div className="min-w-0">
                  <h4 className="mb-1 text-sm font-semibold text-gray-800">
                    Address
                  </h4>
                  <p className="text-sm text-gray-600">{address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex-shrink-0">
                  <span className="text-lg">🕒</span>
                </div>
                <div className="min-w-0">
                  <h4 className="mb-1 text-sm font-semibold text-gray-800">
                    Hours
                  </h4>
                  {hours?.map((h: ContactHour, i: number) => (
                    <p key={i} className="text-sm text-gray-600">
                      {h.day}: {h.time}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Card - Smaller */}
          <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 p-5 sm:p-6 text-white">
            <h3 className="mb-2 text-lg sm:text-xl font-bold">
              {socialContent?.title || "Follow Us"}
            </h3>
            <p className="mb-4 text-sm">
              {socialContent?.subtitle || "Stay connected!"}
            </p>
            <div className="flex space-x-3">
              {socialContent?.socials?.facebook && (
                <a
                  href={socialContent.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-blue-600 transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white active:scale-95"
                >
                  <SiFacebook className="h-5 w-5" />
                </a>
              )}
              {socialContent?.socials?.instagram && (
                <a
                  href={socialContent.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-pink-500 transition-all duration-300 hover:scale-110 hover:bg-pink-500 hover:text-white active:scale-95"
                >
                  <SiInstagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Full Width Map */}
        <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-lg">
          <h3 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-gray-800">
            Our Location
          </h3>
          {map_url && (
            <div className="relative h-96 sm:h-[500px] lg:h-[600px] overflow-hidden rounded-xl bg-gray-200">
              <iframe
                src={map_url}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}