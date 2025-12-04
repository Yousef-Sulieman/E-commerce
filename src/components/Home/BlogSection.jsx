import React from "react";
import shop1 from "../../assets/bacola-banner-05.jpg.png";
import shop2 from "../../assets/bacola-banner-10.jpg.png";
import shop3 from "../../assets/bacola-banner-06.jpg.png";
import blog1 from "../../assets/blog-1.jpg.png";
import blog2 from "../../assets/blog-3.jpg.png";
import blog3 from "../../assets/blog-5.jpg.png";

function BlogSection() {
  return (
    <section className="bg-white py-12">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Shop Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* CARD 1 */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <img
              src={shop1}
              alt="Shop 1"
              className="w-full h-auto object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0  flex flex-col justify-center items-start p-5 text-white">
              <p className="text-[#00B853] md:font-[500] md:text-[14px]">
                Weekend Discount 40%
              </p>
              <h3 className="text-[#3E445A] font-[600] text-[24px]">
                Natural Eggs
              </h3>
              <p className="text-[#9B9BB4] font-[400] text-[12px]">
                Eat one every day
              </p>
              <a
                href="/shop"
                className="rounded-2xl my-[10px] bg-[#C2C2D3] px-[15px] py-[10px] text-white cursor-pointers"
              >
                Shop Now
              </a>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <img
              src={shop2}
              alt="Shop 2"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0  flex flex-col justify-center items-start p-5 text-white">
              <p className="text-[#00B853] md:font-[500] md:text-[14px]">
                Weekend Discount 40%
              </p>
              <h3 className="text-[#3E445A] font-[600] text-[24px]">
                Taste the Best
              </h3>
              <p className="text-[#9B9BB4] font-[400] text-[12px]">
                Shine the morning
              </p>

              <a
                href="/shop"
                className="rounded-2xl my-[10px] bg-[#C2C2D3] px-[15px] py-[10px] text-white cursor-pointers"
              >
                Shop Now
              </a>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <img
              src={shop3}
              alt="Shop 3"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-5 text-white">
              <p className="text-[#00B853] md:font-[500] md:text-[14px]">
                Weekend Discount 40%
              </p>
              <h3 className="text-[#3E445A] font-[600] text-[24px]">
                Ditch the Junk
              </h3>
              <p className="text-[#9B9BB4] font-[400] text-[12px]">
                Breakfast made better
              </p>

              <a
                href="/shop"
                className="rounded-2xl my-[10px] bg-[#C2C2D3] px-[15px] py-[10px] text-white cursor-pointers"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>

        {/* Blog Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <img
              src={blog1}
              alt="Blog 1"
              className="w-full h-auto rounded-lg shadow-md"
            />
            <p className="text-[#9B9BB4] text-[13px] font-[300] uppercase my-[10px]">
              Grocery
            </p>
            <p className="text-[#202435] font-[600] text-[17px] ">
              But I must explain to you how all this mistaken idea
            </p>
            <p className="text-[#71778E] font-[500] text-[14px] mt-[6px]">
              Jan 13 2025
            </p>
          </div>

          <div>
            <img
              src={blog2}
              alt="Blog 2"
              className="w-full h-auto rounded-lg shadow-md"
            />
            <p className="text-[#9B9BB4] text-[13px] font-[300] uppercase my-[10px]">
              Grocery
            </p>
            <p className="text-[#202435] font-[600] text-[17px] ">
              But I must explain to you how all this mistaken idea
            </p>
            <p className="text-[#71778E] font-[500] text-[14px] mt-[6px]">
              Jan 13 2025
            </p>
          </div>

          <div>
            <img
              src={blog3}
              alt="Blog 3"
              className="w-full h-auto rounded-lg shadow-md"
            />
            <p className="text-[#9B9BB4] text-[13px] font-[300] uppercase my-[10px]">
              Grocery
            </p>
            <p className="text-[#202435] font-[600] text-[17px] ">
              But I must explain to you how all this mistaken idea
            </p>
            <p className="text-[#71778E] font-[500] text-[14px] mt-[6px]">
              Jan 13 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
