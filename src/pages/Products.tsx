import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, categories } from "@/data/products";
import { cn } from "@/lib/utils";

const priceRanges = [
  { label: "Under Rs. 50,000", min: 0, max: 50000 },
  { label: "Rs. 50,000 - Rs. 1,00,000", min: 50000, max: 100000 },
  { label: "Rs. 1,00,000 - Rs. 2,00,000", min: 100000, max: 200000 },
  { label: "Over Rs. 2,00,000", min: 200000, max: Infinity },
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Top Rated", value: "rating" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = searchParams.get("category") || "";
  const activeSort = searchParams.get("sort") || "featured";
  const activePriceRange = searchParams.get("price") || "";

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Price filter
    if (activePriceRange) {
      const range = priceRanges.find((r) => r.label === activePriceRange);
      if (range) {
        result = result.filter((p) => p.price >= range.min && p.price < range.max);
      }
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.material.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (activeSort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [activeCategory, activePriceRange, activeSort, searchQuery]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchQuery("");
  };

  const hasActiveFilters = activeCategory || activePriceRange || searchQuery;

  return (
    <>
      <Helmet>
        <title>Shop Furniture | CasaWood</title>
        <meta
          name="description"
          content="Browse our collection of premium furniture for living room, bedroom, dining, and office. Free delivery on orders over Rs. 50,000."
        />
      </Helmet>
      <Layout>
        <div className="bg-hero-gradient py-12">
          <div className="container mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-display font-bold text-casawood-charcoal mb-2"
            >
              {activeCategory
                ? categories.find((c) => c.id === activeCategory)?.name || "All Products"
                : "All Products"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              {filteredProducts.length} products found
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div>
                  <h3 className="font-display font-semibold mb-3">Search</h3>
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-display font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => updateFilter("category", "")}
                      className={cn(
                        "block w-full text-left px-3 py-2 rounded-lg transition-colors",
                        !activeCategory ? "bg-secondary text-casawood-green font-medium" : "hover:bg-muted"
                      )}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => updateFilter("category", category.id)}
                        className={cn(
                          "block w-full text-left px-3 py-2 rounded-lg transition-colors",
                          activeCategory === category.id
                            ? "bg-secondary text-casawood-green font-medium"
                            : "hover:bg-muted"
                        )}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-display font-semibold mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() =>
                          updateFilter("price", activePriceRange === range.label ? "" : range.label)
                        }
                        className={cn(
                          "block w-full text-left px-3 py-2 rounded-lg transition-colors",
                          activePriceRange === range.label
                            ? "bg-secondary text-casawood-green font-medium"
                            : "hover:bg-muted"
                        )}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    Clear All Filters
                  </Button>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter & Sort Bar */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden gap-2"
                >
                  <SlidersHorizontal size={16} />
                  Filters
                </Button>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
                  <div className="relative">
                    <select
                      value={activeSort}
                      onChange={(e) => updateFilter("sort", e.target.value)}
                      className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Active Filters Pills */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {activeCategory && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-sm">
                      {categories.find((c) => c.id === activeCategory)?.name}
                      <button onClick={() => updateFilter("category", "")}>
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {activePriceRange && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-sm">
                      {activePriceRange}
                      <button onClick={() => updateFilter("price", "")}>
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-sm">
                      "{searchQuery}"
                      <button onClick={() => setSearchQuery("")}>
                        <X size={14} />
                      </button>
                    </span>
                  )}
                </div>
              )}

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-4">
                    No products found matching your criteria.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-foreground/50" onClick={() => setIsFilterOpen(false)} />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-card p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-semibold text-lg">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                  <X size={20} />
                </Button>
              </div>

              {/* Mobile Filters Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-semibold mb-3">Search</h3>
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div>
                  <h3 className="font-display font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        updateFilter("category", "");
                        setIsFilterOpen(false);
                      }}
                      className={cn(
                        "block w-full text-left px-3 py-2 rounded-lg transition-colors",
                        !activeCategory ? "bg-secondary text-casawood-green font-medium" : "hover:bg-muted"
                      )}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          updateFilter("category", category.id);
                          setIsFilterOpen(false);
                        }}
                        className={cn(
                          "block w-full text-left px-3 py-2 rounded-lg transition-colors",
                          activeCategory === category.id
                            ? "bg-secondary text-casawood-green font-medium"
                            : "hover:bg-muted"
                        )}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-semibold mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => {
                          updateFilter("price", activePriceRange === range.label ? "" : range.label);
                          setIsFilterOpen(false);
                        }}
                        className={cn(
                          "block w-full text-left px-3 py-2 rounded-lg transition-colors",
                          activePriceRange === range.label
                            ? "bg-secondary text-casawood-green font-medium"
                            : "hover:bg-muted"
                        )}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      clearFilters();
                      setIsFilterOpen(false);
                    }}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Products;
