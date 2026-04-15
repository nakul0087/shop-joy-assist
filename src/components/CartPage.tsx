import { Minus, Plus, Trash2, ArrowLeft, ShoppingCart as CartIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/components/ProductCard";

interface CartPageProps {
  onNavigate: (page: string) => void;
}

const CartPage = ({ onNavigate }: CartPageProps) => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const vat = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + vat;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <CartIcon className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some products to get started!</p>
        <button
          onClick={() => onNavigate("home")}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20 sm:pb-8 px-4 max-w-4xl mx-auto">
      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-4 py-6">
        {["Cart", "Checkout", "Order"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              i === 0 ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
            }`}>
              {i + 1}
            </div>
            <span className={`text-sm font-medium ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}>
              {step}
            </span>
            {i < 2 && <div className="w-12 border-t-2 border-dashed border-border" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center gap-4 bg-card rounded-lg p-4 card-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover"
                loading="lazy"
                width={80}
                height={80}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                <p className="text-xs text-muted-foreground">{product.brand}</p>
              </div>
              <div className="flex items-center gap-2 bg-muted rounded-lg">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="p-2 hover:bg-secondary rounded-l-lg transition-colors"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="p-2 hover:bg-secondary rounded-r-lg transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <span className="font-bold text-sm w-24 text-right">
                {formatPrice(product.price * quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-checkout text-checkout-foreground rounded-xl p-6 h-fit">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span className="font-semibold">{formatPrice(vat)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-success">FREE</span>
            </div>
            <div className="border-t border-checkout-foreground/20 pt-3 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate("checkout")}
            className="w-full mt-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => onNavigate("home")}
            className="w-full mt-3 py-2 text-sm text-checkout-foreground/70 hover:text-checkout-foreground flex items-center justify-center gap-1 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" /> Go back to shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
