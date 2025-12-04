import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllCategories = async () => {
    if (categories.length > 0) return; // already fetched
    try {
      setLoading(true);
      const res = await axiosClient.get("/category/get-category");
      setCategories(res.data?.categories || []);
    } catch (err) {
      console.error("fetchAllCategories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, loading, fetchAllCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
