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
];

export const categories = ["All", "Menswear", "Womenswear", "Footwear", "Accessories", "Electronics", "Home & Living"];
