import { Link } from "react-router-dom";
import { Building2, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import { NavLink } from "./NavLink";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-[#0E2A4A]/95 backdrop-blur-md">
      <div className="border-b border-white/10 bg-[#0B223D]">
        <div className="container mx-auto flex h-9 items-center justify-between px-4 text-xs text-white/80">
          <p className="hidden sm:block">Bulk corporate gifting for teams, clients, and events</p>
          <a
            href="https://wa.me/7598089483"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-gold-light transition hover:text-white"
          >
            WhatsApp for bulk quote
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logg.png" alt="Emotion Plus" className="mb-2.5 h-8 w-18" />
          <img src="/epp1.png" alt="Emotion Plus" className="h-8 w-18" />
        </Link>

        <div className="hidden md:flex items-center gap-6 flex-1 ml-8">
          <NavLink
            to="/"
            className="whitespace-nowrap text-sm font-medium text-white/85 transition-colors hover:text-white"
            activeClassName="text-white"
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className="whitespace-nowrap text-sm font-medium text-white/85 transition-colors hover:text-white"
            activeClassName="text-white"
          >
            Corporate Catalog
          </NavLink>
          <NavLink
            to="/manage-products"
            className="whitespace-nowrap text-sm font-medium text-white/85 transition-colors hover:text-white"
            activeClassName="text-white"
          >
            Manage Products
          </NavLink>
          <Link to="/shop?category=corporate" className="whitespace-nowrap text-sm font-medium text-white/85 transition-colors hover:text-white">
            Bulk Solutions
          </Link>
          <SearchBar />
        </div>

        <div className="flex items-center gap-3">
          <Link to="/shop?category=corporate" className="hidden md:flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            <Building2 className="w-4 h-4" />
            Bulk Orders
          </Link>
          <Link to="/shop" className="hidden lg:flex items-center gap-2 rounded-lg border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-[#0E2A4A]">
            <ShoppingBag className="w-4 h-4" />
            Shop Gifts
          </Link>
          <button className="text-white md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
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
            className="overflow-hidden border-t border-white/15 bg-[#0E2A4A] md:hidden"
          >
            <div className="flex flex-col gap-4 p-4">
              <SearchBar />
              <Link to="/" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-white">Home</Link>
              <Link to="/shop?category=corporate" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-white">Bulk Solutions</Link>
              <Link to="/shop" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-white">Catalog</Link>
              <Link to="/manage-products" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-white">Manage Products</Link>
              <Link to="/shop?category=corporate" onClick={() => setMobileOpen(false)} className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground">
                Request Bulk Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
