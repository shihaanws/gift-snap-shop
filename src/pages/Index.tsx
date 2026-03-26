import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import SignaturePromise from "@/components/SignaturePromise";
import Footer from "@/components/Footer";
import FestiveCarousel from "@/components/FestiveCarousel";
import QuoteBanner from "@/components/QuoteBanner";
import ReachStats from "@/components/ReachStats";
import CatalogGallery from "@/components/CatalogGallery";
import CatalogPreviewModal from "@/components/CatalogPreviewModal";
import { catalogPdfs, type CatalogPdf } from "@/data/catalogs";

const Index = () => {
  const [activeCatalog, setActiveCatalog] = useState<CatalogPdf | null>(null);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FestiveCarousel />
      <CategoryGrid />
      <CatalogGallery
        catalogs={catalogPdfs}
        onPreview={(catalog) => setActiveCatalog(catalog)}
        className="mx-auto mb-8 max-w-6xl rounded-[32px] border border-border bg-card/70 p-6 shadow-sm"
      />
      {/* <QuoteBanner /> */}
      {/* <HeroSection /> */}
      <FeaturedProducts />
      <ReachStats />

      <SignaturePromise />
      {activeCatalog && (
        <CatalogPreviewModal
          catalog={activeCatalog}
          onClose={() => setActiveCatalog(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Index;
