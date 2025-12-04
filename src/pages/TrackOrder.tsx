import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Search, Truck, CheckCircle, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !email) {
      toast({
        title: "Missing Information",
        description: "Please enter both order number and email address.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Order Not Found",
      description: "No order found with the provided information. Please check your details and try again.",
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Track Your Order | CasaWood</title>
        <meta
          name="description"
          content="Track your CasaWood order status. Enter your order number and email to see real-time shipping updates."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-casawood-cream py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-casawood-charcoal mb-4">
              Track Your Order
            </h1>
            <p className="text-lg text-casawood-warm-gray">
              Enter your order details to see the current status of your delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Track Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto bg-card border border-border rounded-xl p-8"
          >
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-primary" />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Order Number</Label>
                <Input
                  id="orderNumber"
                  placeholder="e.g., CW-123456"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter the email used for your order"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Track Order
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Order Status Info */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-semibold text-foreground text-center mb-12">
            Order Status Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Clock, title: "Processing", description: "Your order is being prepared" },
              { icon: Package, title: "Shipped", description: "Your order is on its way" },
              { icon: Truck, title: "Out for Delivery", description: "Arriving today" },
              { icon: CheckCircle, title: "Delivered", description: "Successfully delivered" },
            ].map((status, index) => (
              <motion.div
                key={status.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <status.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                  {status.title}
                </h3>
                <p className="text-sm text-muted-foreground">{status.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TrackOrder;
