import { Gift, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const points = [
  {
    title: "Curated by Experts",
    description: "Every box is hand-assembled to match the moment and the recipient.",
    icon: Sparkles,
  },
  {
    title: "Secure Checkout",
    description: "Protected payments and order support from checkout to doorstep.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Delivery",
    description: "Reliable dispatch options for last-minute celebrations.",
    icon: Truck,
  },
];

const SignaturePromise = () => {
  return (
    <section id="about-us" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why Emotion Plus</p>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Signature Experience, Every Order</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-2xl border border-border bg-background p-6 shadow-lg shadow-black/5"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5">
                <point.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-primary/20 bg-gradient-to-r from-[#143255] to-[#0e2a4a] px-6 py-8 text-white shadow-2xl shadow-black/15 md:px-10">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Trusted by 8,000+ customers</p>
              <p className="mt-2 font-display text-2xl md:text-3xl">Make your next gift unforgettable.</p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-[#143255] transition hover:bg-gold-light"
            >
              <Gift className="h-4 w-4" />
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignaturePromise;
