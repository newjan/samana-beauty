import SkeletonLoader from "../SkeletonLoader";

export default function AboutPageSkeleton() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-pink-50 px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <SkeletonLoader className="h-12 w-3/4 mx-auto mb-4" />
          <SkeletonLoader className="h-1 w-24 mx-auto" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-12 lg:grid-cols-2">
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg">
              <SkeletonLoader className="h-8 w-1/2 mb-4" />
              <SkeletonLoader className="h-4 w-full mb-2" />
              <SkeletonLoader className="h-4 w-full mb-2" />
              <SkeletonLoader className="h-4 w-5/6" />
            </div>
            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg">
              <SkeletonLoader className="h-8 w-1/2 mb-4" />
              <SkeletonLoader className="h-4 w-full" />
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="rounded-xl bg-white p-4 sm:p-6 text-center shadow-md">
                  <SkeletonLoader className="h-10 w-10 mx-auto mb-3" />
                  <SkeletonLoader className="h-4 w-3/4 mx-auto mb-2" />
                  <SkeletonLoader className="h-3 w-full mx-auto" />
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg">
              <SkeletonLoader className="h-8 w-1/2 mb-4" />
              <ul className="space-y-3">
                {[...Array(3)].map((_, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <SkeletonLoader className="h-5 w-5 rounded-full" />
                    <SkeletonLoader className="h-4 w-full" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20">
          <SkeletonLoader className="h-10 w-1/3 mx-auto mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="rounded-2xl bg-white p-5 sm:p-6 text-center shadow-lg">
                <SkeletonLoader className="w-24 h-24 rounded-full mx-auto mb-4" />
                <SkeletonLoader className="h-6 w-1/2 mx-auto mb-2" />
                <SkeletonLoader className="h-4 w-3/4 mx-auto" />
                <SkeletonLoader className="h-3 w-full mx-auto mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
