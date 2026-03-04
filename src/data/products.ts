import giftBirthday from "@/assets/gift-birthday.jpg";
import giftAnniversary from "@/assets/gift-anniversary.jpg";
import giftWedding from "@/assets/gift-wedding.jpg";
import giftThankyou from "@/assets/gift-thankyou.jpg";
import giftCorporate from "@/assets/gift-corporate.jpg";
import giftBaby from "@/assets/gift-baby.jpg";
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
  images: string[];
  variants?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  { id: "birthday", name: "Birthday", description: "Make their day unforgettable", image: giftBirthday },
  { id: "anniversary", name: "Anniversary", description: "Celebrate love & togetherness", image: giftAnniversary },
  { id: "wedding", name: "Wedding", description: "Elegant gifts for the big day", image: giftWedding },
  { id: "thankyou", name: "Thank You", description: "Express your gratitude", image: giftThankyou },
  { id: "corporate", name: "Corporate", description: "Professional & refined gifts", image: giftCorporate },
  { id: "baby", name: "Baby Shower", description: "Welcome the little one", image: giftBaby },
];

export const products: Product[] = [
  {
    id: "luxury-candle-set",
    name: "Luxury Candle Set",
    price: 45,
    description: "A set of three beautifully crafted scented candles in elegant glass jars with gold lids. Perfect for creating a warm, cozy atmosphere. Available in Vanilla Bean, Lavender Fields, and Amber Rose.",
    category: "thankyou",
    images: [productCandle, giftThankyou],
    variants: ["Vanilla Bean", "Lavender Fields", "Amber Rose"],
  },
  {
    id: "gourmet-chocolate-box",
    name: "Gourmet Chocolate Box",
    price: 65,
    description: "An exquisite collection of 12 handcrafted truffles in assorted flavors, presented in a luxurious dark box with golden ribbon. A perfect gift for chocolate lovers.",
    category: "birthday",
    images: [productChocolate, giftBirthday],
    variants: ["Classic Assorted", "Dark Collection", "Milk & White"],
  },
  {
    id: "rose-peony-bouquet",
    name: "Rose & Peony Bouquet",
    price: 85,
    description: "A stunning hand-tied bouquet featuring premium roses and peonies in soft pink tones, wrapped in elegant paper with a satin ribbon finish.",
    category: "anniversary",
    images: [productFlowers, giftAnniversary],
    variants: ["Pink Blush", "Classic Red", "White Elegance"],
  },
  {
    id: "spa-retreat-basket",
    name: "Spa Retreat Basket",
    price: 95,
    description: "Indulge in relaxation with this premium spa gift basket featuring bath bombs, essential oils, a plush towel, and organic body butter. The perfect self-care gift.",
    category: "thankyou",
    images: [productSpa, giftThankyou],
    variants: ["Lavender Calm", "Citrus Energy", "Rose Garden"],
  },
  {
    id: "executive-gift-set",
    name: "Executive Gift Set",
    price: 120,
    description: "A sophisticated collection featuring a premium leather notebook, elegant pen set, and luxury accessories — all presented in a beautifully crafted gift box.",
    category: "corporate",
    images: [giftCorporate, productCandle],
    variants: ["Black Leather", "Brown Heritage"],
  },
  {
    id: "baby-welcome-set",
    name: "Baby Welcome Set",
    price: 75,
    description: "A delightful gift set for the newest arrival, featuring a soft plush toy, baby clothes, and adorable accessories in a beautiful pastel gift box.",
    category: "baby",
    images: [giftBaby, productFlowers],
    variants: ["Boy (Blue)", "Girl (Pink)", "Neutral (Yellow)"],
  },
  {
    id: "wedding-blessing-box",
    name: "Wedding Blessing Box",
    price: 150,
    description: "An elegant collection of premium gifts for the newlyweds, featuring luxury candles, gourmet treats, and keepsake items in a stunning white and gold box.",
    category: "wedding",
    images: [giftWedding, productCandle],
    variants: ["Classic Gold", "Silver Elegance"],
  },
  {
    id: "birthday-surprise-basket",
    name: "Birthday Surprise Basket",
    price: 89,
    description: "A colorful and joyful birthday gift basket packed with treats, a scented candle, chocolates, and a heartfelt greeting card.",
    category: "birthday",
    images: [giftBirthday, productChocolate],
    variants: ["Standard", "Deluxe"],
  },
];
