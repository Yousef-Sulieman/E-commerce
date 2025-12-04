import React from "react";
import TopOffer from "../../components/Home/TopOffer";
import HeroSlider from "../../components/Home/HeroSlider";
import Category from "../../components/Home/Category";
import BlogSection from "../../components/Home/BlogSection";

function Home() {
  return (
    <div>
      <HeroSlider />
      <Category />
      <TopOffer />
      <BlogSection />
    </div>
  );
}

export default Home;
