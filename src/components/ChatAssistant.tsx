import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const faq: Record<string, string> = {
  shipping: "We offer free shipping on all orders across India! Standard delivery takes 5-7 business days. Express delivery (2-3 days) is available for ₹199.",
  return: "We have a 30-day return policy. Items must be unworn with original tags. Refunds are processed within 5-7 business days after we receive the item.",
  payment: "We accept all major credit/debit cards, UPI, and net banking. All payments are processed securely. This is currently a simulated payment system for demonstration.",
  size: "Please refer to the size guide on each product page. If you're between sizes, we recommend going up. You can also contact us for specific measurements.",
  order: "You can track your order from the Profile section after placing it. You'll also receive tracking updates via email and SMS.",
  discount: "Check our homepage for the latest sales! We currently have up to 25% off on selected items. Sign up for our newsletter for exclusive deals.",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("ship") || lower.includes("deliver")) return faq.shipping;
  if (lower.includes("return") || lower.includes("refund") || lower.includes("exchange")) return faq.return;
  if (lower.includes("pay") || lower.includes("card") || lower.includes("upi")) return faq.payment;
  if (lower.includes("size") || lower.includes("fit")) return faq.size;
  if (lower.includes("order") || lower.includes("track")) return faq.order;
  if (lower.includes("discount") || lower.includes("sale") || lower.includes("offer") || lower.includes("coupon")) return faq.discount;
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return "Hello! 👋 Welcome to StyleBazar. How can I help you today? You can ask about shipping, returns, payments, sizing, or orders.";
  return "I'd be happy to help! You can ask me about:\n• **Shipping** & delivery\n• **Returns** & refunds\n• **Payment** methods\n• **Size** guide\n• **Order** tracking\n• **Discounts** & offers\n\nOr type your specific question!";
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! 👋 I'm your StyleBazar assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: getResponse(userMsg.content) }]);
    }, 600);
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 sm:bottom-6 right-4 z-50 w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center card-shadow-hover hover:scale-105 transition-transform"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-36 sm:bottom-24 right-4 z-50 w-80 sm:w-96 bg-card rounded-2xl card-shadow-hover overflow-hidden animate-slide-up border border-border">
          <div className="bg-foreground text-background px-4 py-3">
            <h3 className="font-bold text-sm">StyleBazar Assistant</h3>
            <p className="text-xs opacity-70">Ask me anything about your shopping</p>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                    msg.role === "user"
                      ? "bg-foreground text-background rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.content.split("\n").map((line, li) => (
                    <p key={li} className={li > 0 ? "mt-1" : ""}>
                      {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={handleSend}
              className="p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
