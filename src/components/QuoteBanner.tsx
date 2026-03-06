import { motion } from "framer-motion";
import quoteImage from "@/assets/gift-anniversary.jpg";

const QuoteBanner = () => {
  return (
    <section className="relative py-14">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl shadow-black/10"
        >
          <div className="relative h-[220px] md:h-[320px]">
            <img
              src={quoteImage}
              alt="Thoughtful gift arrangement for meaningful occasions"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A4A]/80 via-[#0E2A4A]/30 to-transparent" />
          </div>

          <div className="bg-[#0E2A4A] px-6 py-8 text-center text-white md:px-10 md:py-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Signature Gifting
            </p>
            <h2 className="font-display text-2xl font-bold md:text-4xl">
              Thoughtful Gifts, Unforgettable Moments
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-white/85 md:text-base">
              Discover how we add a personal touch to every occasion, turning gifts into unforgettable memories.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteBanner;

