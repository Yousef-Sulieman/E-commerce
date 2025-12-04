export default function TopOfferSkeleton() {
  return (
    <div className="w-[70%] mx-auto py-15 animate-pulse">
      <div className="h-8 w-40 bg-gray-300 rounded mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm"
          >
            <div className="w-full h-56 bg-gray-200 rounded-xl" />
            <div className="h-4 w-3/4 bg-gray-200 rounded mt-4" />
            <div className="h-4 w-1/2 bg-gray-200 rounded mt-2" />
            <div className="h-10 w-full bg-gray-300 rounded mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
