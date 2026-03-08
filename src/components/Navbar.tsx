import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, DownloadIcon, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
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

const subNavItems = [
  {
    label: "Gift Sets",
    groups: [
      { title: "Giftset Types", items: ["2 in 1 Gift Set", "3 in 1 Gift Set", "4 in 1 Gift Set", "5 in 1 Gift Set", "6 in 1 Gift Set"] },
      { title: "Festival Packs", items: ["Diwali Deluxe", "New Year Pack", "Onam Hamper", "Holiday Box"] },
      { title: "Joining Kits", items: ["Starter Kit", "Welcome Box", "Employee Delight", "Team Bundle"] },
    ],
  },
  {
    label: "Bags & Travel",
    groups: [
      { title: "Laptop Bags", items: ["15 inch Series", "Slim Pro", "Messenger Classic", "Urban Executive"] },
      { title: "Backpacks", items: ["Commute Pack", "Travel Pack", "Hybrid Office", "Rolltop Utility"] },
      { title: "Accessories", items: ["Pouch Set", "Organizer Kit", "Cable Holder", "Passport Sleeve"] },
    ],
  },
  {
    label: "Drinkware",
    groups: [
      { title: "Bottles", items: ["Steel 750ml", "Copper Edition", "Thermal Flask", "Smart Bottle"] },
      { title: "Mugs", items: ["Travel Mug", "Ceramic Mug", "Vacuum Tumbler", "Sipper Cup"] },
      { title: "Branding", items: ["Laser Engraving", "UV Print", "Custom Sleeve", "Gift Box Pack"] },
    ],
  },
  {
    label: "Office Essentials",
    groups: [
      { title: "Diaries", items: ["A5 Planner", "Undated Journal", "Hardbound Pro", "Pocket Notes"] },
      { title: "Pens", items: ["Metal Pen", "Roller Pen", "Signature Set", "Stylus Pen"] },
      { title: "Desk", items: ["Clock Stand", "Pen Holder", "Table Organizer", "Desk Utility"] },
    ],
  },
  {
    label: "Tech Gifts",
    groups: [
      { title: "Charging", items: ["Wireless Pad", "Power Bank", "Cable Kit", "Multi Charger"] },
      { title: "Audio", items: ["Mini Speaker", "Earbuds Case", "Bluetooth Pod", "Sound Bar Mini"] },
      { title: "Utility", items: ["USB Hub", "Card Reader", "Smart Stand", "Mouse Pad Pro"] },
    ],
  },
  {
    label: "By Occasion",
    groups: [
      { title: "Celebration", items: ["Anniversary Gifts", "Reward Packs", "Milestone Box", "Team Festive"] },
      { title: "Campaigns", items: ["Conference Kit", "Expo Swag", "Sales Gifting", "Partner Box"] },
      { title: "Custom", items: ["MOQ Packs", "Brand Collection", "Event Bundle", "Combo Builder"] },
    ],
  },
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
  const [openSubNav, setOpenSubNav] = useState<string | null>(null);
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-[white]/95 backdrop-blur-md">
        <div className="border-b border-white/10 bg-primary">
        <div className="container mx-auto flex h-9 items-center justify-between px-4 text-xs text-white/80">
          <p className="hidden sm:block">Bulk corporate gifting for teams, clients, and events</p>
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
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2">
          {/* <img src="/logg.png" alt="Emotion Plus" className="mb-2.5 h-8 w-18" /> */}
          <img src="/EMOTIONS.png" alt="Emotion Plus" className="h-16 w-auto my-6" />
        </Link>

        <div className="hidden md:flex items-center gap-5 flex-1 ml-8 min-w-0">
        
          {/* <NavLink
            to="/shop"
            className="whitespace-nowrap text-sm font-medium text-white/85 transition-colors hover:text-white"
            activeClassName="text-white"
          >
            Corporate Catalog
          </NavLink> */}
          <NavLink
            to="/about"
            className="whitespace-nowrap text-sm font-medium text-foreground transition-colors hover:text-primary"
            activeClassName="text-primary"
          >
            About Us
          </NavLink>
          <NavLink
            to="/manage-products"
            className="whitespace-nowrap text-sm font-medium text-foreground transition-colors hover:text-primary"
            activeClassName="text-primary"
          >
            Manage Products
          </NavLink>
          
          <div className="ml-auto hidden lg:block w-full max-w-[280px] xl:max-w-sm mr-4">
            <SearchBar />
          </div>
        </div>

        <div className="flex items-center gap-3">
        

          <Link to="/shop?category=corporate" className="hidden xl:flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            <DownloadIcon className="w-4 h-4" />
            Download Brochure 
          </Link>

            {!isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-lg border border-white/30 px-3 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-[#0E2A4A]"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-[#0E2A4A] transition hover:opacity-90"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="hidden md:inline-flex items-center rounded-full border border-white/40 bg-white p-0.5 text-[#0E2A4A] transition hover:opacity-90"
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
                <DropdownMenuLabel className="truncate">{user?.name ?? "User"}</DropdownMenuLabel>
                {user?.email && <DropdownMenuLabel className="pt-0 text-xs font-normal text-muted-foreground">{user.email}</DropdownMenuLabel>}
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
            className="relative hidden md:inline-flex items-center justify-center rounded-lg border border-white/40 bg-white px-3 py-2 text-sm font-medium text-[#0E2A4A] transition hover:opacity-90"
            aria-label="View cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="text-white md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className="relative hidden border-t border-border bg-white shadow-sm md:block"
        onMouseLeave={() => setOpenSubNav(null)}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-11 items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none">
            {subNavItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onMouseEnter={() => setOpenSubNav(item.label)}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
                  openSubNav === item.label ? "text-[#0E2A4A]" : "text-[#0E2A4A]/75 hover:text-[#0E2A4A]"
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
              className="absolute left-0 right-0 top-full z-[70] border-t border-border bg-white shadow-lg"
            >
              <div className="container mx-auto grid gap-6 px-4 py-5 md:grid-cols-3">
                {subNavItems
                  .find((item) => item.label === openSubNav)
                  ?.groups.map((group) => (
                    <div key={group.title}>
                      <p className="mb-2 text-sm font-semibold text-foreground">{group.title}</p>
                      <div className="space-y-0.5">
                        {group.items.map((entry) => (
                          <Link
                            key={entry}
                            to="/shop"
                            className="block py-0.5 text-sm leading-tight text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {entry}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
                <Link to="/about" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-white">About Us</Link>
                <Link to="/manage-products" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-white">Manage Products</Link>
                <Link to="/cart" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-white">
                  Cart ({itemCount})
                </Link>
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
                <div className="rounded-lg border border-white/15 p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/70">Sub Categories</p>
                  <div className="grid grid-cols-2 gap-2">
                    {subNavItems.map((item) => (
                      <Link
                        key={item.label}
                        to="/shop"
                        onClick={() => setMobileOpen(false)}
                        className="rounded-md bg-white/10 px-2 py-1.5 text-xs font-medium text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link to="/shop?category=corporate" onClick={() => setMobileOpen(false)} className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground">
                  Request Bulk Quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* <FestiveCarousel /> */}
    </>
  );
};

export default Navbar;
