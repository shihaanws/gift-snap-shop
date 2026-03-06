import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import SignaturePromise from "@/components/SignaturePromise";
import Footer from "@/components/Footer";
import FestiveCarousel from "@/components/FestiveCarousel";
import QuoteBanner from "@/components/QuoteBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* <FestiveCarousel /> */}
      <CategoryGrid />
      {/* <QuoteBanner /> */}
      {/* <HeroSection /> */}
      <FeaturedProducts />
      <SignaturePromise />
      <Footer />
    </div>
  );
};

export default Index;
