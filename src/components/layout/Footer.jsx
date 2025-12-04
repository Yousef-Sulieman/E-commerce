import React from "react";
import coupon from "../../assets/coupon.png.png";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentLine } from "react-icons/ri";
import { MdOutlinePriceChange } from "react-icons/md";

const FeatureItem = ({ icon, text }) => (
  <div className="flex items-center space-x-2 p-2">
    <span className="text-2xl font-sm text-gray-800">{icon}</span>
    <p className="text-sm font-sm">{text}</p>
  </div>
);

const LinkGroup = ({ title, links }) => (
  <div>
    <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
    <ul className="space-y-2 text-gray-500">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href="#"
            className="hover:text-teal-500 transition duration-150 text-sm"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

function Footer() {
  return (
    <footer className="bg-white pt-0 mt-8">
      {/* Top Promo Bar */}
      <div className="bg-primary text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <div className="flex flex-col gap-8 md:w-3/5 lg:w-1/2 z-10">
            <div className="mb-6 md:mb-0">
              <h3 className="font-[300] text-base leading-5 my-auto">
                <span className="underline">$20 discount</span> for your first
                order
              </h3>
              <h1 className="font-[600] text-[26px] leading-[31px] my-auto">
                Join our newsletter and get...
              </h1>
              <p className="my-auto w-full md:w-3/4 font-[400] opacity-50">
                Email subscription now to get updates on promotions and coupons.
              </p>
            </div>
            <div className="flex w-full max-w-lg md:max-w-md bg-amber-50 rounded-md">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="flex-grow p-4 rounded-l-full text-gray-800 focus:outline-none bg-white"
              />
              <button className="bg-teal-700 hover:bg-teal-800 text-white font-semibold m-1 py-4 px-5 rounded-md transition duration-300 cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>

          <div className="w-full flex justify-end md:absolute md:-bottom-15 md:right-40 md:h-full md:w-auto mt-4 md:mt-0 ">
            <img src={coupon} alt="coupon" className="w-auto h-[300px]" />
          </div>
        </div>
      </div>

      <div className="bg-[#F7F8FD] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          {/* Features Bar */}
          <div className="border-b border-gray-300 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 tetx">
            <FeatureItem
              icon={<MdProductionQuantityLimits />}
              text="Everyday fresh products"
            />
            <FeatureItem
              icon={<TbTruckDelivery />}
              text="Free delivery for order over $70"
            />

            <FeatureItem
              icon={<RiDiscountPercentLine />}
              text="Daily Mega Discounts"
            />
            <FeatureItem
              icon={<MdOutlinePriceChange />}
              text="Best price on the market"
            />
          </div>

          {/* Main Navigation/Categories) */}
          <div className="py-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            <LinkGroup
              title="Fruit & Vegetables"
              links={[
                "Fresh Vegetables",
                "Herbs & Seasonings",
                "Cuts & Sprouts",
                "Packaged Produce",
              ]}
            />
            <LinkGroup
              title="Breakfast & Dairy"
              links={[
                "Milk & Flavoured Milk",
                "Butter and Margarine",
                "Cheese",
                "Yogurt",
              ]}
            />

            <LinkGroup
              title="Meat & Seafood"
              links={[
                "Breakfast Sausage",
                "Dinner Sausage",
                "Beef",
                "Shrimp",
                "Wild Caught Fillets",
              ]}
            />
            <LinkGroup
              title="Beverages"
              links={["Sparkling Water", "Coffee", "Tea & Kombucha", "Wine"]}
            />
            <LinkGroup
              title="Breads & Bakery"
              links={["Milk & Flavoured Milk", "Honey", "Marmalades", "Yogurt"]}
            />
          </div>
        </div>
      </div>
      <div className="bg-[#F7F8FD] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
