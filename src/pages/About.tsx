import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden bg-[#f8f3eb] py-16 md:py-20">
        <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-gold-light/40 blur-3xl" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl rounded-3xl border border-border/70 bg-card/90 p-8 shadow-xl shadow-black/10 md:p-12"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">About Us</p>
            <h1 className="font-display text-3xl font-bold text-foreground md:text-5xl">
              We Build Corporate Gifting Experiences
            </h1>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                This is dummy content for the About page. Emotion Plus helps companies create thoughtful gifting
                experiences for employees, clients, partners, and events.
              </p>
              <p>
                From product selection to customization and PAN India shipping, our team supports end-to-end execution
                for bulk orders and branded campaigns.
              </p>
              <p>
                We are focused on quality, timely delivery, and long-term business relationships. You can replace this
                section with your final brand story, mission, values, and timeline.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-background p-5">
              <h2 className="font-display text-xl font-semibold text-foreground">Dummy Highlights</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Corporate gifting strategy and planning</li>
                <li>Custom branding and packaging support</li>
                <li>Bulk order handling with reliable logistics</li>
                <li>Dedicated support for campaigns and events</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
