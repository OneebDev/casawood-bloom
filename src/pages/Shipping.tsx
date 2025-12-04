import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Truck, Package, Clock, MapPin, Shield, Gift } from "lucide-react";

const shippingMethods = [
  {
    icon: Truck,
    title: "Standard Shipping",
    time: "5-7 Business Days",
    price: "$49 or FREE over $500",
    description: "Our most economical option for non-urgent deliveries.",
  },
  {
    icon: Clock,
    title: "Express Shipping",
    time: "2-3 Business Days",
    price: "$99",
    description: "Perfect when you need your furniture faster.",
  },
  {
    icon: Gift,
    title: "White-Glove Delivery",
    time: "7-10 Business Days",
    price: "FREE over $1,500 or $199",
    description: "Full assembly, placement, and packaging removal included.",
  },
];

const Shipping = () => {
  return (
    <Layout>
      <Helmet>
        <title>Shipping Information | CasaWood</title>
        <meta
          name="description"
          content="Learn about CasaWood shipping options, delivery times, and policies. Free shipping on orders over $500."
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
              Shipping Information
            </h1>
            <p className="text-lg text-casawood-warm-gray">
              We deliver your furniture with care, right to your doorstep.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-semibold text-casawood-charcoal text-center mb-12">
            Shipping Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {shippingMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <method.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {method.title}
                </h3>
                <p className="text-primary font-semibold mb-1">{method.time}</p>
                <p className="text-lg font-bold text-foreground mb-4">{method.price}</p>
                <p className="text-muted-foreground">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Details */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-display font-semibold text-foreground">
                  Delivery Areas
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We currently ship to all 50 US states and Canada. Alaska, Hawaii, and remote areas may require additional shipping time and fees. International shipping options are coming soon.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Package className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-display font-semibold text-foreground">
                  Order Processing
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Orders are typically processed within 1-2 business days. During peak seasons, processing may take up to 3 business days. You'll receive an email confirmation with tracking information once your order ships.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-display font-semibold text-foreground">
                  Shipping Protection
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                All shipments are fully insured. If your item arrives damaged, please contact us within 48 hours with photos of the damage. We'll arrange for a replacement or full refund at no additional cost.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shipping;
