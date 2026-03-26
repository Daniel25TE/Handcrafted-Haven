import HeroSection from "@/components/home/herosection";
import FeaturedProducts from "@/components/home/featuredproducts";
import CategoriesSection from "@/components/home/categoriessection";
import AboutSection from "@/components/home/aboutsection";
import CTASection from "@/components/home/ctasection";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Handcrafted Haven | Home",
  description:
    "Discover unique handmade products, explore artisan stories, and support creative makers at Handcrafted Haven.",
};

export default function HomePage() {
  return (
    <>
      
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <AboutSection />
      <CTASection />
    </>
  );
}