import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AboutHeroSection from "@/components/about/herosection";
import StorySection from "@/components/about/storysection";
import MissionSection from "@/components/about/missionsection";
import FeaturesSection from "@/components/about/featuressection";
import ValuesSection from "@/components/about/valuessection";
import AboutCTASection from "@/components/about/ctasection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handcrafted Haven | About",
  description:
    "Learn about Handcrafted Haven, our mission to support artisans, and how we connect handmade creators with conscious shoppers.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHeroSection />
        <StorySection />
        <MissionSection />
        <FeaturesSection />
        <ValuesSection />
        <AboutCTASection />
      </main>
      <Footer />
    </>
  );
}