import blazerImg from "@/assets/products/blazer.jpg";
import sneakersImg from "@/assets/products/sneakers.jpg";
import hoodieImg from "@/assets/products/hoodie.jpg";
import casualShoesImg from "@/assets/products/casual-shoes.jpg";
import sweaterImg from "@/assets/products/sweater.jpg";
import watchImg from "@/assets/products/watch.jpg";
import sunglassesImg from "@/assets/products/sunglasses.jpg";
import bagImg from "@/assets/products/bag.jpg";
import headphonesImg from "@/assets/products/headphones.jpg";
import deskLampImg from "@/assets/products/desk-lamp.jpg";
import mugImg from "@/assets/products/mug.jpg";
import earbudsImg from "@/assets/products/earbuds.jpg";
import candleImg from "@/assets/products/candle.jpg";
import socksImg from "@/assets/products/socks.jpg";
import shoeCareImg from "@/assets/products/shoe-care.jpg";
import chargerImg from "@/assets/products/charger.jpg";
import phoneCaseImg from "@/assets/products/phone-case.jpg";
import jeansImg from "@/assets/products/jeans.jpg";
import shirtImg from "@/assets/products/shirt.jpg";
import dressImg from "@/assets/products/dress.jpg";
import scarfImg from "@/assets/products/scarf.jpg";
import walletImg from "@/assets/products/wallet.jpg";
import smartwatchImg from "@/assets/products/smartwatch.jpg";
import speakerImg from "@/assets/products/speaker.jpg";
import blanketImg from "@/assets/products/blanket.jpg";
import formalShoesImg from "@/assets/products/formal-shoes.jpg";
import backpackImg from "@/assets/products/backpack.jpg";

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
}

