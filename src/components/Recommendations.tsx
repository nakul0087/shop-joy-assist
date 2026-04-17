import { Plus, Sparkles, Star } from "lucide-react";
import { Product, products } from "@/data/products";
import { useCart, CartItem } from "@/context/CartContext";
import { formatPrice } from "@/components/ProductCard";

interface RecommendationsProps {
  onViewProduct?: (product: Product) => void;
}

// Frequently-bought-together pairings (category-aware + product-specific hints)
const CATEGORY_AFFINITY: Record<string, string[]> = {
  Footwear: ["Footwear", "Accessories"],
  Electronics: ["Electronics", "Accessories"],
  Menswear: ["Menswear", "Footwear", "Accessories"],
  Womenswear: ["Womenswear", "Accessories", "Footwear"],
  Accessories: ["Accessories", "Menswear", "Womenswear"],
  "Home & Living": ["Home & Living"],
};

// Keywords that signal a "frequently bought together" boost
const KEYWORD_PAIRS: Array<{ match: RegExp; boost: RegExp }> = [
  { match: /shoe|sneaker|oxford|footwear/i, boost: /sock|shoe care|polish/i },
  { match: /phone|earbud|headphone|speaker|smartwatch/i, boost: /charger|case|cable/i },
  { match: /blazer|shirt|suit/i, boost: /watch|wallet|oxford|formal/i },
  { match: /dress|sweater/i, boost: /scarf|bag|sunglasses/i },
  { match: /candle|lamp|mug/i, boost: /blanket|candle|lamp/i },
];

function scoreProduct(candidate: Product, cartItems: CartItem[]): number {
  if (cartItems.some((i) => i.product.id === candidate.id)) return -1; // already in cart
  let score = 0;
  for (const { product: cartProduct, quantity } of cartItems) {
    const weight = Math.min(quantity, 3);
    const affinities = CATEGORY_AFFINITY[cartProduct.category] ?? [cartProduct.category];
    if (cartProduct.category === candidate.category) score += 3 * weight;
    else if (affinities.includes(candidate.category)) score += 1.5 * weight;

    if (cartProduct.brand === candidate.brand) score += 1 * weight;

    const haystack = `${candidate.name} ${candidate.description}`;
    for (const pair of KEYWORD_PAIRS) {
      if (pair.match.test(cartProduct.name) && pair.boost.test(haystack)) {
        score += 4 * weight;
      }
    }
  }
  // Light tiebreaker: prefer higher rated items
  score += candidate.rating * 0.1;
  return score;
}

const Recommendations = ({ onViewProduct }: RecommendationsProps) => {
  const { items, addToCart } = useCart();
  if (items.length === 0) return null;

  const ranked = products
    .map((p) => ({ product: p, score: scoreProduct(p, items) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  if (ranked.length === 0) return null;

  // Top result gets the "People also bought" tag
  const topId = ranked[0].product.id;

  return (
    <section className="mt-10 animate-fade-in" aria-labelledby="recommendations-heading">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 id="recommendations-heading" className="text-lg font-bold">
          Recommended for You
        </h2>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          · Based on your cart
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ranked.map(({ product }) => (
          <div
            key={product.id}
            className="group relative bg-card rounded-lg overflow-hidden card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-300"
          >
            {product.id === topId && (
              <span className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-sm">
                People also bought
              </span>
            )}

            <button
              type="button"
              onClick={() => onViewProduct?.(product)}
              className="block w-full aspect-square bg-muted overflow-hidden"
              aria-label={`View ${product.name}`}
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                width={256}
                height={256}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </button>

            {/* Quick-add button — appears on hover, always visible on touch */}
            <button
              onClick={() => addToCart(product)}
              className="absolute right-2 top-2 z-10 p-2 rounded-full bg-primary text-primary-foreground shadow-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 focus:opacity-100 focus:translate-y-0 transition-all duration-300"
              aria-label={`Quick add ${product.name} to cart`}
            >
              <Plus className="h-4 w-4" />
            </button>

            <div className="p-3">
              <p className="text-[11px] text-muted-foreground font-medium truncate">{product.brand}</p>
              <h3 className="text-sm font-semibold mt-0.5 truncate">{product.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="text-xs font-medium">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="font-bold text-sm">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-[11px] text-muted-foreground line-through truncate">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="md:hidden p-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
