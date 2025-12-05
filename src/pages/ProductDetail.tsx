import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Heart,
  Share2,
  Truck,
  Shield,
  RefreshCw,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Check,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  const product = products.find((p) => p.id === id);
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Please log in first",
        description: "You need to log in before adding items to your cart.",
      });
      return;
    }
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    if (!user) {
      toast({
        title: "Please log in first",
        description: "You need to log in before adding items to your wishlist.",
      });
      return;
    }
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

  const productImages = product.images || [product.image];

  return (
    <>
      <Helmet>
        <title>{product.name} | CasaWood</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <Layout>
        {/* Breadcrumb */}
        <div className="bg-muted/50 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/products" className="text-muted-foreground hover:text-foreground">
                Products
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link
                to={`/products?category=${product.category}`}
                className="text-muted-foreground hover:text-foreground capitalize"
              >
                {product.category.replace("-", " ")}
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 lg:py-12">
          {/* Back Button */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft size={18} />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              {productImages.length > 1 && (
                <div className="flex gap-3">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={cn(
                        "w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                        selectedImage === idx ? "border-casawood-green" : "border-transparent"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                {product.isNew && (
                  <span className="px-3 py-1 rounded-full bg-casawood-green text-accent-foreground text-xs font-medium">
                    New Arrival
                  </span>
                )}
                {product.isSale && (
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    On Sale
                  </span>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-display font-bold text-casawood-charcoal mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={cn(
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-casawood-charcoal">
                  Rs. {product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    Rs. {product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-2 py-1 rounded bg-primary/10 text-casawood-yellow-dark text-sm font-medium">
                    Save Rs. {(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/50 rounded-xl">
                <div>
                  <p className="text-sm text-muted-foreground">Material</p>
                  <p className="font-medium">{product.material}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Color</p>
                  <p className="font-medium">{product.color}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dimensions</p>
                  <p className="font-medium text-sm">
                    {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Availability</p>
                  <p className={cn("font-medium", product.inStock ? "text-casawood-green" : "text-destructive")}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <Button onClick={handleAddToCart} size="lg" className="flex-1 gap-2">
                  {isInCart(product.id) ? (
                    <>
                      <Check size={18} />
                      Add More to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Add to Cart
                    </>
                  )}
                </Button>

                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleToggleWishlist}
                  className={cn(
                    isInWishlist(product.id) && "bg-primary/10 border-primary text-primary"
                  )}
                >
                  <Heart size={18} className={cn(isInWishlist(product.id) && "fill-primary")} />
                </Button>

                <Button variant="ghost" size="lg">
                  <Share2 size={18} />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Truck className="mx-auto mb-2 text-casawood-green" size={24} />
                  <p className="text-sm font-medium">Free Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="mx-auto mb-2 text-casawood-green" size={24} />
                  <p className="text-sm font-medium">5-Year Warranty</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="mx-auto mb-2 text-casawood-green" size={24} />
                  <p className="text-sm font-medium">30-Day Returns</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16 pt-16 border-t border-border">
              <h2 className="text-2xl font-display font-bold text-casawood-charcoal mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ProductDetail;
