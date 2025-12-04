import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Leaf, Users, Award, Heart } from "lucide-react";
import Layout from "@/components/layout/Layout";

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "50K+", label: "Happy Customers" },
  { value: "200+", label: "Artisan Partners" },
  { value: "98%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We source responsibly harvested woods and eco-friendly materials to minimize our environmental footprint.",
  },
  {
    icon: Users,
    title: "Craftsmanship",
    description:
      "Every piece is crafted by skilled artisans who take pride in their work, ensuring exceptional quality.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "We never compromise on materials or construction, offering furniture built to last generations.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Your satisfaction is our priority. We provide personalized service and support at every step.",
  },
];

const team = [
  {
    name: "Elena Martinez",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
  },
  {
    name: "David Chen",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  },
  {
    name: "Sarah Johnson",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
  },
  {
    name: "Michael Roberts",
    role: "Master Craftsman",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | CasaWood</title>
        <meta
          name="description"
          content="Learn about CasaWood's commitment to quality craftsmanship, sustainable materials, and exceptional customer service. 15+ years of furniture excellence."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative bg-hero-gradient py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block text-casawood-green font-medium mb-4"
              >
                Our Story
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-display font-bold text-casawood-charcoal mb-6"
              >
                Crafting Furniture, Creating Homes
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground"
              >
                Since 2009, CasaWood has been dedicated to creating beautiful, sustainable
                furniture that transforms houses into homes. Our passion for quality
                craftsmanship and customer satisfaction drives everything we do.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-casawood-green">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl lg:text-5xl font-display font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-casawood-green-light">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=600&fit=crop"
                  alt="CasaWood workshop"
                  className="rounded-2xl shadow-casawood-lg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-display font-bold text-casawood-charcoal mb-6">
                  From Passion to Purpose
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    CasaWood was born from a simple belief: everyone deserves beautiful,
                    well-crafted furniture that doesn't cost the earth—literally or
                    figuratively.
                  </p>
                  <p>
                    What started as a small workshop has grown into a beloved brand, but our
                    core values remain unchanged. We partner with skilled artisans who share
                    our commitment to quality, using sustainably sourced materials and
                    time-honored techniques.
                  </p>
                  <p>
                    Every piece we create tells a story—of careful material selection, expert
                    craftsmanship, and a dedication to designs that stand the test of time.
                    We're not just selling furniture; we're helping you create spaces where
                    memories are made.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-casawood-charcoal mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide every decision we make, from design to delivery.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-casawood text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
                    <value.icon size={28} className="text-casawood-green" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-casawood-charcoal mb-4">
                Meet Our Team
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind CasaWood who make it all possible.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4 shadow-casawood"
                  />
                  <h3 className="font-display font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
