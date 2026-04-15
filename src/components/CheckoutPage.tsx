import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/components/ProductCard";
import { CreditCard, CheckCircle2, Lock } from "lucide-react";

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

const CheckoutPage = ({ onNavigate }: CheckoutPageProps) => {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const vat = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + vat;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      clearCart();
    }, 2500);
  };

  if (step === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 animate-slide-up">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
        <p className="text-muted-foreground text-center max-w-sm mb-2">
          Your order has been placed successfully. You will receive a confirmation email shortly.
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          Order ID: #SB{Date.now().toString().slice(-8)}
        </p>
        <button
          onClick={() => onNavigate("home")}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (step === "processing") {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
        <h2 className="text-xl font-bold mb-2">Processing Payment...</h2>
        <p className="text-muted-foreground text-sm">Please wait while we process your payment of {formatPrice(grandTotal)}</p>
      </div>
    );
  }

  return (
    <div className="pb-20 sm:pb-8 px-4 max-w-4xl mx-auto">
      {/* Steps */}
      <div className="flex items-center justify-center gap-4 py-6">
        {["Cart", "Checkout", "Order"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              i <= 1 ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
            }`}>
              {i < 1 ? "✓" : i + 1}
            </div>
            <span className={`text-sm font-medium ${i <= 1 ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
            {i < 2 && <div className="w-12 border-t-2 border-dashed border-border" />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping */}
          <div className="bg-card rounded-xl p-6 card-shadow">
            <h3 className="font-bold mb-4">Shipping Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <input required placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="sm:col-span-2 px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <input required placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <input required placeholder="PIN Code" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-card rounded-xl p-6 card-shadow">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5" />
              <h3 className="font-bold">Payment Details</h3>
              <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" /> Secure
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-4 bg-primary/10 p-2 rounded-md">
              🔒 This is a simulated payment. No real charges will be made. Use any card details.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Card Number (any 16 digits)" value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })} className="sm:col-span-2 px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <input required placeholder="MM/YY" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} className="px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <input required placeholder="CVV" value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value })} className="px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-checkout text-checkout-foreground rounded-xl p-6 h-fit">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span className="truncate mr-2">{product.name} × {quantity}</span>
                <span className="font-medium">{formatPrice(product.price * quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-checkout-foreground/20 pt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
            <div className="flex justify-between"><span>GST (18%)</span><span>{formatPrice(vat)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="text-success font-medium">FREE</span></div>
          </div>
          <div className="border-t border-checkout-foreground/20 pt-3 mt-3 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
          <button
            type="submit"
            className="w-full mt-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            Pay {formatPrice(grandTotal)}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
