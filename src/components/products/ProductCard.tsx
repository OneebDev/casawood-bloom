import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group"
    >
      <div className="bg-card rounded-2xl overflow-hidden shadow-casawood hover:shadow-casawood-lg transition-all duration-300">
        {/* Image Container */}
        <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 rounded-full bg-casawood-green text-accent-foreground text-xs font-medium">
                New
              </span>
            )}
            {product.isSale && (
              <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                Sale
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className={cn(
            "absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300",
            isInWishlist(product.id) 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
          )}>
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "w-9 h-9 rounded-full shadow-sm",
                isInWishlist(product.id) && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              onClick={handleWishlistToggle}
            >
              <Heart size={16} className={cn(isInWishlist(product.id) && "fill-current")} />
            </Button>
          </div>

          {/* Add to Cart Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              variant={isInCart(product.id) ? "secondary" : "default"}
              className="w-full gap-2"
              onClick={handleAddToCart}
            >
              {isInCart(product.id) ? (
                <>
                  <Check size={16} />
                  In Cart - Add More
                </>
              ) : (
                <>
                  <ShoppingCart size={16} />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </Link>

        {/* Content */}
        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <p className="text-sm text-muted-foreground mb-1 capitalize">
              {product.category.replace("-", " ")}
            </p>
            <h3 className="font-display font-semibold text-foreground mb-2 hover:text-casawood-green transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={cn(
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              Rs. {product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                Rs. {product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
