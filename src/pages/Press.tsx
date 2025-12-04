import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Newspaper, Download, Mail, ExternalLink } from "lucide-react";

const pressReleases = [
  {
    title: "CasaWood Expands to West Coast with New Los Angeles Showroom",
    date: "November 15, 2024",
    excerpt: "Premium furniture brand opens flagship location in Downtown LA's Arts District.",
  },
  {
    title: "CasaWood Achieves Carbon Neutrality Across All Operations",
    date: "October 22, 2024",
    excerpt: "Company milestone marks significant progress in sustainability commitment.",
  },
  {
    title: "New 2024 Autumn Collection Launches with 50+ Designs",
    date: "September 5, 2024",
    excerpt: "Latest collection features warm tones and sustainable materials inspired by nature.",
  },
  {
    title: "CasaWood Partners with Habitat for Humanity",
    date: "August 12, 2024",
    excerpt: "Furniture donation program will furnish 100 homes for families in need.",
  },
];

const mediaFeatures = [
  { publication: "Architectural Digest", quote: "CasaWood is redefining sustainable luxury furniture." },
  { publication: "Elle Decor", quote: "A brand that proves style and sustainability can coexist beautifully." },
  { publication: "The New York Times", quote: "The furniture startup making waves in the industry." },
  { publication: "Forbes", quote: "One of the most innovative furniture companies to watch." },
];

const Press = () => {
  return (
    <Layout>
      <Helmet>
        <title>Press | CasaWood</title>
        <meta
          name="description"
          content="CasaWood press room. Find press releases, media coverage, and brand assets."
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
              Press Room
            </h1>
            <p className="text-lg text-casawood-warm-gray">
              Find the latest news, press releases, and media resources about CasaWood.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Media Features */}
      <section className="py-16 md:py-24 bg-casawood-charcoal text-casawood-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-semibold text-center mb-12">
            As Featured In
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mediaFeatures.map((feature, index) => (
              <motion.div
                key={feature.publication}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-casawood-warm-gray/20 rounded-xl p-6"
              >
                <p className="text-lg italic text-casawood-warm-gray mb-4">
                  "{feature.quote}"
                </p>
                <p className="font-display font-semibold text-casawood-green">
                  — {feature.publication}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-semibold text-foreground text-center mb-12">
            Latest Press Releases
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <span className="text-sm text-muted-foreground">{release.date}</span>
                  <h3 className="text-lg font-display font-semibold text-foreground mt-1">
                    {release.title}
                  </h3>
                  <p className="text-muted-foreground mt-2">{release.excerpt}</p>
                </div>
                <Button variant="outline" className="shrink-0">
                  Read More <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit & Contact */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-xl p-8 text-center"
            >
              <Download className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                Media Kit
              </h3>
              <p className="text-muted-foreground mb-6">
                Download our brand assets, logos, and product images for media use.
              </p>
              <Button>Download Media Kit</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-8 text-center"
            >
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                Press Contact
              </h3>
              <p className="text-muted-foreground mb-6">
                For press inquiries, interviews, and media requests.
              </p>
              <Button variant="outline">
                <a href="mailto:press@casawood.com">press@casawood.com</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Press;
