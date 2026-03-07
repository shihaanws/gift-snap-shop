import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingCart, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/use-cart";
import { useProducts } from "@/hooks/use-products";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const { products } = useProducts();
  const whatsappPhone = "9074145962";

  const cartRows = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        return null;
      }
      const lineTotal = product.price * item.quantity;
      return { item, product, lineTotal };
    })
    .filter(Boolean);

  const subtotal = cartRows.reduce((sum, row) => sum + row!.lineTotal, 0);
  const whatsappMessage = encodeURIComponent(
    `Hi! I'd like to place an order from my cart:\n\n${cartRows
      .map(
        (row, index) =>
          `${index + 1}. ${row!.product.name}\nProduct ID: ${row!.item.productId}\nQuantity: ${row!.item.quantity}${row!.item.variant ? `\nVariant: ${row!.item.variant}` : ""}\nLine Total: Rs. ${row!.lineTotal.toFixed(2)}`
      )
      .join("\n\n")}\n\nSubtotal: Rs. ${subtotal.toFixed(2)}\n\nPlease let me know the next steps!`
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

  const openWhatsAppOrder = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Your Cart</h1>
        <p className="text-muted-foreground mb-8">Review items before placing your bulk order.</p>

        {cartRows.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-10 text-center">
            <ShoppingCart className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
            <p className="mb-4 text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/shop"
              className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {cartRows.map((row) => (
                <div key={row!.item.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex gap-4">
                    <img
                      src={row!.product.images[0]}
                      alt={row!.product.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <Link to={`/product/${row!.product.id}`} className="font-semibold text-foreground hover:text-primary">
                        {row!.product.name}
                      </Link>
                      {row!.item.variant && (
                        <p className="mt-1 text-xs text-muted-foreground">Variant: {row!.item.variant}</p>
                      )}
                      <p className="mt-1 text-sm text-muted-foreground">Rs. {row!.product.price.toFixed(2)} each</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(row!.item.id)}
                      className="self-start rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-lg border border-border p-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(row!.item.id, row!.item.quantity - 1)}
                        className="rounded p-1 hover:bg-secondary"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold">{row!.item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(row!.item.id, row!.item.quantity + 1)}
                        className="rounded p-1 hover:bg-secondary"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="font-semibold text-foreground">Rs. {row!.lineTotal.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-xl border border-border bg-card p-5">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Summary</h2>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Items</span>
                <span>{items.length}</span>
              </div>
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <Link
                to="/shop"
                className="mb-2 inline-flex w-full items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
              >
                Add More Products
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="mb-2 bg-[hsl(142,70%,40%)] inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-[hsl(0,0%,100%)] hover:opacity-90 transition-opacity shadow-lg"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Order via WhatsApp
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm WhatsApp Order</AlertDialogTitle>
                    <AlertDialogDescription>
                      Please verify items before continuing to WhatsApp.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="max-h-64 overflow-y-auto rounded-lg border border-border p-3">
                    <ul className="space-y-3 text-sm">
                      {cartRows.map((row) => (
                        <li key={row!.item.id} className="rounded-md bg-secondary/50 p-2">
                          <p className="font-medium text-foreground">{row!.product.name}</p>
                          <p className="text-muted-foreground">Product ID: {row!.item.productId}</p>
                          <p className="text-muted-foreground">Quantity: {row!.item.quantity}</p>
                          {row!.item.variant && <p className="text-muted-foreground">Variant: {row!.item.variant}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={openWhatsAppOrder}>Continue to WhatsApp</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <button
                type="button"
                onClick={clearCart}
                className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
