import React, { useEffect, useState } from "react";
import { useOffer } from "../../context/OfferContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import TopOfferSkeleton from "../Loaders/TopOfferSkeleton";

import "swiper/css";
import "swiper/css/navigation";

export default function TopOffer() {
  const { getTopOffer } = useOffer();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------------------
  // Hide TopOffer if user not logged in
  // ---------------------------
  if (!user) return null;

  useEffect(() => {
    const fetchTopOffers = async () => {
      setLoading(true);
      try {
        const data = await getTopOffer();
        setOffers(data);
      } catch (err) {
        console.error("Failed to fetch top offers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopOffers();
  }, [getTopOffer]);

  const handleAddToCart = async (offer) => {
    try {
      await addToCart(offer._id, 1); // ← important: send productId & quantity separately
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  // ---------------------------
  // Skeleton Loader
  // ---------------------------
  if (loading) return <TopOfferSkeleton />;

  if (!offers.length) return null;

  return (
    <div className="w-[70%] mx-auto py-15">
      <h2 className="text-3xl font-bold mb-6 text-start text-gray-800">
        Top Offers
      </h2>

      <Swiper
        spaceBetween={25}
        slidesPerView={1}
        navigation={{
          nextEl: ".topOffer-next",
          prevEl: ".topOffer-prev",
        }}
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="relative"
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer._id}>
            <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={offer.Image?.url}
                  alt={offer.Name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />

                <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
                  ⭐ Top Offer
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {offer.Name}
                </h3>

                <p className="text-primary font-bold text-xl mt-2">
                  ${offer.Price}
                </p>

                <button
                  onClick={() => handleAddToCart(offer)}
                  className="w-full mt-4 bg-primary text-white py-2 rounded-xl 
                             hover:opacity-90 transition font-medium shadow-md cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* ARROWS */}
        <button className="topOffer-prev absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-primary hover:text-white transition z-50">
          ‹
        </button>
        <button className="topOffer-next absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-primary hover:text-white transition z-50">
          ›
        </button>
      </Swiper>
    </div>
  );
}
