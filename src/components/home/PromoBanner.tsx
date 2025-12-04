import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PromoBanner = () => {
  return (
    <section className="py-16 lg:py-24 bg-casawood-green relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-casawood-cream/20 text-casawood-cream text-sm font-medium mb-6">
              Limited Time Offer
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-casawood-cream leading-tight mb-6">
              Summer Sale <br />
              Up to <span className="text-primary">40% Off</span>
            </h2>
            <p className="text-casawood-green-light text-lg max-w-lg mx-auto lg:mx-0 mb-8">
              Refresh your space with our summer collection. Quality furniture
              at unbeatable prices for a limited time only.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/products?sale=true">
                Shop the Sale <ArrowRight size={20} />
              </Link>
            </Button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop"
                alt="Summer sale furniture collection"
                className="w-full h-[300px] lg:h-[400px] object-cover"
              />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-casawood-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">40%</span>
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">Save Big</p>
                  <p className="text-sm text-muted-foreground">On selected items</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="currentColor" className="text-casawood-cream" />
        </svg>
      </div>
    </section>
  );
};

export default PromoBanner;
