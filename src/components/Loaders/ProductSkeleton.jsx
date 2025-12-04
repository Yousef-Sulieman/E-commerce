export default function ProductSkeleton() {
  return (
    <div className=" shadow rounded-lg p-4 animate-pulse">
      <div className="h-40 bg-gray-300 rounded mb-4"></div>

      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>

      <div className="h-6 bg-gray-300 rounded w-20"></div>
    </div>
  );
}
