import { motion } from "framer-motion";
import { Gift, Package, Sparkles } from "lucide-react";

type GiftLoaderProps = {
  message?: string;
};

const icons = [Gift, Package, Sparkles];

const giftVariants = {
  animate: (custom: number) => ({
    y: [0, -14, 0],
    rotate: custom % 2 === 0 ? [0, 14, 0] : [0, -14, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.3,
      repeat: Infinity,
      repeatType: "loop",
      delay: custom * 0.2,
      ease: "easeInOut",
    },
  }),
};

const GiftLoader = ({ message = "Wrapping up your curated gifts..." }: GiftLoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-14">
      <div className="flex items-end gap-5">
        {[0, 1, 2].map((index) => {
          const IconComponent = icons[index % icons.length];
          return (
            <motion.div
              key={`gift-${index}`}
              custom={index}
              variants={giftVariants}
              initial={{ y: 0, rotate: 0, scale: 1 }}
              animate="animate"
            >
              <IconComponent className="h-12 w-12 text-primary drop-shadow-lg" />
              <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-gradient-to-r from-primary/70 to-primary/10" />
            </motion.div>
          );
        })}
      </div>
      <p className="max-w-xs text-center text-sm font-medium text-muted-foreground">
        {message}
      </p>
    </div>
  );
};

export default GiftLoader;
