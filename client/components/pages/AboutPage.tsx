"use client";

import { useDashboardContent } from "@/lib/queries/useDashboardContent";
import { useEffect, useRef } from "react";
import AboutPageSkeleton from "../skeletons/AboutPageSkeleton"; // new import
import Image from "next/image";
import { FeatureCard, TeamMember } from "@/lib/api";

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: dashboardContent, isLoading, error } = useDashboardContent();

  useEffect(() => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (isLoading) {
    return <AboutPageSkeleton />; // updated
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-red-100 text-red-500 text-xl">
        {error.message}
      </div>
    );
  }

  const aboutContent = dashboardContent?.about;
  const teamContent = dashboardContent?.team;

  const title = aboutContent?.title || "About Us";
  const titleParts = title.split(" ");
  const lastWord = titleParts.pop();
  const firstPart = titleParts.join(" ");

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-white to-pink-50 px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
            {firstPart}{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {lastWord}
            </span>
          </h2>
          <div className="mx-auto h-1 w-16 sm:w-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-12 lg:grid-cols-2">
          {/* Story Section */}
          <div className="space-y-4 sm:space-y-6">
            {aboutContent?.our_story && (
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg">
                <h3 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-gray-800">
                  {aboutContent.our_story.title}
                </h3>
                {aboutContent.our_story.content
                  .split("\n")
                  .map((paragraph: string, index: number) => (
                    <p
                      key={index}
                      className="text-base sm:text-lg leading-relaxed text-gray-600 mb-3"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            )}

            {aboutContent?.our_mission && (
              <div className="rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 p-6 sm:p-8 text-white shadow-lg">
                <h3 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold">
                  {aboutContent.our_mission.title}
                </h3>
                <p className="text-base sm:text-lg leading-relaxed">
                  {aboutContent.our_mission.content}
                </p>
              </div>
            )}
          </div>

          {/* Values Section */}
          <div className="space-y-4 sm:space-y-6">
            {aboutContent?.cards && (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {aboutContent.cards.map((value: FeatureCard, index: number) => (
                  <div
                    key={index}
                    className="group rounded-xl bg-white p-4 sm:p-6 text-center shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="mb-2 sm:mb-3 text-3xl sm:text-4xl">
                      {value.emoji}
                    </div>
                    <h4 className="mb-1 sm:mb-2 text-sm sm:text-base font-bold text-gray-800">
                      {value.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {aboutContent?.why_choose_us && (
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg">
                <h3 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-gray-800">
                  {aboutContent.why_choose_us.title}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {aboutContent.why_choose_us.points.map(
                    (item: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start sm:items-center space-x-2 sm:space-x-3 text-sm sm:text-base md:text-lg text-gray-600"
                      >
                        <span className="text-pink-500 flex-shrink-0 mt-1 sm:mt-0">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Team Section */}
        {teamContent?.members && (
          <div className="mt-12 sm:mt-16 md:mt-20">
            <h3 className="mb-8 sm:mb-12 text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              {teamContent.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {teamContent.members.map((member: TeamMember, index: number) => (
                <div
                  key={index}
                  className="group rounded-2xl bg-white p-5 sm:p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="mb-3 sm:mb-4 text-5xl sm:text-6xl">
                    {member.icon_type === "image" && member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={96} // Adjusted width for Image component
                        height={96} // Adjusted height for Image component
                        className="w-24 h-24 rounded-full mx-auto object-cover"
                      />
                    ) : (
                      member.emoji
                    )}
                  </div>
                  <h4 className="mb-2 text-lg sm:text-xl font-bold text-gray-800">
                    {member.name}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}