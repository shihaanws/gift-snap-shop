import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useProducts } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";

const GIFT_SETS_HOMEPAGE_IMAGE =
"https://5.imimg.com/data5/SELLER/Default/2025/9/548695791/ZK/KE/YN/226888128/customized-corporate-gift-1000x1000.jpg"

const shortNames: Record<string, string> = {
  "business-card-holders": "Card Holders",
  "desktop-lifetime-calenders": "Calendars",
  "gift-sets": "Gift Sets",
  "wooden-engravings": "Engravings",
  "personalized-gifts": "Personalized",
  "wooden-products": "Desk Decor",
  "diaries": "Diaries",
    "discounted-items": "Discounted",

};

const ALL_CATEGORY_IMAGE ="https://2.imimg.com/data2/MW/RO/MY-/4-1000x1000.jpg"
  // "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80";

const CategoryGrid = () => {
  const { products } = useProducts();
  const { categories } = useCategories();

  const categoriesWithAll = useMemo(() => {
    const hasAll = categories.some((cat) => cat.id === "all");
    if (hasAll) {
      return categories;
    }
    return [
      {
        id: "all",
        name: "All Products",
        description: "Browse every product",
        image: ALL_CATEGORY_IMAGE,
      },
      ...categories,
    ];
  }, [categories]);

  const categoryImageById = useMemo(() => {
    const map: Record<string, string> = {};
    for (const category of categoriesWithAll) {
      const match = products.find(
        (product) => product.category === category.id && product.images.length > 0
      );
      map[category.id] = match?.images[0] || category.image || ALL_CATEGORY_IMAGE;
    }
    map["discounted-items"] = "https://blog.agilenceinc.com/hubfs/stacking-discounts.png";
    map["business-card-holders"] = "https://www.zestpics.com/cdn/shop/files/Brown_BlackLeatherCardHolder_2.jpg?v=1685675929&width=3840";
    map["desktop-lifetime-calenders"] = "https://5.imimg.com/data5/SELLER/Default/2023/3/DQ/BF/FR/50809465/zahepa-lifetime-perpetual-metal-table-calendrer-500x500.jpg";
    map["badges"] = "https://badgesforafrica.co.za/wp-content/uploads/2025/04/Lapel.png";
    map["gift-sets"] = GIFT_SETS_HOMEPAGE_IMAGE;
    map["pens"] = "https://m.media-amazon.com/images/I/71pwFw7Lz5L._AC_UF1000,1000_QL80_.jpg";
    map["diaries"] = "https://cpimg.tistatic.com/06821552/b/4/2021-Multinc-LP-W-Business-Diary.jpg"
    // "https://m.media-amazon.com/images/I/71YplvYxbYL._AC_SX679_.jpg";
    map["keychains"] =
      "https://seedballs.in/cdn/shop/files/Premiummetalkeychainforpromotionalbrandingandbulkorders.png?v=1766291952";
    return map;
  }, [products, categoriesWithAll]);

  return (
    <section className="relative py-5">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      <div className="container relative mx-auto px-4">
      <div className="text-center mb-9 hidden md:block">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Explore Collections</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-1">Shop by Product Type</h2>
        <p className="text-muted-foreground text-xl">Corporate gifting essentials for bulk orders</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
        {categoriesWithAll.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              to={`/shop?category=${cat.id}`}
              className="group block relative overflow-hidden rounded-2xl border border-border/60 shadow-lg shadow-black/5 bg-white h-52 md:h-64"
            >
              <img
                src={categoryImageById[cat.id]}
                alt={cat.name}
                className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 group-hover:scale-110 md:object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center gap-1 p-3 md:p-4">
                <h3
                  className="bg-white/90 px-3 py-1 font-display text-lg md:text-2xl font-semibold text-foreground rounded-full shadow-sm leading-normal whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ maxWidth: "92%" }}
                >
                  <span className="md:hidden">
                    {shortNames[cat.id] ?? cat.name}
                  </span>
                  <span className="hidden md:inline">
                    {cat.name}
                  </span>
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
