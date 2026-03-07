import { motion } from "framer-motion";

const stats = [
  { label: "Diverse Products", value: "1,000+" },
  { label: "Gifts Delivered", value: "1M+" },
  { label: "Customized Products", value: "500K" },
  { label: "Happy Clients", value: "350K" },
  { label: "PAN India Deliveries", value: "19" },
];

const ReachStats = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Milestones</p>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">We Reached So Far</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <p className="font-display text-3xl font-bold text-primary">{item.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReachStats;
