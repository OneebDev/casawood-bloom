import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart | CasaWood</title>
          <meta name="description" content="Your shopping cart is empty. Browse our furniture collection." />
        </Helmet>
        <Layout>
          <div className="container mx-auto px-4 py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag size={40} className="text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-display font-bold text-casawood-charcoal mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
              </p>
              <Button asChild size="lg">
                <Link to="/products">
                  Browse Products <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Shopping Cart (${items.length} items) | CasaWood`}</title>
        <meta name="description" content="Review and manage items in your shopping cart." />
      </Helmet>
      <Layout>
        <div className="bg-hero-gradient py-8">
          <div className="container mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-display font-bold text-casawood-charcoal"
            >
              Shopping Cart
            </motion.h1>
            <p className="text-muted-foreground mt-2">
              {items.length} item{items.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-4 shadow-sm border border-border"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.product.id}`} className="shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-display font-semibold text-foreground hover:text-casawood-green transition-colors line-clamp-1">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground capitalize mb-2">
                        {item.product.category.replace("-", " ")}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1 text-sm"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
                      <p className="font-bold text-foreground">
                        Rs. {(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-muted-foreground">
                          Rs. {item.product.price.toLocaleString("en-IN")} each
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Clear Cart */}
              <div className="flex justify-end pt-4">
                <Button variant="outline" onClick={clearCart} className="text-muted-foreground">
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-xl p-6 shadow-sm border border-border sticky top-24"
              >
                <h2 className="font-display font-semibold text-xl mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>Rs. {getCartTotal().toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-casawood-green">
                      {getCartTotal() >= 50000 ? "Free" : "Rs. 500"}
                    </span>
                  </div>
                  {getCartTotal() < 50000 && (
                    <p className="text-xs text-muted-foreground">
                      Add Rs. {(50000 - getCartTotal()).toLocaleString("en-IN")} more for free shipping
                    </p>
                  )}
                  <div className="border-t border-border pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>
                      Rs. {(getCartTotal() + (getCartTotal() >= 50000 ? 0 : 500)).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <Button asChild className="w-full mb-3" size="lg">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/products">Continue Shopping</Link>
                </Button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="grid grid-cols-2 gap-3 text-center text-xs text-muted-foreground">
                    <div className="p-2 bg-muted/50 rounded-lg">
                      <p className="font-medium text-foreground">Free Delivery</p>
                      <p>On orders over Rs. 50,000</p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded-lg">
                      <p className="font-medium text-foreground">30-Day Returns</p>
                      <p>Easy returns policy</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Cart;
