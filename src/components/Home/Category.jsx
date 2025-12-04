import React, { useEffect } from "react";
import { useCategory } from "../../context/CategoryContext";
import { useProduct } from "../../context/ProductContext";

function Category() {
  const { categories, fetchAllCategories } = useCategory();
  const { products } = useProduct();

  useEffect(() => {
    if (!categories || categories.length === 0) {
      fetchAllCategories(); // Fetch categories once
    }
  }, []);

  const getCount = (catId) => {
    if (!products || products.length === 0) return 0;

    return products.filter((p) => p.categoryId && p.categoryId._id === catId)
      .length;
  };

  return (
    <div className="w-[70%] mx-auto py-15">
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 border border-gray-200 
                rounded-xl overflow-hidden  "
      >
        {categories?.map((cat) => (
          <div
            key={cat._id}
            className="   
                flex flex-col items-center 
                bg-white 
                border-[1px] 
                border-gray-200 
                 p-2 
               shadow-sm 
          hover:shadow-xl
          transition 
          cursor-pointer
                "
          >
            <img
              src={cat?.Image?.url}
              alt={cat.name}
              className="w-24 h-24 object-contain mb-2"
            />

            <h3 className="font-semibold text-gray-800 text-lg">{cat.name}</h3>

            <p className="text-gray-500 text-sm mt-1">
              {getCount(cat._id)} products
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
