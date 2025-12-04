import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const features = [
    { icon: Truck, text: "Free Delivery" },
    { icon: Shield, text: "5-Year Warranty" },
    { icon: RefreshCw, text: "30-Day Returns" },
  ];

  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-casawood-green-light text-casawood-green-dark text-sm font-medium mb-6">
              New Collection 2025
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-casawood-charcoal leading-tight mb-6">
              Furniture That{" "}
              <span className="text-casawood-green">Defines</span> Your Space
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8">
              Discover handcrafted furniture pieces designed to transform your
              home into a sanctuary of style and comfort. Quality materials,
              timeless designs.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button asChild variant="hero" size="xl">
                <Link to="/products">
                  Shop Now <ArrowRight size={20} />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4">
              {features.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
                >
                  <Icon size={18} className="text-casawood-green" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-casawood-lg">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop"
                alt="Modern living room with elegant sofa"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Overlay Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-casawood"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Featured</p>
                    <p className="font-display font-semibold">Milano Leather Sofa</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground line-through">Rs. 3,50,000</p>
                    <p className="font-display font-bold text-casawood-green text-lg">Rs. 2,85,000</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-full opacity-20 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-casawood-green rounded-full opacity-20 blur-2xl" />
          </motion.div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
