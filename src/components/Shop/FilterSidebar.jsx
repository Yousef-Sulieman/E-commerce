import React, { useState } from "react";
import { useBrand } from "../../context/BrandContext";
import { useCategory } from "../../context/CategoryContext";
import { useProduct } from "../../context/ProductContext";
import FilterSidebarSkeleton from "../Loaders/FilterSidebarSkeleton";

export default function FilterSidebar() {
  const { brands, loading: brandLoading } = useBrand();
  const { categories, loading: categoryLoading } = useCategory();
  const {
    setBrand,
    setCategory,
    setPriceRange,
    setAvailability,
    setSearch,
    clearFilters,
  } = useProduct();

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // أثناء تحميل API → اعرض skeleton
  if (brandLoading || categoryLoading || !brands.length || !categories.length) {
    return <FilterSidebarSkeleton />;
  }

  const handleCategoryChange = (catId, checked) => {
    let updated;
    if (checked) {
      updated = [...selectedCategories, catId];
    } else {
      updated = selectedCategories.filter((id) => id !== catId);
    }
    setSelectedCategories(updated);
    setCategory(updated);
  };

  return (
    <aside className="p-4 w-full bg-white rounded-lg shadow">
      {/* Categories */}
      <div className="mb-4">
        <h3 className="font-semibold mb-5">Product Categories</h3>
        <div className="flex flex-col gap-2">
          {categories.map((c) => (
            <label
              key={c._id}
              className="flex items-center gap-2 pl-3 text-[15px] cursor-pointer text-[#71778E]"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(c._id)}
                onChange={(e) => handleCategoryChange(c._id, e.target.checked)}
                className="appearance-none w-4 h-4 border border-gray-400 rounded-md
               checked:bg-primary  focus:outline-none"
              />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-4">
        <h3 className="font-semibold mb-5">Brands</h3>
        <div className="flex flex-col gap-2">
          {brands.map((b) => (
            <label
              key={b._id}
              className="flex items-center gap-2 pl-3 text-[15px] cursor-pointer text-[#71778E]"
            >
              <input
                type="checkbox"
                onChange={() => setBrand(b._id)}
                className="appearance-none w-4 h-4 border border-gray-400 rounded-md
               checked:bg-primary  focus:outline-none"
              />
              <span>{b.Name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-4 z-0">
        <h3 className="font-semibold mb-5">Price</h3>
        <div className="flex gap-2">
          <input
            type="number"
            className="w-1/2 p-2 border rounded pl-3 text-[15px] cursor-pointer text-[#71778E]"
            placeholder="Min"
            onChange={(e) => setMin(Number(e.target.value || 0))}
            value={min}
          />
          <span className="text-[15px] cursor-pointer text-[#71778E]">-</span>
          <input
            type="number"
            className="w-1/2 p-2 border rounded pl-3 text-[15px] cursor-pointer text-[#71778E]"
            placeholder="Max"
            onChange={(e) => setMax(Number(e.target.value || 0))}
            value={max}
          />
        </div>

        <button
          className="mt-2 w-full p-2 mt-5 bg-primary hover:bg-primary/80 transition-colors cursor-pointer text-white rounded"
          onClick={() => setPriceRange(min || 0, max || Infinity)}
        >
          Apply Price
        </button>
      </div>

      {/* Availability */}
      <div className="mb-4 mt-10">
        <label className="flex items-center gap-2 pl-3 text-[15px] cursor-pointer text-[#71778E]">
          <input
            type="checkbox"
            onChange={(e) => setAvailability(e.target.checked)}
            className="appearance-none w-4 h-4 border border-gray-400 rounded-md
               checked:bg-primary  focus:outline-none"
          />
          Available Only
        </label>
      </div>
    </aside>
  );
}
