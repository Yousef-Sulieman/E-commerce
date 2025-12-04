import React, { createContext, useContext } from "react";
import axiosClient from "../utils/axiosClient";

const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
  const token = localStorage.getItem("AccessToken"); // أو الطريقة اللي انت مخزن بيها التوكن

  const getTopOffer = async () => {
    try {
      const res = await axiosClient.get("/offer/top-offer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data?.data || [];
    } catch (err) {
      console.error("fetchTopOffers", err);
      return [];
    }
  };

  return (
    <OfferContext.Provider value={{ getTopOffer }}>
      {children}
    </OfferContext.Provider>
  );
};

export const useOffer = () => useContext(OfferContext);
