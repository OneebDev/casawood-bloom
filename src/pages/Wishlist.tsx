import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (product: typeof items[0]) => {
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleRemove = (product: typeof items[0]) => {
    removeFromWishlist(product.id);
    toast({
      title: "Removed from wishlist",
      description: `${product.name} has been removed.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>{`Wishlist (${items.length} items) | CasaWood`}</title>
        <meta name="description" content="View and manage your saved items." />
      </Helmet>
      <Layout>
        <div className="min-h-screen bg-background py-8 lg:py-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  My Wishlist
                </h1>
                <p className="text-muted-foreground">
                  {items.length} {items.length === 1 ? "item" : "items"} saved
                </p>
              </div>
              {items.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    clearWishlist();
                    toast({ title: "Wishlist cleared" });
                  }}
                >
                  Clear All
                </Button>
              )}
            </div>

            {items.length === 0 ? (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Heart size={32} className="text-muted-foreground" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                  Your wishlist is empty
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Save items you love by clicking the heart icon on any product.
                </p>
                <Link to="/products">
                  <Button variant="default" className="gap-2">
                    <ArrowLeft size={16} />
                    Continue Shopping
                  </Button>
                </Link>
              </motion.div>
            ) : (
              /* Wishlist Items */
              <div className="grid gap-4">
                {items.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-xl p-4 border border-border shadow-sm"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <Link to={`/product/${product.id}`} className="shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-lg"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${product.id}`}>
                          <p className="text-sm text-muted-foreground capitalize mb-1">
                            {product.category.replace("-", " ")}
                          </p>
                          <h3 className="font-display font-semibold text-foreground hover:text-casawood-green transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg font-bold text-foreground">
                            Rs. {product.price.toLocaleString("en-IN")}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              Rs. {product.originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Button
                            variant={isInCart(product.id) ? "secondary" : "default"}
                            size="sm"
                            className="gap-2"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart size={14} />
                            {isInCart(product.id) ? "Add More" : "Add to Cart"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-destructive hover:text-destructive"
                            onClick={() => handleRemove(product)}
                          >
                            <Trash2 size={14} />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Continue Shopping */}
            {items.length > 0 && (
              <div className="mt-8 text-center">
                <Link to="/products">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft size={16} />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Wishlist;
