import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";

const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllBrands = async () => {
    if (brands.length > 0) return; // already fetched
    try {
      setLoading(true);
      const res = await axiosClient.get("/brand/get-all-brand");
      setBrands(res.data?.data || []);
    } catch (err) {
      console.error("fetchAllBrands", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ننفذ fetch مرة واحدة عند mount فقط
    fetchAllBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrandContext.Provider value={{ brands, loading, fetchAllBrands }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => useContext(BrandContext);
