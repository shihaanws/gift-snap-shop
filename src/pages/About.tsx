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
            className="mx-auto max-w-4xl rounded-3xl border border-border/70 bg-white p-8 shadow-xl shadow-black/10 md:p-12"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">About Us</p>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-5xl">
                Emotions Unlimited
              </h1>
              <p className="mt-2 text-xs uppercase tracking-[0.4em] text-muted-foreground md:text-sm">
                Corporate gifting specialists
              </p>
            </div>

            <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                Emotions Unlimited offers premium corporate bulk gifting solutions at the best rates. We specialize in
                customized gifts tailored to suit your company’s brand, events, and special occasions. With a focus on
                quality, affordability, and attention to detail, we ensure every order meets your expectations. Our team
                is committed to providing smooth service and the earliest possible delivery for bulk customized orders,
                making corporate gifting simple, professional, and memorable.
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <img
                src="https://scontent.ftrv5-1.fna.fbcdn.net/v/t39.30808-6/486573237_1063603435804595_2621018687506638908_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=L1jCbDD0MgoQ7kNvwGEf_qa&_nc_oc=AdlGBYbgXyRx_QJtFS74p_c1qLUkB9Hslo0DEhC4vsLVAwnRNcf9D2FQsz_MWrryZjI&_nc_zt=23&_nc_ht=scontent.ftrv5-1.fna&_nc_gid=duRVECSvteN721TKjr6OJQ&_nc_ss=8&oh=00_AfxUaNLiEvc1PMZHoHJRVH3hQBnWrqImrK287SOPnEH14g&oe=69B786E1"
                alt="Red Moments logo"
                className="h-32 w-auto object-contain"
              />
            </div>

            <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                Red Moments is India’s leading personalised gift manufacturer. Since its inception in 1998, Red Moments
                has been redefining the tradition of gift giving. Today the brand operates multiple business models,
                including Franchise System, Shop-in-Shop (SIS), Red Moments Prime, and the production and distribution of
                sublimation machines. Our vision is to radically change the gifting industry through personalisation.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-background p-5">
              <h2 className="font-display text-xl font-semibold text-foreground">What We Deliver</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>End-to-end corporate gifting strategy and campaign support</li>
                <li>Personalized products with custom branding and packaging</li>
                <li>Efficient PAN India logistics for bulk and planned orders</li>
                <li>Dedicated client success for events, launches, and employee rewards</li>
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
