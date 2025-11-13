import SkeletonLoader from "../SkeletonLoader";

export default function ServicesPageSkeleton() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <SkeletonLoader className="h-12 w-3/4 mx-auto mb-4" />
          <SkeletonLoader className="h-5 w-1/2 mx-auto" />
          <SkeletonLoader className="h-1 w-24 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="rounded-2xl bg-white p-5 sm:p-6 shadow-lg">
              <SkeletonLoader className="h-40 w-full mb-4" />
              <SkeletonLoader className="h-8 w-3/4 mb-3" />
              <SkeletonLoader className="h-4 w-full mb-2" />
              <SkeletonLoader className="h-4 w-5/6 mb-4" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 border-t border-gray-200 pt-3 sm:pt-4">
                <div>
                  <SkeletonLoader className="h-4 w-16 mb-1" />
                  <SkeletonLoader className="h-3 w-12" />
                </div>
                <SkeletonLoader className="h-10 w-24 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 sm:p-8 shadow-xl">
            <SkeletonLoader className="h-8 w-1/2 mx-auto mb-4" />
            <SkeletonLoader className="h-5 w-3/4 mx-auto mb-6" />
            <SkeletonLoader className="h-12 w-32 mx-auto rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
