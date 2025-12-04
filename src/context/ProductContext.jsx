import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false); // لودر الفلترة
  const [loadingProducts, setLoadingProducts] = useState(true); // لودر أول مرة

  const [page, setPage] = useState(1);
  const [limit] = useState(40);

  const location = useLocation();
  const navigate = useNavigate();

  // ---------------------------
  // Read filters from URL
  // ---------------------------
  const getFiltersFromURL = () => {
    const params = new URLSearchParams(location.search);
    return {
      category: params.get("category") ? params.get("category").split(",") : [],
      brand: params.get("brand") || "",
      minPrice: Number(params.get("min") || 0),
      maxPrice: Number(params.get("max") || Infinity),
      available: params.get("available") === "true",
      search: params.get("search") || "",
    };
  };

  const [filters, setFilters] = useState(getFiltersFromURL());

  useEffect(() => {
    const newFilters = getFiltersFromURL();
    setFilters((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(newFilters)) return prev;
      return newFilters;
    });
    setPage(1);
  }, [location.search]);

  // ---------------------------
  // Unify duplicated products
  // ---------------------------
  const unifyProducts = (list) => {
    const map = {};
    list.forEach((p) => {
      const key = `${p.Name}-${p.Brand?._id || ""}`;
      if (!map[key]) {
        map[key] = { ...p, quantity: 1 };
      } else {
        map[key].quantity += 1;
      }
    });
    return Object.values(map);
  };

  // ---------------------------
  // Fetch All Products ONCE
  // ---------------------------
  const fetchAllProducts = useCallback(async () => {
    if (allProducts.length > 0) {
      setLoadingProducts(false);
      return;
    }

    setLoadingProducts(true);

    try {
      const res = await axiosClient.get("/product/get-all-product");
      const list = res.data?.products || [];
      const unified = unifyProducts(list);

      setAllProducts(unified);
      setProducts(unified);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  }, [allProducts.length]);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // ---------------------------
  // Apply Filters (معدلة)
  // ---------------------------
  const applyFilters = useCallback(() => {
    setLoading(true); // ← مهم جداً

    let filtered = allProducts;

    if (filters.category?.length > 0) {
      filtered = filtered.filter((p) =>
        filters.category.includes(p.categoryId?._id)
      );
    }

    if (filters.brand) {
      filtered = filtered.filter((p) => p.Brand?._id === filters.brand);
    }

    filtered = filtered.filter((p) => {
      const price = Number(p.Price ?? 0);
      return price >= filters.minPrice && price <= filters.maxPrice;
    });

    if (filters.available) {
      filtered = filtered.filter(
        (p) => p.available === true || p.available === "InStock"
      );
    }

    if (filters.search) {
      filtered = filtered.filter((p) =>
        (p.Name || "").toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // ← delay صغير عشان يمنع التهنيج
    setTimeout(() => {
      setProducts(filtered);
      setPage(1);
      setLoading(false);
    }, 150);
  }, [allProducts, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // ---------------------------
  // Update URL
  // ---------------------------
  const updateURLParams = (key, value) => {
    const params = new URLSearchParams(location.search);
    if (!value || value === "" || value === "all") params.delete(key);
    else params.set(key, value);

    navigate(`/shop?${params.toString()}`);
  };

  const setCategory = (id) => updateURLParams("category", id);
  const setBrand = (id) => updateURLParams("brand", id);
  const setSearch = (q) => updateURLParams("search", q);
  const setPriceRange = (min, max) => {
    updateURLParams("min", min);
    updateURLParams("max", max);
  };
  const setAvailability = (v) => updateURLParams("available", v ? "true" : "");
  const clearFilters = () => navigate("/shop");

  // ---------------------------
  // Pagination
  // ---------------------------
  const total = products.length;
  const paginatedProducts = products.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    const maxPage = Math.ceil(total / limit);
    if (page > maxPage && maxPage > 0) setPage(maxPage);
    if (page < 1) setPage(1);
  }, [total, page, limit]);

  return (
    <ProductContext.Provider
      value={{
        loading, // ← لودر الفلترة
        loadingProducts, // ← لودر أول مرة
        products: paginatedProducts,
        allProducts,
        fetchAllProducts,
        filters,
        setCategory,
        setBrand,
        setPriceRange,
        setAvailability,
        setSearch,
        clearFilters,
        page,
        setPage,
        limit,
        total,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
