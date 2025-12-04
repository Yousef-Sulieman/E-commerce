import React from "react";

export default function FilterSidebarSkeleton() {
  return (
    <aside className="p-4 w-full bg-white rounded-lg shadow animate-pulse">
      {/* Categories */}
      <div className="mb-4">
        <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2 pl-3">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <div className="h-4 w-28 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-4">
        <div className="h-5 w-32 bg-gray-200 rounded mb-4" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2 pl-3">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="h-5 w-20 bg-gray-200 rounded mb-4" />

        <div className="flex gap-2">
          <div className="w-1/2 h-9 bg-gray-200 rounded" />
          <span className="w-4 h-4 bg-gray-200 rounded" />
          <div className="w-1/2 h-9 bg-gray-200 rounded" />
        </div>

        <div className="w-full h-10 bg-gray-300 rounded mt-4" />
      </div>

      {/* Availability */}
      <div className="mt-8">
        <div className="flex items-center gap-2 pl-3">
          <div className="w-4 h-4 bg-gray-300 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
      </div>
    </aside>
  );
}
