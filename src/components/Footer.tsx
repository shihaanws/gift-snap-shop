import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks: {
    label: string;
    href: string;
    className: string;
    icon: string;
  }[] = [
    {
      label: "WhatsApp",
      href: "https://wa.me/9074145962",
      icon: "fab fa-whatsapp",
      className: "bg-[#25d366] text-white hover:bg-[#1ebe54]",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/redmomentskerala/",
      icon: "fab fa-instagram",
      className:
        "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white hover:brightness-105",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/p/Red-Moments-Kochi-100063559886803/",
      icon: "fab fa-facebook-f",
      className: "bg-[#1877F2] text-white hover:bg-[#166fe4]",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-foreground py-12 text-primary-foreground">
      <div className="pointer-events-none absolute left-0 top-0 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <i className="fas fa-gift text-lg"></i>
              <span className="font-display text-lg font-semibold">
                Emotions Unlimited
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm max-w-xl">
              Emotions Unlimited offers premium corporate bulk gifting solutions
              at the best rates. We specialize in customized gifts tailored to
              suit your company’s brand, events, and special occasions.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display font-semibold mb-3">Shop</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <Link to="/shop" className="hover:text-primary-foreground transition-colors">
                All Gifts
              </Link>
              <Link to="/shop?category=birthday" className="hover:text-primary-foreground transition-colors">
                Birthday
              </Link>
              <Link to="/shop?category=wedding" className="hover:text-primary-foreground transition-colors">
                Wedding
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-3">Contact</h4>
            <div className="text-sm text-primary-foreground/70 space-y-3">
              
              <a
                href="https://wa.me/9074145962"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <i className="fab fa-whatsapp text-base"></i>
                WhatsApp: 9074145962
              </a>

              <div className="flex items-start gap-2">
                <i className="fas fa-envelope text-base mt-0.5"></i>
                <span>kerala@redmoments.in</span>
              </div>

              <div className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt text-base mt-0.5"></i>
                <address className="not-italic">
                  Panathara Building, Kompara,
                  <br />
                  Market Road, Near High Court,
                  <br />
                  Ernakulam, 682018.
                </address>
              </div>

              <div className="flex items-start gap-2">
                <i className="fas fa-phone text-base mt-0.5"></i>
                <span>Phone: 9074145962</span>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3 mt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition transform hover:scale-110 ${social.className}`}
                  >
                    <i className={`${social.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
          © 2026 Emotions Unlimited. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;