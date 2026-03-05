import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import heroImage from "@/assets/gift-corporate.jpg";

const HeroSection = () => {
  const quickHighlights = [
    { label: "4.9/5 From Corporate Clients", icon: Star },
    { label: "Custom Branding & Packaging", icon: Sparkles },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#f8f3eb]">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-rose-light/70 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-gold-light/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto flex flex-col items-center gap-12 px-4 py-16 md:py-24 lg:flex-row lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="z-10 flex-1 text-center md:text-left"
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/75 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Corporate gifting partner
          </p>
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
            Premium Corporate Gifts
            <br />
            <span className="text-primary">and Mementos</span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground md:mx-0">
            Impress teams, clients, and partners with curated premium gifting experiences.
            We handle customization, branding, and delivery across locations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:opacity-95"
            >
              Request Bulk Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/shop"
              className="rounded-lg border border-primary/40 bg-background/70 px-8 py-3 font-medium text-primary backdrop-blur-sm transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              View Corporate Catalog
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            {quickHighlights.map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-4 py-2 text-sm text-foreground backdrop-blur-sm"
              >
                <item.icon className="h-4 w-4 text-primary" />
                {item.label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 flex-1 max-w-lg"
        >
          <div className="absolute -right-5 -top-5 h-full w-full rounded-[2rem] border border-primary/20 bg-primary/10" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/30 shadow-2xl shadow-black/20">
            <img
              src={heroImage}
              alt="Corporate gifting hampers arranged for client and employee gifting"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute -bottom-6 left-6 rounded-xl border border-border/80 bg-background/90 px-4 py-3 shadow-lg backdrop-blur-md"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Recent Campaign</p>
            <p className="font-display text-xl text-foreground">1,200 Kits Delivered</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
