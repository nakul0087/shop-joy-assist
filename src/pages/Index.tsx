import { useState, useEffect } from "react";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import HomePage from "@/components/HomePage";
import CartPage from "@/components/CartPage";
import CheckoutPage from "@/components/CheckoutPage";
import WishlistPage from "@/components/WishlistPage";
import ProductDetail from "@/components/ProductDetail";
import ChatAssistant from "@/components/ChatAssistant";
import AuthPage from "@/components/AuthPage";
import ProfilePage from "@/components/ProfilePage";
import { Product } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

const IndexContent = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const handleNavigate = (page: string) => {
    if (page === "profile" && !session) {
      setCurrentPage("auth");
    } else {
      setCurrentPage(page);
    }
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage("product");
    window.scrollTo(0, 0);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage("home");
  };

  const renderPage = () => {
    if (currentPage === "product" && selectedProduct) {
      return <ProductDetail product={selectedProduct} onBack={() => handleNavigate("home")} />;
    }
    switch (currentPage) {
      case "cart":
        return <CartPage onNavigate={handleNavigate} onViewProduct={handleViewProduct} />;
      case "checkout":
        return <CheckoutPage onNavigate={handleNavigate} />;
      case "wishlist":
        return <WishlistPage onNavigate={handleNavigate} onViewProduct={handleViewProduct} />;
      case "auth":
        return <AuthPage onNavigate={handleNavigate} onAuthSuccess={() => handleNavigate("home")} />;
      case "profile":
        return <ProfilePage onNavigate={handleNavigate} session={session} />;
      case "shop":
      default:
        return (
          <HomePage
            searchQuery={searchQuery}
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        session={session}
      />
      <main className="container">{renderPage()}</main>
      <ChatAssistant />
    </div>
  );
};

const Index = () => (
  <CartProvider>
    <IndexContent />
  </CartProvider>
);

export default Index;
