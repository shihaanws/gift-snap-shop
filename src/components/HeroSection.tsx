import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-gift.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center md:text-left"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">Curated with love</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            The Art of<br />
            <span className="text-primary">Thoughtful Gifting</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto md:mx-0">
            Discover beautifully curated gift collections for every occasion. Handpicked, wrapped with care, delivered with love.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link
              to="/shop"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Explore Gifts
            </Link>
            <Link
              to="/shop"
              className="border border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View Categories
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 max-w-lg"
        >
          <img
            src={heroImage}
            alt="Luxury gift box with golden ribbon"
            className="w-full rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
