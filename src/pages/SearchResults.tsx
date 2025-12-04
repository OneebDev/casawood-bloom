import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, categories } from "@/data/products";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const searchResults = useMemo(() => {
    if (!query.trim()) return { products: [], matchedCategories: [] };

    const searchTerm = query.toLowerCase().trim();
    const searchWords = searchTerm.split(/\s+/);

    // Search products
    const matchedProducts = products.filter((product) => {
      const searchableText = [
        product.name,
        product.description,
        product.category,
        product.material,
        product.color,
      ]
        .join(" ")
        .toLowerCase();

      // Match if any search word is found
      return searchWords.some((word) => searchableText.includes(word));
    });

    // Search categories
    const matchedCategories = categories.filter((category) => {
      const searchableText = [category.name, category.description, category.id]
        .join(" ")
        .toLowerCase();
      return searchWords.some((word) => searchableText.includes(word));
    });

    return { products: matchedProducts, matchedCategories };
  }, [query]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newQuery = formData.get("search") as string;
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery.trim() });
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${query ? `Search: "${query}"` : "Search"} | CasaWood`}</title>
        <meta
          name="description"
          content={`Search results for "${query}" - Find premium furniture at CasaWood.`}
        />
      </Helmet>
      <Layout>
        {/* Search Header */}
        <div className="bg-hero-gradient py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-display font-bold text-casawood-charcoal mb-4"
            >
              Search Results
            </motion.h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-xl">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    name="search"
                    placeholder="Search for furniture..."
                    defaultValue={query}
                    className="pl-10 h-12 text-lg"
                    autoFocus
                  />
                </div>
                <Button type="submit" size="lg">
                  Search
                </Button>
              </div>
            </form>

            {query && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-muted-foreground"
              >
                {searchResults.products.length} product
                {searchResults.products.length !== 1 ? "s" : ""} found for "
                {query}"
              </motion.p>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Matched Categories */}
          {searchResults.matchedCategories.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-display font-semibold mb-4">
                Categories matching "{query}"
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {searchResults.matchedCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/products?category=${category.id}`}
                    className="group"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <p className="absolute bottom-3 left-3 right-3 text-white font-medium">
                        {category.name}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {category.productCount} products
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Product Results */}
          {searchResults.products.length > 0 ? (
            <section>
              <h2 className="text-xl font-display font-semibold mb-6">
                Products matching "{query}"
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </section>
          ) : query ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Search size={32} className="text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-display font-semibold mb-2">
                No products found
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any products matching "{query}". Try searching
                for something else or browse our categories.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button asChild variant="outline">
                  <Link to="/products">Browse All Products</Link>
                </Button>
                <Button asChild>
                  <Link to="/">Back to Home</Link>
                </Button>
              </div>

              {/* Suggestions */}
              <div className="mt-8">
                <p className="text-sm text-muted-foreground mb-3">
                  Popular searches:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Sofa", "Bed", "Table", "Chair", "Wardrobe"].map((term) => (
                    <Link
                      key={term}
                      to={`/search?q=${term}`}
                      className="px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Search size={32} className="text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-display font-semibold mb-2">
                Start searching
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Enter a keyword above to search for furniture. Try "bed",
                "chair", "table", or any furniture type.
              </p>

              {/* Popular Categories */}
              <div className="mt-8">
                <p className="text-sm text-muted-foreground mb-3">
                  Or browse by category:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/products?category=${category.id}`}
                      className="px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default SearchResults;
