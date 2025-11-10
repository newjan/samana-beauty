'use client';

import { useEffect, useRef } from 'react';

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-b from-white to-pink-50 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold text-gray-800 md:text-6xl">
            About <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Us</span>
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Story Section */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="mb-4 text-3xl font-bold text-gray-800">Our Story</h3>
              <p className="mb-4 text-lg leading-relaxed text-gray-600">
                Founded with a passion for beauty and wellness, Samana Beauty has been serving our community 
                for over a decade. We believe that everyone deserves to feel beautiful and confident in their own skin.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                Our team of expert stylists and beauty professionals are dedicated to providing you with 
                an exceptional experience, using only the finest products and latest techniques in the industry.
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 p-8 text-white shadow-lg">
              <h3 className="mb-4 text-3xl font-bold">Our Mission</h3>
              <p className="text-lg leading-relaxed">
                To empower our clients to look and feel their best through personalized beauty services 
                and premium products, delivered with care and expertise.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '💆', title: 'Expertise', desc: 'Years of experience' },
                { icon: '🌿', title: 'Natural', desc: 'Eco-friendly products' },
                { icon: '✨', title: 'Quality', desc: 'Premium services' },
                { icon: '❤️', title: 'Care', desc: 'Personalized attention' },
              ].map((value, index) => (
                <div
                  key={index}
                  className="group rounded-xl bg-white p-6 text-center shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="mb-3 text-4xl">{value.icon}</div>
                  <h4 className="mb-2 font-bold text-gray-800">{value.title}</h4>
                  <p className="text-sm text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="mb-4 text-3xl font-bold text-gray-800">Why Choose Us?</h3>
              <ul className="space-y-3">
                {[
                  'Certified and experienced professionals',
                  'Premium quality products and tools',
                  'Personalized service for each client',
                  'Relaxing and luxurious atmosphere',
                  'Competitive pricing and packages',
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3 text-lg text-gray-600">
                    <span className="text-pink-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h3 className="mb-12 text-center text-4xl font-bold text-gray-800">Meet Our Team</h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { name: 'Sarah Johnson', role: 'Lead Stylist', icon: '👩' },
              { name: 'Emily Chen', role: 'Beauty Specialist', icon: '👩‍🦰' },
              { name: 'Maria Garcia', role: 'Wellness Expert', icon: '👩‍🦳' },
            ].map((member, index) => (
              <div
                key={index}
                className="group rounded-2xl bg-white p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="mb-4 text-6xl">{member.icon}</div>
                <h4 className="mb-2 text-xl font-bold text-gray-800">{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

