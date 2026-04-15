import { Search, ShoppingCart, Heart, User, Home, Store } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const Navbar = ({ currentPage, onNavigate, searchQuery, onSearchChange }: NavbarProps) => {
  const { totalItems } = useCart();

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container flex items-center justify-between py-3">
          <h1
            className="text-xl font-bold tracking-tight cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            STYLEBAZAR
          </h1>

          <div className="hidden sm:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-muted border-none text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("wishlist")}
              className="relative p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Heart className="h-5 w-5" />
            </button>
            <button
              onClick={() => onNavigate("cart")}
              className="relative p-2 rounded-full hover:bg-muted transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden px-4 pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-muted border-none text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </header>

      {/* Bottom nav for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border sm:hidden">
        <div className="flex items-center justify-around py-2">
          {[
            { icon: Home, label: "Home", page: "home" },
            { icon: Store, label: "Shop", page: "shop" },
            { icon: Heart, label: "Wishlist", page: "wishlist" },
            { icon: ShoppingCart, label: "Cart", page: "cart" },
            { icon: User, label: "Profile", page: "profile" },
          ].map(({ icon: Icon, label, page }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`flex flex-col items-center gap-0.5 p-1 ${
                currentPage === page ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
