import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/components/ProductCard";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail = ({ product, onBack }: ProductDetailProps) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="pb-20 sm:pb-8 px-4 max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground py-4 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" width={512} height={512} />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground font-medium">{product.brand}</p>
          <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          {product.originalPrice && (
            <span className="mt-1 text-sm font-medium text-success">
              You save {formatPrice(product.originalPrice - product.price)}
            </span>
          )}
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          <div className="flex gap-3 mt-8">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-full border-2 transition-colors ${
                isWishlisted ? "border-wishlist bg-wishlist/10" : "border-border hover:border-muted-foreground"
              }`}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-wishlist text-wishlist" : "text-muted-foreground"}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
