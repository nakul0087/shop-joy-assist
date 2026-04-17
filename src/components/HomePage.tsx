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
        <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
          <h2 className="text-lg font-bold">
            {selectedCategory === "All" ? "Recommended Styles" : selectedCategory}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">{filtered.length} items</span>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 rounded-full">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">Price</span>
                  {isPriceFiltered && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72" align="end">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">Price Range</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      ₹{priceRange[0].toLocaleString("en-IN")} – ₹{priceRange[1].toLocaleString("en-IN")}
                    </p>
                  </div>
                  <Slider
                    min={priceBounds[0]}
                    max={priceBounds[1]}
                    step={100}
                    value={priceRange}
                    onValueChange={(v) => setPriceRange([v[0], v[1]] as [number, number])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹{priceBounds[0].toLocaleString("en-IN")}</span>
                    <span>₹{priceBounds[1].toLocaleString("en-IN")}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => setPriceRange(priceBounds)}
                    disabled={!isPriceFiltered}
                  >
                    Reset
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="h-9 w-[140px] rounded-full text-sm">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4 sm:hidden">{filtered.length} items</p>
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
