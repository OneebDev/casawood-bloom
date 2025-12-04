import { motion } from "framer-motion";
import { Truck, Shield, Leaf, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Complimentary delivery on all orders over Rs. 50,000. White glove service available.",
  },
  {
    icon: Shield,
    title: "5-Year Warranty",
    description: "All furniture comes with our comprehensive warranty for peace of mind.",
  },
  {
    icon: Leaf,
    title: "Sustainable Materials",
    description: "Responsibly sourced woods and eco-friendly fabrics for a greener future.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Our design consultants are ready to help you find the perfect pieces.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-card flex items-center justify-center shadow-sm">
                <feature.icon size={28} className="text-casawood-green" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
