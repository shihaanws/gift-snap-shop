import giftCorporate from "@/assets/gift-corporate.jpg";
import giftThankyou from "@/assets/gift-thankyou.jpg";
import giftWedding from "@/assets/gift-wedding.jpg";
import productCandle from "@/assets/product-candle.jpg";
import productChocolate from "@/assets/product-chocolate.jpg";
import productFlowers from "@/assets/product-flowers.jpg";
import productSpa from "@/assets/product-spa.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  subcategory?: string;
  images: string[];
  variants?: string[];
  bundleSize?: number;
  currency?: "INR" | "USD";
  gstRate?: number;
  listPrice?: number;
  discountPercent?: number;
  availableColors?: string[];
  productCode?: string;
  material?: string;
  packingType?: string;
  masterCarton?: string;
  customized?: string;
  minOrderQty?: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "gift-sets",
    name: "Gift Sets",
    description: "Premium curated hampers for clients and teams",
    image: giftCorporate,
  },
  {
    id: "business-card-holders",
    name: "Business Card Holders",
    description: "Executive holders that elevate brand-first impressions",
    image: giftThankyou,
  },
  {
    id: "desktop-lifetime-calenders",
    name: "Desktop Lifetime Calendars",
    description: "Steel and premium calendars with rotating month plates",
    image: giftCorporate,
  },
  {
    id: "pens",
    name: "Pens",
    description: "Premium writing instruments for corporate gifting",
    image: productCandle,
  },
  {
    id: "keychains",
    name: "Keychains",
    description: "Practical and elegant keychain gift options",
    image: productChocolate,
  },
  {
    id: "wooden-products",
    name: "Wooden Desk Accessories",
    description:
      "Sustainable wooden gifts with laser engraving and natural textures",
    image: giftWedding,
  },
  {
    id: "personalized-gifts",
    name: "Personalized Gifts",
    description: "Customizable gifts for special occasions",
    image: giftCorporate,
  },
  {
    id: "badges",
    name: "Badges",
    description: "Custom metal and enamel badges for recognition and events",
    image: giftCorporate,
  },
  {
    id: "wooden-engravings",
    name: "Wooden Engravings",
    description:
      "Sustainable wooden gifts with laser engraving and natural textures",
    image: giftWedding,
  },
  {
    id: "diaries",
    name: "Diaries & Notebooks",
    description: "Executive diaries for meetings and planning",
    image: giftWedding,
  },
  
  // {
  //   id: "bags",
  //   name: "Laptop & Office Bags",
  //   description: "Durable branded bags for daily business use",
  //   image: giftThankyou,
  // },

  // {
  //   id: "bottles",
  //   name: "Bottles & Tumblers",
  //   description: "Reusable drinkware with custom logo options",
  //   image: productSpa,
  // },

  {
    id: "discounted-items",
    name: "Discounted Items",
    description: "Exclusive deals on our most popular products",
    image: productFlowers,
  },
  // {
  //   id: "accessories",
  //   name: "Desk Accessories",
  //   description: "Functional office accessories with branding",
  //   image: giftCorporate,
  // },
];

