import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/components/ProductCard";
import { CreditCard, CheckCircle2, Lock, Smartphone, Wallet, Building2, Banknote } from "lucide-react";

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

type PaymentMethod = "card" | "upi" | "paytm" | "paypal" | "netbanking" | "cod";

const paymentMethods: { id: PaymentMethod; label: string; desc: string; icon: typeof CreditCard }[] = [
  { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay", icon: CreditCard },
  { id: "upi", label: "UPI", desc: "Google Pay, PhonePe, BHIM", icon: Smartphone },
  { id: "paytm", label: "Paytm Wallet", desc: "Pay with Paytm balance", icon: Wallet },
  { id: "paypal", label: "PayPal", desc: "International payments", icon: Wallet },
  { id: "netbanking", label: "Net Banking", desc: "All major Indian banks", icon: Building2 },
  { id: "cod", label: "Cash on Delivery", desc: "Pay when order arrives", icon: Banknote },
];

const CheckoutPage = ({ onNavigate }: CheckoutPageProps) => {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
    paytmMobile: "",
    paypalEmail: "",
    bank: "",
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
              <h3 className="font-bold">Payment Method</h3>
              <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" /> Secure
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-4 bg-primary/10 p-2 rounded-md">
              🔒 This is a simulated payment. No real charges will be made — use any details.
            </p>

            {/* Method picker */}
            <div className="grid sm:grid-cols-2 gap-2 mb-5">
              {paymentMethods.map((m) => {
                const Icon = m.icon;
                const active = method === m.id;
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${
                      active
                        ? "border-primary bg-primary/5"
                        : "border-border bg-muted/30 hover:border-muted-foreground/30"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${active ? "bg-primary text-primary-foreground" : "bg-background"}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{m.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{m.desc}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${active ? "border-primary bg-primary" : "border-muted-foreground/40"}`} />
                  </button>
                );
              })}
            </div>

            {/* Method-specific fields */}
            {method === "card" && (
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Card Number (any 16 digits)" value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })} className="sm:col-span-2 px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <input required placeholder="MM/YY" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} className="px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <input required placeholder="CVV" value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value })} className="px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            )}

            {method === "upi" && (
              <div className="space-y-3">
                <input required placeholder="UPI ID (e.g. yourname@okhdfc)" value={form.upiId} onChange={(e) => setForm({ ...form, upiId: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <div className="flex flex-wrap gap-2">
                  {["Google Pay", "PhonePe", "Paytm UPI", "BHIM"].map((app) => (
                    <span key={app} className="text-xs bg-muted px-3 py-1.5 rounded-full">{app}</span>
                  ))}
                </div>
              </div>
            )}

            {method === "paytm" && (
              <input required type="tel" placeholder="Paytm Registered Mobile Number" value={form.paytmMobile} onChange={(e) => setForm({ ...form, paytmMobile: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            )}

            {method === "paypal" && (
              <div className="space-y-3">
                <input required type="email" placeholder="PayPal Email Address" value={form.paypalEmail} onChange={(e) => setForm({ ...form, paypalEmail: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <p className="text-xs text-muted-foreground">You'll be redirected to PayPal to complete payment.</p>
              </div>
            )}

            {method === "netbanking" && (
              <select required value={form.bank} onChange={(e) => setForm({ ...form, bank: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select your bank</option>
                {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra", "Yes Bank", "Punjab National Bank"].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            )}

            {method === "cod" && (
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                Pay <span className="font-semibold text-foreground">{formatPrice(grandTotal)}</span> in cash to the delivery agent when your order arrives.
              </p>
            )}
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
            {method === "cod" ? `Place Order · ${formatPrice(grandTotal)}` : `Pay ${formatPrice(grandTotal)}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
