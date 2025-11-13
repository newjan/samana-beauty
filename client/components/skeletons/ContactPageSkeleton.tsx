import SkeletonLoader from "../SkeletonLoader";

export default function ContactPageSkeleton() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <SkeletonLoader className="h-12 w-3/4 mx-auto mb-4" />
          <SkeletonLoader className="h-5 w-1/2 mx-auto" />
          <SkeletonLoader className="h-1 w-24 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Cards */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="rounded-2xl bg-white p-5 sm:p-6 shadow-lg">
              <SkeletonLoader className="h-8 w-1/2 mb-4" />
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <SkeletonLoader className="h-10 w-10 rounded-full flex-shrink-0" />
                  <div className="w-full">
                    <SkeletonLoader className="h-4 w-1/4 mb-2" />
                    <SkeletonLoader className="h-4 w-3/4" />
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <SkeletonLoader className="h-10 w-10 rounded-full flex-shrink-0" />
                  <div className="w-full">
                    <SkeletonLoader className="h-4 w-1/4 mb-2" />
                    <SkeletonLoader className="h-4 w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-lg">
          <SkeletonLoader className="h-8 w-1/3 mb-6" />
          <SkeletonLoader className="h-96 w-full" />
        </div>
      </div>
    </section>
  );
}
