import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FeaturesSection from "@/components/home/FeaturesSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>CasaWood - Premium Furniture for Your Home</title>
        <meta
          name="description"
          content="Discover handcrafted furniture pieces designed to transform your home. Quality materials, timeless designs. Free delivery on orders over Rs. 50,000."
        />
      </Helmet>
      <Layout>
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <FeaturedProducts />
        <PromoBanner />
        <TestimonialsSection />
      </Layout>
    </>
  );
};

export default Index;
