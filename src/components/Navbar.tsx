import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Menu,
  X,
  DownloadIcon,
  ChevronDown,
  LogOut,
  Search as SearchIcon,
} from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import FestiveCarousel from "./FestiveCarousel";
import { NavLink } from "./NavLink";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function linkForEntry(entry: string, parentLabel: string) {
  const bundleMatch = entry.match(/(\d)\s*in\s*1/i);
  if (parentLabel.toLowerCase().includes("gift") && bundleMatch) {
    const size = bundleMatch[1];
    return `/shop?category=gift-sets&bundle=${size}`;
  }
  if (parentLabel.toLowerCase().includes("keychain")) {
    const styleSlug = slugify(entry).replace(/-keychains$/, "");
    return `/shop?category=keychains${styleSlug ? `&style=${styleSlug}` : ""}`;
  }
  if (parentLabel.toLowerCase().includes("wooden")) {
    return `/shop?category=wooden-products`;
  }
  if (parentLabel.toLowerCase().includes("pen")) {
    return `/shop?category=pens`;
  }
  // fallback: use entry as category slug
  return `/shop?category=${slugify(entry)}`;
}

const subNavItems = [
  {
    label: "Gift Sets",
    groups: [
      {
        title: "Giftset Types",
        items: [
          "2 in 1 Gift Set",
          "3 in 1 Gift Set",
          "4 in 1 Gift Set",
          "5 in 1 Gift Set",
          "6 in 1 Gift Set",
        ],
      },
      // { title: "Festival Packs", items: ["Diwali Deluxe", "New Year Pack", "Onam Hamper", "Holiday Box"] },
      // { title: "Joining Kits", items: ["Starter Kit", "Welcome Box", "Employee Delight", "Team Bundle"] },
    ],
  },
  {
    label: "Keychains",
    groups: [
      {
        title: "Keychain Styles",
        items: ["Wooden Keychains", "Metal Keychains"],
      },
    ],
  },
  {
    label: "Pens",
    groups: [{ title: "Pen Styles", items: ["Laser Marking Pens"] }],
  },
  {
    label: "Badges",
    groups: [
      {
        title: "Badges",
        items: ["Badges"],
      },
    ],
  },
  {
    label: "Wooden Products",
    groups: [
      {
        title: "Wooden Gifts",
        items: ["Wooden Desk Accessories", "Wooden Engravings"],
      },
    ],
  },
  {
    label: "Personalized Gifts",
    groups: [
      {
        title: "Personalized Gifts",
        items: ["Personalized Gifts"],
      },
    ],
  },
  // {
  //   label: "Drinkware",
  //   groups: [
  //     { title: "Bottles", items: ["Steel 750ml", "Copper Edition", "Thermal Flask", "Smart Bottle"] },
  //     { title: "Mugs", items: ["Travel Mug", "Ceramic Mug", "Vacuum Tumbler", "Sipper Cup"] },
  //     { title: "Branding", items: ["Laser Engraving", "UV Print", "Custom Sleeve", "Gift Box Pack"] },
  //   ],
  // },
  // {
  //   label: "Office Essentials",
  //   groups: [
  //     { title: "Diaries", items: ["A5 Planner", "Undated Journal", "Hardbound Pro", "Pocket Notes"] },
  //     { title: "Pens", items: ["Metal Pen", "Roller Pen", "Signature Set", "Stylus Pen"] },
  //     { title: "Desk", items: ["Clock Stand", "Pen Holder", "Table Organizer", "Desk Utility"] },
  //   ],
  // },
  // {
  //   label: "Tech Gifts",
  //   groups: [
  //     { title: "Charging", items: ["Wireless Pad", "Power Bank", "Cable Kit", "Multi Charger"] },
  //     { title: "Audio", items: ["Mini Speaker", "Earbuds Case", "Bluetooth Pod", "Sound Bar Mini"] },
  //     { title: "Utility", items: ["USB Hub", "Card Reader", "Smart Stand", "Mouse Pad Pro"] },
  //   ],
  // },
  // {
  //   label: "By Occasion",
  //   groups: [
  //     { title: "Celebration", items: ["Anniversary Gifts", "Reward Packs", "Milestone Box", "Team Festive"] },
  //     { title: "Campaigns", items: ["Conference Kit", "Expo Swag", "Sales Gifting", "Partner Box"] },
  //     { title: "Custom", items: ["MOQ Packs", "Brand Collection", "Event Bundle", "Combo Builder"] },
  //   ],
  // },
];

