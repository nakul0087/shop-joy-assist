import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { Heart } from "lucide-react";
import { Product } from "@/data/products";

interface WishlistPageProps {
  onNavigate: (page: string) => void;
  onViewProduct: (product: Product) => void;
}

const WishlistPage = ({ onNavigate, onViewProduct }: WishlistPageProps) => {
  const { wishlist } = useCart();
  const items = products.filter((p) => wishlist.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <Heart className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-6">Save items you love to buy them later!</p>
        <button onClick={() => onNavigate("home")} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold">
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20 sm:pb-8 px-4">
      <h2 className="text-lg font-bold py-4">Wishlist ({items.length} items)</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} onViewProduct={onViewProduct} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
