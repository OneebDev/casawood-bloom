import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Leaf, Recycle, TreePine, Droplets, Factory, Award } from "lucide-react";

const initiatives = [
  {
    icon: TreePine,
    title: "Sustainable Sourcing",
    description: "We source 100% of our wood from FSC-certified forests, ensuring responsible forest management.",
  },
  {
    icon: Recycle,
    title: "Zero Waste Manufacturing",
    description: "Wood scraps are repurposed into smaller products or converted to biofuel for our workshop heating.",
  },
  {
    icon: Droplets,
    title: "Water-Based Finishes",
    description: "Our furniture uses low-VOC, water-based finishes that are safer for your home and the environment.",
  },
  {
    icon: Factory,
    title: "Carbon Neutral Operations",
    description: "Our manufacturing facilities run on 100% renewable energy, achieving carbon neutrality since 2022.",
  },
];

const stats = [
  { value: "100%", label: "FSC-Certified Wood" },
  { value: "85%", label: "Waste Diverted from Landfill" },
  { value: "10,000+", label: "Trees Planted Annually" },
  { value: "Zero", label: "Single-Use Plastics" },
];

const Sustainability = () => {
  return (
    <Layout>
      <Helmet>
        <title>Sustainability | CasaWood</title>
        <meta
          name="description"
          content="Learn about CasaWood's commitment to sustainable furniture manufacturing and environmental responsibility."
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
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-casawood-green/20 rounded-full flex items-center justify-center">
                <Leaf className="w-8 h-8 text-casawood-green" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-casawood-charcoal mb-4">
              Our Commitment to Sustainability
            </h1>
            <p className="text-lg text-casawood-warm-gray">
              Creating beautiful furniture shouldn't come at the cost of our planet. We're committed to sustainable practices at every step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-casawood-charcoal text-casawood-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-casawood-green mb-2">
                  {stat.value}
                </div>
                <div className="text-casawood-warm-gray">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-semibold text-foreground text-center mb-12">
            Our Green Initiatives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6 p-6 bg-card border border-border rounded-xl"
              >
                <div className="w-14 h-14 bg-casawood-green/10 rounded-full flex items-center justify-center shrink-0">
                  <initiative.icon className="w-7 h-7 text-casawood-green" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    {initiative.title}
                  </h3>
                  <p className="text-muted-foreground">{initiative.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Award className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-display font-semibold text-foreground mb-6">
              Certified Sustainable
            </h2>
            <p className="text-muted-foreground mb-8">
              We're proud to hold certifications from leading environmental organizations, including FSC (Forest Stewardship Council), GREENGUARD for low emissions, and B Corp certification for meeting the highest standards of social and environmental performance.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-muted-foreground">
              <span className="px-4 py-2 bg-card border border-border rounded-full">FSC Certified</span>
              <span className="px-4 py-2 bg-card border border-border rounded-full">GREENGUARD Gold</span>
              <span className="px-4 py-2 bg-card border border-border rounded-full">B Corp Certified</span>
              <span className="px-4 py-2 bg-card border border-border rounded-full">Climate Neutral</span>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Sustainability;
