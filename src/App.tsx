import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import ManageProducts from "./pages/ManageProducts";
import About from "./pages/About";
import { ProductProvider } from "./hooks/use-products";
import { CategoryProvider } from "./hooks/use-categories";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./hooks/use-cart";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import { AuthProvider, useAuth } from "./hooks/use-auth";
import NewCatShowcase from "./pages/NewCatShowcase";
import AluminiumFramesShowcase from "./pages/AluminiumFramesShowcase";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CategoryProvider>
      <ProductProvider>
        <CartProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/newcat" element={<NewCatShowcase />} />
                  <Route path="/aluminium-frames" element={<AluminiumFramesShowcase />} />
                  <Route
                    path="/manage-products"
                    element={
                      <ProtectedRoute>
                        <ManageProducts />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </CartProvider>
      </ProductProvider>
    </CategoryProvider>
  </QueryClientProvider>
);

export default App;
