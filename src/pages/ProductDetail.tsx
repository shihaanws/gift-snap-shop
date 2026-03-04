import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Link to="/shop" className="text-primary underline">Back to shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hi! I'd like to order:\n\n🎁 *${product.name}*\n${product.variants ? `📦 Variant: ${product.variants[selectedVariant]}` : ""}\n💰 Price: $${product.price.toFixed(2)}\n\nPlease let me know the next steps!`
  );
  const whatsappUrl = `https://wa.me/1234567890?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to shop
        </Link>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl overflow-hidden bg-card aspect-square mb-3">
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
                      selectedImage === i ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
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
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-primary mb-6">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Variants */}
            {product.variants && (
              <div className="mb-8">
                <p className="text-sm font-medium text-foreground mb-3">Select Option</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(i)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors flex items-center gap-2 ${
                        selectedVariant === i
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {selectedVariant === i && <Check className="w-3 h-3" />}
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
