import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  ArrowLeft,
  Check,
  Plus,
  Minus,
  Heart,
  ArrowLeftRight,
  ShoppingCart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useProducts();
  const { addItem, items } = useCart();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(product?.minOrderQty ?? 1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-10 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">
            Product not found
          </h1>
          <Link to="/shop" className="text-primary underline">
            Back to shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const currency = product.currency ?? "INR";
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });
  const gstAmount = product.gstRate
    ? (product.price * product.gstRate) / 100
    : null;
  const discountedFromList =
    typeof product.listPrice === "number" &&
    typeof product.discountPercent === "number";

  const whatsappMessage = encodeURIComponent(
    `Hi! I'd like to order:\n\n🎁 *${product.name}*\n${product.variants?.length ? `📦 Variant: ${product.variants[selectedVariant]}` : ""}\nQuantity: ${quantity}\nPrice: ${formatter.format(product.price * quantity)}\n\nPlease let me know the next steps!`,
  );
  const whatsappUrl = `https://wa.me/9074145962?text=${whatsappMessage}`;
  const isInCart = items.some((item) => item.productId === product.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-4">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to shop
        </Link>

        <div className="grid md:grid-cols-2 gap-1 md:gap-1">
          {/* Image gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:max-w-[540px]"
          >
            <div className="rounded-xl overflow-hidden bg-card aspect-[4/5] max-h-[890px] md:aspect-square md:max-h-[860px] mb-3">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <h1 className="font-display text-2xl md:text-2xl font-bold text-foreground mb-1">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-primary">
              {formatter.format(product.price)}
            </p>
            {product.gstRate && gstAmount !== null && (
              <p className="text-sm text-muted-foreground mb-1">
                GST @ {product.gstRate}% ({formatter.format(gstAmount)})
              </p>
            )}
            {!product.gstRate && (
              <p className="text-sm text-muted-foreground mb-1">GST: N/A</p>
            )}
            {discountedFromList && (
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground line-through">
                  {formatter.format(product.listPrice!)}
                </span>
                <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold tracking-wide text-primary-foreground shadow-sm">
                  {product.discountPercent}% OFF
                </span>
              </div>
            )}
            {!discountedFromList && (
              <p className="text-sm text-muted-foreground mb-1">
                List Price / Discount: N/A
              </p>
            )}

            {/* Variants */}
            <div className="mb-2">
              <p className="text-sm font-medium text-foreground mb-1">
                Available Options
              </p>
              <div className="mb-2"></div>
              <div className="flex flex-wrap gap-2">
                {product.variants?.length ? (
                  product.variants.map((v, i) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(i)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium border transition-colors flex items-center gap-2 ${
                        selectedVariant === i
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {selectedVariant === i && <Check className="w-3 h-3" />}
                      {v}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No variant options
                  </p>
                )}
              </div>
            </div>

           <div className="mb-2 rounded-lg border border-border bg-card px-2 text-sm">
  <table className="w-full border-collapse">
    <tbody className="divide-y divide-border">
      <tr>
        <td className="py-2 font-semibold text-muted-foreground w-1/3">Product Code</td>
        <td className="py-2 text-muted-foreground">{product.productCode || "N/A"}</td>
      </tr>

      <tr>
        <td className="py-2 font-semibold text-muted-foreground">Color</td>
        <td className="py-2 text-muted-foreground">
          {product.availableColors?.length ? product.availableColors.join(", ") : "N/A"}
        </td>
      </tr>

      <tr>
        <td className="py-2 font-semibold text-muted-foreground">Material</td>
        <td className="py-2 text-muted-foreground">{product.material || "N/A"}</td>
      </tr>

      <tr>
        <td className="py-2 font-semibold text-muted-foreground">Packing Type</td>
        <td className="py-2 text-muted-foreground">{product.packingType || "N/A"}</td>
      </tr>

      <tr>
        <td className="py-2 font-semibold text-muted-foreground">Master Carton</td>
        <td className="py-2 text-muted-foreground">{product.masterCarton || "N/A"}</td>
      </tr>

      <tr>
        <td className="py-2 font-semibold text-muted-foreground">Customized</td>
        <td className="py-2 text-muted-foreground">{product.customized || "N/A"}</td>
      </tr>
    </tbody>
  </table>
</div>
            {/* Quantity Selection */}
            <div className="mb-2">
              <p className="text-sm font-medium text-foreground mb-2">
                Quantity
              </p>
              <div className="flex items-center gap-4 w-fit border border-border rounded-lg p-1">
                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(product.minOrderQty ?? 1, quantity - 1),
                    )
                  }
                  className="p-1 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-semibold min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {product.minOrderQty && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Minimum order quantity: {product.minOrderQty}
                </p>
              )}
            </div>

            <div className="mb-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  if (isInCart) {
                    navigate("/cart");
                    return;
                  }
                  addItem({
                    productId: product.id,
                    quantity,
                    variant: product.variants?.[selectedVariant],
                  });
                  toast.success(`${product.name} added to cart`);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                <ShoppingCart className="w-4 h-4" />
                {isInCart ? "Go to cart" : "Add to cart"}
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
              >
                <Heart className="w-4 h-4" />
                Add to wishlist
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
              >
                <ArrowLeftRight className="w-4 h-4" />
                Add to compare
              </button>
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
              >
                View cart
              </button>
            </div>

            {/* WhatsApp Order Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[hsl(142,70%,40%)] text-[hsl(0,0%,100%)] px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Order via WhatsApp
            </a>

            <p className="text-xs text-muted-foreground mt-3">
              You'll be redirected to WhatsApp to complete your order
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
