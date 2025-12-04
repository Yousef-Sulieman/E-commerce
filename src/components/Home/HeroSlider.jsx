"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Hero1 from "../../assets/Hero2-COBX3cwL.png";
import Hero2 from "../../assets/slider-image-6.jpg.png";

// Swiper modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function HeroSlider() {
  return (
    <div className="relative w-full h-[380px] overflow-hidden mt-2">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={true}
        className="w-full h-full hero-swiper"
      >
        {/* SLIDE 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={Hero1}
              className="w-full h-full object-cover"
              alt="slide1"
            />

            {/* OVERLAY CONTENT */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 bg-black/20">
              <h1 className="text-3xl font-bold mb-4 drop-shadow-lg">
                Best Deals For You
              </h1>

              <p className="text-lg mb-6 drop-shadow-md">
                Shop the latest collections now!
              </p>

              <a
                href="/shop"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                Shop Now
              </a>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={Hero2}
              className="w-full h-full object-cover"
              alt="slide2"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 bg-black/30">
              <h1 className="text-3xl font-bold mb-4 drop-shadow-lg">
                New Arrivals
              </h1>

              <p className="text-lg mb-6 drop-shadow-md">
                Discover trending products today!
              </p>

              <a
                href="/shop"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                Shop Now
              </a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default HeroSlider;
