import { Link } from "react-router-dom";
import { Gift, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <Gift className="w-6 h-6 text-primary" />
          <span className="font-display text-xl font-semibold text-foreground">GiftLux</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/shop" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
          <Link to="/shop" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Categories</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/shop" className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <ShoppingBag className="w-4 h-4" />
            Shop Now
          </Link>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="flex flex-col gap-4 p-4">
              <Link to="/" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground">Home</Link>
              <Link to="/shop" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground">Shop</Link>
              <Link to="/shop" onClick={() => setMobileOpen(false)} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium text-center">
                Shop Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
