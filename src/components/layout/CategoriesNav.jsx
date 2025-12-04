import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCategory } from "../../context/CategoryContext";
import CategoriesDropdown from "./CategoriesDropdown";

function CategoriesNav() {
  const { categories } = useCategory();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectCategory = (catId) => {
    navigate(catId ? `/shop?category=${catId}` : "/shop");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-white max-w-7xl mx-auto pl-5 mt-0 py-3 flex flex-col lg:flex-row lg:items-center ">
      <CategoriesDropdown />

      <nav className="mt-8 lg:ml-40">
        <ul className="flex flex-col lg:flex-row gap-4 lg:gap-5 lg:items-center">
          {/* Home */}
          <li>
            <button
              onClick={() => navigate("/")}
              className={`uppercase font-semibold text-gray-700 text-sm cursor-pointer px-3 py-2
                isActive("/")
                  ? "text-primary font-semibold  bg-primary/10 rounded-full "
                  : ""
              }
              hover:text-primary`}
            >
              HOME
            </button>
          </li>

          {/* Shop (بدون category) */}
          <li>
            <button
              onClick={() => handleSelectCategory(null)}
              className={`uppercase font-semibold text-sm  text-gray-700 cursor-pointer px-3 py-2
              ${
                isActive("/shop")
                  ? "text-primary font-semibold bg-primary/10 rounded-full "
                  : ""
              }
              hover:text-primary`}
            >
              SHOP
            </button>
          </li>

          {/* Categories */}
          {categories?.slice(0, 3).map((cat) => (
            <li key={cat._id}>
              <button
                onClick={() => handleSelectCategory(cat._id)}
                className={`uppercase font-semibold text-sm  text-gray-700 cursor-pointer px-1 py-1
                ${
                  location.search.includes(cat._id)
                    ? "text-primary font-semibold bg-primary/10 rounded-full "
                    : ""
                }
                hover:text-primary`}
              >
                {cat.name}
              </button>
            </li>
          ))}

          {/* Blog */}
          <li>
            <button
              onClick={() => navigate("/blog")}
              className={`uppercase font-semibold text-sm  text-gray-700 cursor-pointer px-3 py-2
              ${
                isActive("/blog")
                  ? "text-primary font-semibold bg-primary/10 rounded-full "
                  : ""
              }
              hover:text-primary`}
            >
              BLOG
            </button>
          </li>

          {/* Contact */}
          <li>
            <button
              onClick={() => navigate("/contact")}
              className={`uppercase font-semibold text-sm  text-gray-700 cursor-pointer  px-3 py-2
              ${
                isActive("/contact")
                  ? "text-primary font-semibold bg-primary/10 rounded-full"
                  : ""
              }
              hover:text-primary`}
            >
              CONTACT
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default CategoriesNav;
