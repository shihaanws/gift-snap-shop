import { Gift } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-foreground py-12 text-primary-foreground">
      <div className="pointer-events-none absolute left-0 top-0 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-5 h-5" />
              <span className="font-display text-lg font-semibold">Emotion Plus</span>
            </div>
            <p className="text-primary-foreground/70 text-sm max-w-xs">
              Curated gifts for every occasion. Handpicked with love, delivered with care.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <h4 className="font-display font-semibold mb-3">Shop</h4>
              <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
                <Link to="/shop" className="hover:text-primary-foreground transition-colors">All Gifts</Link>
                <Link to="/shop?category=birthday" className="hover:text-primary-foreground transition-colors">Birthday</Link>
                <Link to="/shop?category=wedding" className="hover:text-primary-foreground transition-colors">Wedding</Link>
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">Contact</h4>
              <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
                <a href="https://wa.me/7598089483" target="_blank" rel="noreferrer" className="hover:text-primary-foreground transition-colors">WhatsApp</a>
                <span>hello@emotionplus.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
          © 2026 Emotion Plus. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