export const products: Product[] = [
  {
    id: "1",
    name: "2 In 1 Gift Set",
    price: 4343,
    description: "rd3",
    category: "H964",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H964/H964-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "2",
    name: "2 in 1 Gift Set",
    price: 43,
    description: "ewe",
    category: "H974",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H974/H974%20New%20Cover-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "3",
    name: "3 IN 1 GIFT SET Power Bank Planner Diary",
    price: 54,
    description: "ewe",
    category: "P1004 - 32GB",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/P1004/3%20IN%201%20GIFT%20SET%20P1004%20FF-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "4",
    name: "2 In 1 Gift Set",
    price: 5,
    description: "ewe",
    category: "H3126",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3126/2%20IN%201%20GIFT%20SET%20H3126-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "5",
    name: "2 In 1 Gift Set",
    price: 4,
    description: "ewe",
    category: "H3117",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3117/H3117-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "6",
    name: "2 In 1 Gift Set",
    price: 6,
    description: "ewe",
    category: "H3109",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3109/2%20IN%201%20GIFT%20SET%20H3109%20-%20Final-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "7",
    name: "2 In 1 Gift Set",
    price: 64,
    description: "ewe",
    category: "H3124",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3124/2%20IN%201%20GIFT%20SET%20H3124%20New-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "8",
    name: "2 In 1 Gift Set",
    price: 31,
    description: "ewe",
    category: "H910",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H910/2%20IN%201%20GIFT%20SET%20H910%20NEW-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "9",
    name: "2 In 1 Gift Set",
    price: 432,
    description: "ewe",
    category: "H3107",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3107/H3107-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "10",
    name: "2 In 1 Gift Set",
    price: 3,
    description: "ewe",
    category: "H911",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H911/2%20IN%201%20GIFT%20SET%20H911%20NEW-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "11",
    name: "2 In 1 Gift Set",
    price: 2,
    description: "ewe",
    category: "H909",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H909/H909%20-%202-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "12",
    name: "2 In 1 Gift Set",
    price: 31,
    description: "ewe",
    category: "H912",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H912/2%20IN%201%20GIFT%20SET%20H912%20NEW-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "13",
    name: "2 In 1 Gift Set",
    price: 3,
    description: "ewe",
    category: "H995",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H995/H995-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "14",
    name: "2 In 1 Gift Set",
    price: 31,
    description: "ewe",
    category: "H3101",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3101/H3101-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "15",
    name: "2 In 1 Gift Set",
    price: 1,
    description: "ewe",
    category: "H3107",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3107/H3107%20-%20ROSE%20GOLD-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "16",
    name: "2 In 1 Gift Set",
    price: 31,
    description: "ewe",
    category: "H3106",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3106/2%20IN%201%20GIFT%20SET%20H3106-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "17",
    name: "2 In 1 Gift Set",
    price: 42,
    description: "ewe",
    category: "H3118",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3118/H3118-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "18",
    name: "2 In 1 Gift Set",
    price: 43,
    description: "ewe",
    category: "H3107",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3107/H3107%20%20SIlver-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "19",
    name: "2 In 1 Gift Set",
    price: 43,
    description: "ewe",
    category: "H3125",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3125/2%20IN%201%20GIFT%20SET%20H3125%20-%20Final-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "20",
    name: "2 In 1 Gift Set",
    price: 31,
    description: "ewe",
    category: "H3127",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3127/2%20IN%201%20GIFT%20SET%20H3127-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "21",
    name: "2 In 1 Gift Set",
    price: 43,
    description: "ewe",
    category: "H994",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H994/H994%20New-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "22",
    name: "2 In 1 Gift Set",
    price: 43,
    description: "ewe",
    category: "H3132",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3132/2%20in%201%20Gift%20Set%20H3132%20-%20Final-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "23",
    name: "2 In 1 Gift Set",
    price: 54,
    description: "ewe",
    category: "H3105",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3105/H3105%20-%20Final-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "24",
    name: "2 In 1 Gift Set",
    price: 5,
    description: "ewe",
    category: "H3115",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3115/H3115-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "25",
    name: "2 In 1 Gift Set",
    price: 5,
    description: "ewe",
    category: "H963",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H963/2%20IN%201%20GIFT%20SET%20H963%20New%20-%201-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "26",
    name: "2 In 1 Gift Set",
    price: 31,
    description: "ewe",
    category: "H3116",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3116/2%20IN%201%20GIFT%20SET%20H3116-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "27",
    name: "2 In 1 Pen Set",
    price: 34,
    description: "ewe",
    category: "H3119",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3119/H3119-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "28",
    name: "2 IN 1 CROCK SET",
    price: 42,
    description: "ewe",
    category: "H3108",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3108/2%20IN%201%20GIFT%20SET%20H3108%20-%202-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "29",
    name: "2 in 1 Gift Set",
    price: 32,
    description: "ewe",
    category: "H986",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H986/2%20in%201%20Gift%20Set%20H986%20New-min-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "30",
    name: "2 in 1 Gift Set",
    price: 31,
    description: "ewe",
    category: "H949",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H949/2%20in%201%20Gift%20Set%20H949%20New%20Add%20Color-min-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "31",
    name: "2 in 1 Gift Set",
    price: 31,
    description: "ewe",
    category: "H955",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H955/WhatsApp%20Image%202024-08-06%20at%201.10.24%20PM%20(1)-582x640.jpeg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "32",
    name: "2 In 1 Gift Set",
    price: 31,
    description: "ewe",
    category: "H922",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H922/2%20in%201%20Gift%20Set%20H922%20NEW-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "33",
    name: "2 in 1 Gift Set",
    price: 31,
    description: "ewe",
    category: "H937",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/2%20in%201%20Gift%20Set%20H937%20new-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "34",
    name: "2 in 1 Gift Set",
    price: 32,
    description: "ewe",
    category: "H938",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H938/2%20in%201%20Gift%20Set%20H938%20new%2015-04-min-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "3",
    name: "2 in 1 Gift Set",
    price: 23,
    description: "ewe",
    category: "H921",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H921/Model%20H921%20new-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "35",
    name: "2 in 1 Gift Set",
    price: 34,
    description: "ewe",
    category: "H940",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H940/2%20In%201%20Gift%20Set%20H940%20New-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "36",
    name: "2 in 1 Gift Set",
    price: 23,
    description: "ewe",
    category: "H943",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/2%20in%201%20Gift%20Set%20H943%20new1-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "37",
    name: "2 IN 1 GIFT SET",
    price: 31,
    description: "ewe",
    category: "H3123",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3123/2%20IN%201%20GIFT%20SET%20H3123-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "432",
    name: "2 in 1 Gift Set",
    price: 42,
    description: "ewe",
    category: "H916",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H916/2%20in%201%20Gift%20Set%20H916%20Final-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "454",
    name: "2 in 1 Gift Set",
    price: 42,
    description: "ewe",
    category: "H948",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H948/Model%20H948%20NEw%20BLue-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "4554",
    name: "2 in 1 Gift Set",
    price: 23,
    description: "ewe",
    category: "H981",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H981/2%20IN%201%20GIFT%20SET%20H981%20New-min-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "34",
    name: "2 in 1 Gift Set - PU Leather Diary & Metal Ball Pen",
    price: 31,
    description: "ewe",
    category: "H978",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H978/H978%20(1)-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "45",
    name: "2 IN 1 GIFT SET Power Bank Planner Diary",
    price: 32,
    description: "ewe",
    category: "P1004",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/P1004/2%20IN%201%20GIFT%20SET%20P1004-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "455",
    name: "2 in 1 Pen set",
    price: 4,
    description: "ewe",
    category: "H3120",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3120/H3120-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "3465",
    name: "2 IN 1 Pen Set",
    price: 312,
    description: "ewe",
    category: "H3133",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3133/H3133-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "4",
    name: "2 IN 1 POWER BANK DIARY GIFT SET",
    price: 31,
    description: "ewe",
    category: "P1003",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/P1003/2%20IN%201%20GIFT%20SET%20P1003%20-%20Without%20Pendrive-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "445",
    name: "2 In 1 Premium Gift Set",
    price: 23,
    description: "ewe",
    category: "H996",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H996/2%20IN%201%20GIFT%20SET%20H996%20New-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "4545",
    name: "2 in 1 Premium Gift Set -- A5 PU Leather Diary & Metal Ball Pen",
    price: 13,
    description: "ewe",
    category: "H983",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H983/H983%20NEw%20Cover-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "646",
    name: "3 In 1 Gift Set",
    price: 31,
    description: "ewe",
    category: "H3112",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3112/3%20IN%201%20GIFT%20SET%20H3112-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "5665",
    name: "3 IN 1 GIFT SET",
    price: 31,
    description: "ewe",
    category: "H3114",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3114/2%20IN%201%20GIFT%20SET%20H3116-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "4554",
    name: "3 in 1 Gift Set",
    price: 3,
    description: "ewe",
    category: "H926",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H926/3%20in%201%20Gift%20Set%20H926%20New%20Color%20Added-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "54",
    name: "3 in 1 Gift Set",
    price: 21,
    description: "ewe",
    category: "H973",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H973/H973%20Blue%20Color%20Add-min-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "45i",
    name: "3 IN 1 GIFT SET",
    price: 13,
    description: "ewe",
    category: "H3110",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H3110/3%20IN%201%20GIFT%20SET%20H3110%20NEW%20Final-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "893",
    name: "3 in 1 Gift Set",
    price: 31,
    description: "ewe",
    category: "H941",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H941/3%20in%201%20Gift%20Set%20H941%20New%2001-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "4554",
    name: "3 in 1 Gift Set",
    price: 31,
    description: "ewe",
    category: "H950",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H950/3%20in%201%20Gift%20Set%20H950%20New%20-%201-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "4554",
    name: "3 in 1 Gift Set",
    price: 13,
    description: "ewe",
    category: "H942",
    images: [
      "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H942/3%20in%201%20Gift%20Set%20H942%20Color-min-582x640.jpg",
    ],
    variants: ["Black\n Golden"],
  },
  {
    id: "gold-plated-corporate-gift-set",
    name: "Gold Plated Corporate Gift Set",
    price: 32,
    description:
      "Executive set with metallic pen card holder and keychain in a premium presentation box",
    category: "gift-sets",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ],
    variants: ["Black Box", "Navy Box", "Walnut Box"],
  },
  {
    id: "corporate-laptop-bag",
    name: "Corporate Laptop Bag",
    price: 26,
    description:
      "Professional laptop bag with padded compartments and logo placement options",
    category: "bags",
    images: ["https://example.com/bag1.jpg", "https://example.com/bag2.jpg"],
    variants: ["15 Inch", "16 Inch", "17 Inch"],
  },
  {
    id: "dkjs",
    name: "dwjbwe",
    price: 35,
    description: "kjdhw",
    category: "kjsdcb",
    images: ["cdskjb"],
    variants: ["kdjscnb", "hjkb"],
  },
  {
    id: "kejdnw",
    name: "ewdlkn",
    price: 43,
    description: "jmdcs b",
    category: "jcdmsb",
    images: ["dsclkn"],
    variants: ["jmbewd"],
  },
  {
    id: "gold-plated-corporate-gift-set",
    name: "Gold Plated Corporate Gift Set",
    price: 32,
    description:
      "Executive set with metallic pen, card holder, and keychain in a premium presentation box for client gifting.",
    category: "gift-sets",
    images: [giftCorporate, productCandle],
    variants: ["Black Box", "Navy Box", "Walnut Box"],
  },
  {
    id: "blue-customized-gift-set",
    name: "Blue Customized Gift Set",
    price: 28,
    description:
      "A compact bulk gifting set designed for employee onboarding and event giveaways, with branding-ready components.",
    category: "gift-sets",
    images: [giftThankyou, productChocolate],
    variants: ["Standard Branding", "Laser Branding", "Premium Sleeve"],
  },
  {
    id: "eco-friendly-corporate-set",
    name: "Eco-Friendly Corporate Gift Set",
    price: 30,
    description:
      "Sustainable gift set with reusable office essentials and recycled materials, ideal for CSR campaigns and events.",
    category: "gift-sets",
    images: [giftWedding, productSpa],
    variants: ["Kraft Pack", "Eco Premium", "With Seed Paper Card"],
  },
  {
    id: "corporate-laptop-bag",
    name: "Corporate Laptop Bag",
    price: 26,
    description:
      "Professional laptop bag with padded compartments and logo placement options for conferences and employee kits.",
    category: "bags",
    images: [giftThankyou, giftCorporate],
    variants: ["15 Inch", "16 Inch", "17 Inch"],
  },
  {
    id: "executive-leather-diary-a5",
    name: "Executive Leather Diary A5",
    price: 14,
    description:
      "Premium A5 diary with textured cover and expandable pocket, perfect for leadership gifting and office usage.",
    category: "diaries",
    images: [giftWedding, productFlowers],
    variants: ["Black", "Tan Brown", "Navy Blue"],
  },
  {
    id: "metal-water-bottle-750ml",
    name: "Metal Water Bottle 750ml",
    price: 12,
    description:
      "High-quality steel bottle with matte finish and logo engraving support for wellness and sustainability drives.",
    category: "bottles",
    images: [productSpa, giftCorporate],
    variants: ["Matte Black", "Silver", "Royal Blue"],
  },
  {
    id: "premium-metal-pen",
    name: "Premium Metal Pen",
    price: 7,
    description:
      "Sleek metal pen with smooth ink flow and branding-friendly body for conferences, exhibitions, and bulk gifting.",
    category: "pens",
    images: [productCandle, giftThankyou],
    variants: ["Gold Trim", "Chrome Trim", "Matte Black"],
  },
  {
    id: "leather-keychain",
    name: "Leather Keychain",
    price: 5,
    description:
      "Minimal leather keychain with metal ring and embossed logo customization for client thank-you kits.",
    category: "keychains",
    images: [productChocolate, productCandle],
    variants: ["Classic Black", "Brown", "Dual Tone"],
  },
  {
    id: "wooden-keychain",
    name: "Wooden Keychain",
    price: 6,
    description:
      "Laser-engraved wooden keychain with magnetic clasp, highlighting natural grain and logo customization for sustainable gifting.",
    category: "keychains",
    images: [productChocolate, productFlowers],
    variants: ["Natural Teak", "Walnut", "Two-Tone"],
    material: "Sustainable wood",
  },
  {
    id: "metal-keychain",
    name: "Metal Keychain",
    price: 7,
    description:
      "Brushed metal keychain with chamfered edges and precision engraving, designed for premium corporate awards and executive kits.",
    category: "keychains",
    images: [productCandle, productSpa],
    variants: ["Brushed Steel", "Matte Black", "Rose Gold"],
    material: "Stainless steel",
  },
  {
    id: "desk-clock-pen-stand-set",
    name: "Desk Clock + Pen Stand Set",
    price: 19,
    description:
      "Elegant desk utility set combining analog clock and pen organizer, suitable for festive and annual gifting.",
    category: "accessories",
    images: [productFlowers, giftCorporate],
    variants: ["Wood Finish", "Matte Black", "Silver Edge"],
  },
  {
    id: "wireless-charger-pad",
    name: "Wireless Charger Pad",
    price: 24,
    description:
      "Fast charging desk pad compatible with major smartphones, popular in premium client and employee gift packs.",
    category: "electronics",
    images: [productSpa, productFlowers],
    variants: ["Round Pad", "Square Pad", "LED Logo Pad"],
  },
  {
    id: "temperature-display-travel-mug",
    name: "Temperature Display Travel Mug",
    price: 16,
    description:
      "Smart travel mug with touch temperature indicator and leak-proof lid, ideal for modern workforces.",
    category: "bottles",
    images: [giftCorporate, productSpa],
    variants: ["Black", "White", "Steel Gray"],
  },
  {
    id: "wooden-table-top-accessory",
    name: "Wooden Table Top Accessory",
    price: 17,
    description:
      "Wood-finish table top piece for office desks with custom branding area for milestones and business events.",
    category: "accessories",
    images: [giftWedding, productCandle],
    variants: ["Rectangle", "Wave Edge", "Premium Walnut"],
  },
];
