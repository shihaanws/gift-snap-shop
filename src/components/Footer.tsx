import {
  Gift,
  Instagram,
  Linkedin,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import type { SVGProps } from "react";
import { Link } from "react-router-dom";

const WhatsAppIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M12 2.04c-5.477 0-9.92 4.443-9.92 9.92 0 1.743.45 3.436 1.304 4.933l-.847 3.198 3.282-.863a9.903 9.903 0 0 0 5.18 1.463c5.477 0 9.92-4.443 9.92-9.92 0-5.477-4.443-9.92-9.92-9.92zm3.972 12.254c-.154-.077-.92-.464-1.07-.513s-.293-.07-.426.106c-.132.176-.38.457-.49.583-.11.125-.209.142-.4.05-.19-.092-.79-.32-1.51-1.23-.56-.52-.92-1.13-1.01-1.32-.09-.19-.01-.28.07-.37.08-.08.18-.21.27-.31.09-.1.12-.17.17-.27.05-.1.02-.19-.01-.28-.03-.09-.31-.95-.42-1.22-.12-.31-.24-.27-.33-.28h-.28c-.09 0-.24.03-.36.17-.12.14-.46.5-.46 1.21 0 .71.52 1.4.59 1.5.07.1 1.04 1.59 2.53 2.23.35.15.63.24.85.31.36.11.7.09.96.04.29-.04.97-.38 1.11-.76.13-.38.13-.68.09-.74-.04-.07-.15-.12-.32-.18z" />
  </svg>
);

const Footer = () => {
  const socialLinks = [
    {
      label: "WhatsApp",
      href: "https://wa.me/9074145962",
      icon: WhatsAppIcon,
      className: "bg-[#25d366] text-white hover:bg-[#1ebe54]",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/redmomentskerala/",
      icon: Instagram,
      className:
        "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white hover:brightness-105",
    },
    // {
    //   label: "LinkedIn",
    //   href: "https://www.linkedin.com/",
    //   icon: Linkedin,
    //   className: "bg-[#0A66C2] text-white hover:bg-[#0955a6]",
    // },
    {
      label: "Facebook",
      href: "https://www.facebook.com/p/Red-Moments-Kochi-100063559886803/",
      icon: Facebook,
      className: "bg-[#1877F2] text-white hover:bg-[#166fe4]",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-foreground py-12 text-primary-foreground">
      <div className="pointer-events-none absolute left-0 top-0 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-5 h-5" />
              <span className="font-display text-lg font-semibold">
                Emotions Unlimited
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm max-w-xl">
              Emotions Unlimited offers premium corporate bulk gifting solutions
              at the best rates. We specialize in customized gifts tailored to
              suit your company’s brand, events, and special occasions. With a
              focus on quality, affordability, and attention to detail, we
              ensure every order meets your expectations. Our team is committed
              to providing smooth service and the earliest possible delivery for
              bulk customized orders, making corporate gifting simple,
              professional, and memorable.{" "}
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Shop</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <Link
                to="/shop"
                className="hover:text-primary-foreground transition-colors"
              >
                All Gifts
              </Link>
              <Link
                to="/shop?category=birthday"
                className="hover:text-primary-foreground transition-colors"
              >
                Birthday
              </Link>
              <Link
                to="/shop?category=wedding"
                className="hover:text-primary-foreground transition-colors"
              >
                Wedding
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Contact</h4>
            <div className="text-sm text-primary-foreground/70 space-y-3">
              <a
                href="https://wa.me/9074145962"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp: 9074145962
              </a>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5" />
                <span>kerala@redmoments.in</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <address className="not-italic">
                  Panathara Building, Kompara,
                  <br />
                  Market Road, Near Hi Court,
                  <br />
                  Ernakulam, 682018.
                </address>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5" />
                <span>Phone: 9074145962</span>
              </div>
              {/* <p>GST: 32BFRPM2545F1ZG</p> */}
              <div className="flex items-center gap-3 mt-2">
                {socialLinks.map((social) => {
                  const SocialIcon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className={`rounded-full p-2 transition ${social.className}`}
                    >
                      <SocialIcon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
          © 2026 Emotions Unlimited. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