export const products: Product[] = [
  {
    id: 1, name: "Classic Navy Blazer", brand: "Dries Van Noten", price: 8499, originalPrice: 12999,
    image: blazerImg, category: "Menswear", rating: 4.8, reviews: 235,
    description: "Premium tailored blazer crafted from fine Italian wool. Perfect for formal occasions and business meetings.",
  },
  {
    id: 2, name: "Colorful Running Sneakers", brand: "Wales Bonner", price: 6999,
    image: sneakersImg, category: "Footwear", rating: 4.5, reviews: 163,
    description: "Vibrant multi-color athletic sneakers with superior cushioning and breathable mesh upper.",
  },
  {
    id: 3, name: "Essential Red Hoodie", brand: "Still Kelly", price: 3299, originalPrice: 4999,
    image: hoodieImg, category: "Menswear", rating: 4.7, reviews: 89,
    description: "Soft cotton-blend hoodie with kangaroo pocket. A streetwear essential for everyday comfort.",
  },
  {
    id: 4, name: "Minimalist Casual Shoes", brand: "Wales Bonner", price: 5499,
    image: casualShoesImg, category: "Footwear", rating: 4.6, reviews: 142,
    description: "Sleek navy leather sneakers with a clean minimal design. Perfect for casual and smart-casual outfits.",
  },
  {
    id: 5, name: "Teal V-Neck Sweater", brand: "Dries Van Noten", price: 4799,
    image: sweaterImg, category: "Womenswear", rating: 4.9, reviews: 201,
    description: "Luxurious ribbed-knit sweater in a stunning teal colorway. Soft and warm for the cooler months.",
  },
  {
    id: 6, name: "Classic Leather Watch", brand: "Chronos", price: 12999, originalPrice: 18999,
    image: watchImg, category: "Accessories", rating: 4.8, reviews: 312,
    description: "Elegant wristwatch with dark dial and brown leather strap. Swiss-inspired precision movement.",
  },
  {
    id: 7, name: "Aviator Sunglasses", brand: "Luxe Optics", price: 2999,
    image: sunglassesImg, category: "Accessories", rating: 4.4, reviews: 178,
    description: "Gold-frame aviator sunglasses with UV400 protection. A timeless accessory for any outfit.",
  },
  {
    id: 8, name: "Leather Crossbody Bag", brand: "Artisan Craft", price: 7499, originalPrice: 9999,
    image: bagImg, category: "Accessories", rating: 4.7, reviews: 95,
    description: "Handcrafted genuine leather crossbody bag with adjustable strap. Spacious and stylish.",
  },
  {
    id: 9, name: "Wireless Headphones", brand: "SoundMax", price: 4999, originalPrice: 7999,
    image: headphonesImg, category: "Electronics", rating: 4.6, reviews: 428,
    description: "Premium noise-cancelling over-ear headphones with 30-hour battery life and Hi-Res audio support.",
  },
  {
    id: 10, name: "True Wireless Earbuds", brand: "SoundMax", price: 2499,
    image: earbudsImg, category: "Electronics", rating: 4.3, reviews: 312,
    description: "Compact true wireless earbuds with touch controls, IPX5 water resistance, and 24-hour total battery.",
  },
  {
    id: 11, name: "Modern Desk Lamp", brand: "LumiCraft", price: 3499,
    image: deskLampImg, category: "Home & Living", rating: 4.8, reviews: 156,
    description: "Minimalist brass and white desk lamp with adjustable head and warm LED lighting. Perfect for your workspace.",
  },
  {
    id: 12, name: "Ceramic Coffee Mug", brand: "CraftHaus", price: 899, originalPrice: 1299,
    image: mugImg, category: "Home & Living", rating: 4.5, reviews: 89,
    description: "Handmade matte grey ceramic mug. Microwave and dishwasher safe. 350ml capacity.",
  },
  {
    id: 13, name: "Luxury Scented Candle", brand: "AromaVeil", price: 1999,
    image: candleImg, category: "Home & Living", rating: 4.7, reviews: 204,
    description: "Hand-poured soy wax candle with notes of vanilla and sandalwood. 50-hour burn time.",
  },
  {
    id: 14, name: "Athletic Cotton Socks (3 Pack)", brand: "ComfortStep", price: 599, originalPrice: 899,
    image: socksImg, category: "Footwear", rating: 4.6, reviews: 521,
    description: "Soft breathable ankle socks with cushioned soles. Perfect with sneakers and casual shoes.",
  },
  {
    id: 15, name: "Premium Shoe Care Kit", brand: "Artisan Craft", price: 1499,
    image: shoeCareImg, category: "Footwear", rating: 4.8, reviews: 187,
    description: "Complete leather shoe care kit with polish, brush and buffing cloth. Keep your shoes pristine.",
  },
  {
    id: 16, name: "65W Fast USB-C Charger", brand: "SoundMax", price: 1299, originalPrice: 1799,
    image: chargerImg, category: "Electronics", rating: 4.5, reviews: 612,
    description: "Compact GaN charger with braided cable. Fast charges phones, tablets and laptops.",
  },
  {
    id: 17, name: "Silicone Phone Case", brand: "SoundMax", price: 799,
    image: phoneCaseImg, category: "Electronics", rating: 4.4, reviews: 398,
    description: "Slim shockproof silicone case with raised camera bezel. Soft-touch matte finish.",
  },
  {
    id: 18, name: "Slim Fit Indigo Jeans", brand: "Still Kelly", price: 3999, originalPrice: 5499,
    image: jeansImg, category: "Menswear", rating: 4.6, reviews: 274,
    description: "Premium dark indigo denim with a modern slim fit. Comfortable stretch fabric.",
  },
  {
    id: 19, name: "Oxford White Shirt", brand: "Dries Van Noten", price: 2999,
    image: shirtImg, category: "Menswear", rating: 4.7, reviews: 189,
    description: "Classic crisp white button-down in soft oxford cotton. A wardrobe essential.",
  },
  {
    id: 20, name: "Floral Summer Dress", brand: "Wales Bonner", price: 4499, originalPrice: 6499,
    image: dressImg, category: "Womenswear", rating: 4.8, reviews: 156,
    description: "Elegant midi dress with delicate floral print. Lightweight and breathable for warm days.",
  },
  {
    id: 21, name: "Cashmere Blend Scarf", brand: "Artisan Craft", price: 2499,
    image: scarfImg, category: "Womenswear", rating: 4.9, reviews: 132,
    description: "Soft cashmere blend scarf with fringe details. Pairs beautifully with coats and dresses.",
  },
  {
    id: 22, name: "Bifold Leather Wallet", brand: "Artisan Craft", price: 1999, originalPrice: 2999,
    image: walletImg, category: "Accessories", rating: 4.7, reviews: 245,
    description: "Handcrafted full-grain leather bifold wallet with 8 card slots and bill compartment.",
  },
  {
    id: 23, name: "Smartwatch Pro", brand: "Chronos", price: 8999, originalPrice: 12999,
    image: smartwatchImg, category: "Electronics", rating: 4.6, reviews: 487,
    description: "Health tracking smartwatch with AMOLED display, GPS and 7-day battery life.",
  },
  {
    id: 24, name: "Portable Bluetooth Speaker", brand: "SoundMax", price: 3499,
    image: speakerImg, category: "Electronics", rating: 4.5, reviews: 321,
    description: "360° sound portable speaker with 12-hour battery and IPX7 waterproof rating.",
  },
  {
    id: 25, name: "Sage Green Throw Blanket", brand: "CraftHaus", price: 2299,
    image: blanketImg, category: "Home & Living", rating: 4.8, reviews: 167,
    description: "Cozy woven throw blanket in soft sage green. Perfect for sofas and beds.",
  },
  {
    id: 26, name: "Brown Leather Oxford Shoes", brand: "Wales Bonner", price: 7999, originalPrice: 10999,
    image: formalShoesImg, category: "Footwear", rating: 4.7, reviews: 198,
    description: "Classic cap-toe oxford shoes in rich brown leather. Perfect for formal occasions.",
  },
  {
    id: 27, name: "Minimalist Leather Backpack", brand: "Artisan Craft", price: 5999, originalPrice: 7999,
    image: backpackImg, category: "Accessories", rating: 4.6, reviews: 213,
    description: "Sleek minimalist backpack in premium leather. Padded laptop sleeve and roomy interior.",
  },
];

export const categories = ["All", "Menswear", "Womenswear", "Footwear", "Accessories", "Electronics", "Home & Living"];
