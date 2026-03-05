import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/products";

const CategoryGrid = () => {
  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      <div className="container relative mx-auto px-4">
      <div className="text-center mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Explore Collections</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Shop by Product Type</h2>
        <p className="text-muted-foreground text-lg">Corporate gifting essentials for bulk orders</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              to={`/shop?category=${cat.id}`}
              className="group block relative overflow-hidden rounded-2xl border border-border/60 shadow-lg shadow-black/5"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="aspect-square h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="font-display text-lg md:text-xl font-semibold text-primary-foreground">{cat.name}</h3>
                <p className="text-sm text-primary-foreground/80 hidden md:block">{cat.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
