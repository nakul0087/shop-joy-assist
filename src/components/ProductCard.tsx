import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onViewProduct?: (product: Product) => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

const ProductCard = ({ product, onViewProduct }: ProductCardProps) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group bg-card rounded-lg overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 animate-fade-in">
      <div className="relative aspect-square bg-muted overflow-hidden cursor-pointer" onClick={() => onViewProduct?.(product)}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={512}
          height={512}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.originalPrice && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-sm">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
        >
          <Heart
            className={`h-4 w-4 ${isWishlisted ? "fill-wishlist text-wishlist" : "text-muted-foreground"}`}
          />
        </button>
      </div>
      <div className="p-3">
        <p className="text-xs text-muted-foreground font-medium">{product.brand}</p>
        <h3 className="text-sm font-semibold mt-0.5 truncate">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
export { formatPrice };
