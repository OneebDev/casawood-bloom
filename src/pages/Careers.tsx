import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Briefcase, Heart, Users, Sparkles, MapPin } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive medical, dental, and vision coverage for you and your family.",
  },
  {
    icon: Users,
    title: "Work-Life Balance",
    description: "Flexible schedules, remote work options, and generous PTO policy.",
  },
  {
    icon: Sparkles,
    title: "Growth & Learning",
    description: "Professional development budget and mentorship programs.",
  },
];

const openPositions = [
  {
    title: "Senior Product Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
  },
  {
    title: "Furniture Craftsman",
    department: "Production",
    location: "Brooklyn, NY",
    type: "Full-time",
  },
  {
    title: "E-commerce Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Customer Experience Specialist",
    department: "Support",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Warehouse Associate",
    department: "Operations",
    location: "Newark, NJ",
    type: "Full-time",
  },
];

const Careers = () => {
  return (
    <Layout>
      <Helmet>
        <title>Careers | CasaWood</title>
        <meta
          name="description"
          content="Join the CasaWood team. Explore career opportunities and help us craft beautiful furniture for homes everywhere."
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
              Build Your Career with Us
            </h1>
            <p className="text-lg text-casawood-warm-gray">
              Join a team passionate about creating beautiful, sustainable furniture that transforms homes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-semibold text-foreground text-center mb-12">
            Why Work at CasaWood?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-semibold text-foreground text-center mb-12">
            Open Positions
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h3 className="text-lg font-display font-semibold text-foreground">
                    {position.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {position.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {position.location}
                    </span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {position.type}
                    </span>
                  </div>
                </div>
                <Button>Apply Now</Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
              Don't See the Right Role?
            </h2>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button variant="outline" size="lg">
              Submit General Application
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
