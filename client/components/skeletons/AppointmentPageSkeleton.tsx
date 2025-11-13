import SkeletonLoader from "../SkeletonLoader";

export default function AppointmentPageSkeleton() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12 text-center">
          <SkeletonLoader className="h-12 w-3/4 mx-auto mb-4" />
          <SkeletonLoader className="h-5 w-1/2 mx-auto" />
          <SkeletonLoader className="h-1 w-24 mx-auto mt-4" />
        </div>

        <div className="flex justify-center">
          <div className="w-full bg-white p-8 rounded-2xl shadow-lg">
            <SkeletonLoader className="h-8 w-1/3 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SkeletonLoader className="h-12 w-full" />
              <SkeletonLoader className="h-12 w-full" />
              <SkeletonLoader className="h-12 w-full" />
              <SkeletonLoader className="h-12 w-full" />
            </div>
            <SkeletonLoader className="h-24 w-full mt-6" />
            <SkeletonLoader className="h-12 w-1/3 mt-6 mx-auto rounded-full" />
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <SkeletonLoader className="h-10 w-1/3 mx-auto mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="rounded-xl bg-white p-5 sm:p-6 text-center shadow-lg">
                <SkeletonLoader className="h-12 w-12 mx-auto mb-3" />
                <SkeletonLoader className="h-5 w-3/4 mx-auto mb-2" />
                <SkeletonLoader className="h-4 w-full mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
