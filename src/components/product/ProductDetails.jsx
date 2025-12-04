import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("medium");
  const [qty, setQty] = useState(1);

  // const images = ["/img1.png", "/img2.png", "/img3.png", "/img4.png"];

  // const product = {
  //   name: "Dolce Shine Eau de",
  //   price: 69.56,
  //   sizes: ["small", "medium", "large"],
  //   tags: ["fragrances", "perfumes"],
  //   description:
  //     "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
  // };

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] lg:w-[80%] mx-auto mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT: IMAGES */}
        <div className="flex gap-4">
          {/* Small Images */}
          <div className="flex flex-col gap-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                className={`w-16 h-16 rounded-lg object-cover border cursor-pointer ${
                  selectedImage === i ? "border-green-500" : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(i)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={images[selectedImage]}
              className="w-full h-[350px] sm:h-[420px] rounded-xl object-cover border"
            />
          </div>
        </div>

        {/* RIGHT: PRODUCT DETAILS */}
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-xl font-bold mt-1">${product.price}</p>

          {/* Sizes */}
          <h3 className="font-semibold mt-6">Available in:</h3>
          <div className="flex gap-2 mt-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`px-4 py-1 rounded-full text-sm border ${
                  selectedSize === size ? "bg-green-300 text-black" : "bg-white"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-6 border rounded-lg px-4 py-3">
            <button
              onClick={() => qty > 1 && setQty(qty - 1)}
              className="text-gray-700"
            >
              <FiMinus />
            </button>

            <span className="font-bold">{qty}</span>

            <button onClick={() => setQty(qty + 1)} className="text-gray-700">
              <FiPlus />
            </button>
          </div>

          {/* Add To Cart */}
          <button className="w-full bg-green-300 text-black py-3 rounded-lg mt-5 font-semibold hover:bg-green-400">
            Add to Cart
          </button>

          {/* Wishlist + Share */}
          <div className="flex gap-4 mt-4">
            <button className="flex items-center justify-center gap-2 w-1/2 border py-2 rounded-lg">
              <AiOutlineHeart className="text-lg" />
              Wishlist
            </button>

            <button className="flex items-center justify-center gap-2 w-1/2 border py-2 rounded-lg">
              <AiOutlineShareAlt className="text-lg" />
              Share
            </button>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-4">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-sm rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="mt-5">
            <h3 className="font-semibold">Product Details:</h3>
            <p className="text-gray-600 leading-6 text-sm mt-2">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Related products</h2>

        <Swiper slidesPerView={2.5} spaceBetween={20} className="pb-6">
          {[1, 2, 3, 4, 5].map((n) => (
            <SwiperSlide key={n}>
              <div className="border p-4 rounded-xl shadow hover:shadow-lg transition bg-white">
                <img src="/img1.png" className="w-full h-36 object-contain" />
                <p className="text-gray-800 font-semibold mt-2">$49.05</p>
                <p className="text-gray-500 text-sm">Sample Product</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
