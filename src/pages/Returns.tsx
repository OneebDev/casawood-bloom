import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { RotateCcw, CheckCircle, XCircle, Clock, Mail } from "lucide-react";

const returnSteps = [
  {
    step: 1,
    title: "Contact Us",
    description: "Reach out to our support team via email or phone within 30 days of delivery.",
  },
  {
    step: 2,
    title: "Get Approval",
    description: "We'll review your request and provide a Return Authorization (RA) number.",
  },
  {
    step: 3,
    title: "Pack & Ship",
    description: "Securely pack your item in original packaging. We'll email a prepaid shipping label.",
  },
  {
    step: 4,
    title: "Refund Processed",
    description: "Once received and inspected, your refund will be processed within 5-7 business days.",
  },
];

const Returns = () => {
  return (
    <Layout>
      <Helmet>
        <title>Returns Policy | CasaWood</title>
        <meta
          name="description"
          content="Learn about CasaWood's 30-day return policy. Easy returns with hassle-free refunds on eligible items."
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
              Returns & Exchanges
            </h1>
            <p className="text-lg text-casawood-warm-gray">
              We want you to love your furniture. If something isn't right, we'll make it right.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Return Process Steps */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-semibold text-casawood-charcoal text-center mb-12">
            How to Return an Item
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {returnSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Details */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-2xl font-display font-semibold text-foreground">
                  Eligible for Return
                </h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  Items in original, unused condition
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  Products with all original packaging
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  Returns requested within 30 days
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  Items with manufacturing defects
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  Wrong items received
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-2xl font-display font-semibold text-foreground">
                  Not Eligible
                </h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  Custom or made-to-order items
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  Items damaged by customer misuse
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  Products without original packaging
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  Items returned after 30 days
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  Clearance or final sale items
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
              Need Help with a Return?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help make the return process as smooth as possible.
            </p>
            <p className="text-lg">
              Email us at{" "}
              <a href="mailto:returns@casawood.com" className="text-primary font-semibold hover:underline">
                returns@casawood.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Returns;