function getInitials(name?: string) {
  if (!name) {
    return "U";
  }
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "U";
  }
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return `${first}${second}`.toUpperCase();
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [openSubNav, setOpenSubNav] = useState<string | null>(null);
  const [subNavOffset, setSubNavOffset] = useState(0);
  const subNavBarRef = useRef<HTMLDivElement>(null);
  const subNavWrapperRef = useRef<HTMLDivElement>(null);
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-[white]/95 backdrop-blur-md">
        <div className="border-b border-white/10 bg-primary">
          <div className="container mx-auto flex h-9 items-center justify-between px-4 text-xs text-white/80">
            <p className="hidden sm:block">
              Bulk corporate gifting for teams, clients, and events
            </p>
            <a
              href="https://wa.me/9074145962"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-gold-light transition hover:text-white"
            >
              WhatsApp for bulk quote
            </a>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:hidden">
            <button
              className="text-foreground hover:text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <Link to="/" className="flex items-center justify-center">
              <img
                src="/EMOTIONS.png"
                alt="Emotions Unlimited"
                className="h-12 w-auto"
              />
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileSearchOpen(true)}
                aria-label="Search products"
                className="rounded-full border border-white/40 bg-white/80 p-2 text-[#0E2A4A] transition hover:opacity-90"
              >
                <SearchIcon className="h-4 w-4" />
              </button>
              <Link
                to="/cart"
                className="relative inline-flex items-center justify-center rounded-full border border-white/40 bg-white/80 p-2 text-[#0E2A4A] transition hover:opacity-90"
                aria-label="View cart"
              >
                <ShoppingBag className="h-4 w-4" />
                {itemCount > 0 && (
                  <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-primary px-1 py-0.5 text-[10px] font-semibold text-primary-foreground">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/EMOTIONS.png"
                alt="Emotions Unlimited"
                className="h-16 w-auto my-6"
              />
            </Link>
            <div className="flex items-center gap-5 flex-1 ml-8 min-w-0">
              <NavLink
                to="/about"
                className="whitespace-nowrap text-sm font-medium text-foreground transition-colors hover:text-primary"
                activeClassName="text-primary"
              >
                About Us
              </NavLink>
              {/* <NavLink
              to="/manage-products"
              className="whitespace-nowrap text-sm font-medium text-foreground transition-colors hover:text-primary"
              activeClassName="text-primary"
            >
              Manage Products
            </NavLink> */}
              <div className="ml-auto hidden lg:block w-full max-w-[280px] xl:max-w-sm mr-4">
                <SearchBar />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* <Link to="/shop?category=corporate" className="hidden xl:flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
              <DownloadIcon className="w-4 h-4" />
              Download Brochure
            </Link> */}
              {!isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="rounded-lg border border-primary/50 px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/20"
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full border border-white/40 bg-white p-0.5 text-[#0E2A4A] transition hover:opacity-90"
                      aria-label="Open user menu"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-[#0E2A4A] text-xs font-semibold text-white">
                          {getInitials(user?.name)}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="truncate">
                      {user?.name ?? "User"}
                    </DropdownMenuLabel>
                    {user?.email && (
                      <DropdownMenuLabel className="pt-0 text-xs font-normal text-muted-foreground">
                        {user.email}
                      </DropdownMenuLabel>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        void logout();
                      }}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <Link
                to="/cart"
                className="relative inline-flex items-center justify-center rounded-lg border border-white/40 bg-white px-3 py-2 text-sm font-medium text-[#0E2A4A] transition hover:opacity-90"
                aria-label="View cart"
              >
                <ShoppingBag className="h-4 w-4" />
                {itemCount > 0 && (
                  <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={subNavWrapperRef}
          className="relative hidden border-t border-border bg-white shadow-sm md:block"
          onMouseLeave={() => setOpenSubNav(null)}
        >
          <div className="container mx-auto px-4">
            <div
              ref={subNavBarRef}
              className="flex h-11 items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none"
            >
              {subNavItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onMouseEnter={(e) => {
                    const rect = (
                      e.currentTarget as HTMLElement
                    ).getBoundingClientRect();
                    const wrapper =
                      subNavWrapperRef.current?.getBoundingClientRect();
                    const wrapperLeft = wrapper?.left ?? 0;
                    const buttonCenter = rect.left + rect.width / 2;
                    setSubNavOffset(buttonCenter - wrapperLeft);
                    setOpenSubNav(item.label);
                  }}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
                    openSubNav === item.label
                      ? "text-[#0E2A4A]"
                      : "text-[#0E2A4A]/75 hover:text-[#0E2A4A]"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {openSubNav && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full z-[70]"
                style={{
                  left: `${subNavOffset - 80}px`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="border border-border bg-white shadow-lg rounded-b-xl">
                  <div
                    className={`grid gap-6 px-6 py-5 ${
                      openSubNav === "Gift Sets"
                        ? "grid-cols-1 min-w-[200px]"
                        : openSubNav === "Keychains"
                          ? "grid-cols-1 min-w-[320px]"
                          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 min-w-[480px]"
                    }`}
                  >
                    {subNavItems
                      .find((item) => item.label === openSubNav)
                      ?.groups.map((group) => (
                        <div key={group.title}>
                          <p className="mb-2 text-sm font-semibold text-foreground">
                            {group.title}
                          </p>
                          <div className="space-y-0.5">
                            {group.items.map((entry) => {
                              const target = linkForEntry(
                                entry,
                                openSubNav ?? "",
                              );
                              return (
                                <Link
                                  key={entry}
                                  to={target}
                                  className="block py-0.5 text-sm leading-tight text-muted-foreground transition-colors hover:text-foreground"
                                >
                                  {entry}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="mobile-panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-[80vw] max-w-sm overflow-y-auto border-r border-white/20 bg-[#0E2A4A] p-5 md:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-white">Menu</p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-white/20 p-2 text-white transition hover:border-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <SearchBar />
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  onClick={() => setMobileOpen(false)}
                  to="/"
                  className="text-sm font-medium text-white"
                >
                  Home
                </Link>
                {/* <Link
                  onClick={() => setMobileOpen(false)}
                  to="/shop?category=corporate"
                  className="text-sm font-medium text-white"
                >
                  Bulk Solutions
                </Link> */}
                <Link
                  onClick={() => setMobileOpen(false)}
                  to="/shop"
                  className="text-sm font-medium text-white"
                >
                  Catalog
                </Link>
                <Link
                  onClick={() => setMobileOpen(false)}
                  to="/about"
                  className="text-sm font-medium text-white"
                >
                  About Us
                </Link>
                {/* <Link onClick={() => setMobileOpen(false)} to="/manage-products" className="text-sm font-medium text-white">
                  Manage Products
                </Link> */}
                <Link
                  onClick={() => setMobileOpen(false)}
                  to="/cart"
                  className="text-sm font-medium text-white"
                >
                  Cart ({itemCount})
                </Link>
              </div>
              <div className="mt-5">
                {!isAuthenticated ? (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg border border-white/20 px-3 py-2 text-center text-sm font-medium text-white"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg bg-white px-3 py-2 text-center text-sm font-medium text-[#0E2A4A]"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      void logout();
                      setMobileOpen(false);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm font-medium text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout {user?.name ? `(${user.name})` : ""}
                  </button>
                )}
              </div>
              <div className="mt-6 rounded-lg border border-white/15 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/70">
                  Categories
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {subNavItems.map((item) => (
                    <Link
                      key={item.label}
                      to={
                        item.label.toLowerCase().includes("gift")
                          ? "/shop?category=gift-sets"
                          : `/shop?category=${slugify(item.label)}`
                      }
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md bg-white/10 px-2 py-1.5 text-xs font-medium text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="https://wa.me/9074145962"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-5 block w-full rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
              >
                Request Bulk Quote
              </Link>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileSearchOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative mx-auto mt-10 flex w-full max-w-lg items-start justify-center px-4"
            >
              <div
                className="w-full rounded-2xl border border-border bg-white p-6 shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-lg font-semibold text-foreground">
                    Search products
                  </p>
                  <button
                    type="button"
                    onClick={() => setMobileSearchOpen(false)}
                    aria-label="Close search"
                    className="rounded-full p-2 text-muted-foreground transition hover:bg-secondary"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <SearchBar onSelect={() => setMobileSearchOpen(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* <FestiveCarousel /> */}
    </>
  );
};

export default Navbar;
