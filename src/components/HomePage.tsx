import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface HomePageProps {
  searchQuery: string;
  onNavigate: (page: string) => void;
  onViewProduct: (product: Product) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

type SortOption = "featured" | "price-asc" | "price-desc";

const HomePage = ({ searchQuery, onNavigate, onViewProduct, selectedCategory, onCategoryChange }: HomePageProps) => {
  const priceBounds = useMemo(() => {
    const prices = products.map((p) => p.price);
    return [Math.min(...prices), Math.max(...prices)] as [number, number];
  }, []);

  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>(priceBounds);

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCat && matchesPrice;
    });

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const isPriceFiltered = priceRange[0] !== priceBounds[0] || priceRange[1] !== priceBounds[1];

  return (
    <div className="pb-20 sm:pb-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl mx-4 mt-4">
        <div className="relative h-48 sm:h-72 hero-gradient rounded-2xl overflow-hidden">
          <img
            src={heroBanner}
            alt="Fashion sale banner"
            width={1200}
            height={600}
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-60"
          />
          <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-12">
            <p className="text-xs font-bold tracking-widest text-primary-foreground/80 uppercase">Ends Soon</p>
            <h2 className="text-3xl sm:text-5xl font-black text-primary-foreground mt-1 leading-tight">
              UP TO<br />25% OFF
            </h2>
            <button
              onClick={() => onNavigate("shop")}
              className="mt-4 w-fit px-6 py-2.5 bg-foreground text-background rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Shop Now →
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mt-6 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="mt-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">
            {selectedCategory === "All" ? "Recommended Styles" : selectedCategory}
          </h2>
          <span className="text-sm text-muted-foreground">{filtered.length} items</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onViewProduct={onViewProduct} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No products found.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
