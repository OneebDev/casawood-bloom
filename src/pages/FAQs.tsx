import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business day delivery. Large furniture items may require additional time for white-glove delivery service.",
      },
      {
        question: "Do you offer free shipping?",
        answer: "Yes! We offer free standard shipping on all orders over $500. Orders under $500 have a flat shipping rate of $49.",
      },
      {
        question: "Can I track my order?",
        answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can also track your order through our Track Order page.",
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently, we ship within the United States and Canada. International shipping options are coming soon.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items. Products must be in original condition with all packaging. Custom orders are final sale.",
      },
      {
        question: "How do I initiate a return?",
        answer: "Contact our support team through the Contact Us page or email returns@casawood.com. We'll provide you with a return shipping label and instructions.",
      },
      {
        question: "Are there any restocking fees?",
        answer: "Standard returns have no restocking fee. However, items returned after 30 days or in non-original condition may be subject to a 15% restocking fee.",
      },
    ],
  },
  {
    category: "Products & Care",
    questions: [
      {
        question: "What materials do you use?",
        answer: "We use sustainably sourced hardwoods, premium fabrics, and eco-friendly finishes. Each product page lists specific materials used.",
      },
      {
        question: "How do I care for my furniture?",
        answer: "We recommend regular dusting with a soft cloth. For wood surfaces, use a furniture polish quarterly. Fabric items can be spot cleaned with mild soap and water.",
      },
      {
        question: "Do you offer assembly services?",
        answer: "Yes! Our white-glove delivery service includes full assembly and placement in your home. This service is complimentary for orders over $1,500.",
      },
    ],
  },
  {
    category: "Payment & Security",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and Cash on Delivery for select areas.",
      },
      {
        question: "Is my payment information secure?",
        answer: "Absolutely. We use industry-standard SSL encryption and never store your complete payment information on our servers.",
      },
      {
        question: "Do you offer financing options?",
        answer: "Yes! We partner with Affirm to offer flexible payment plans. You can split your purchase into 3, 6, or 12 monthly payments.",
      },
    ],
  },
];

const FAQs = () => {
  return (
    <Layout>
      <Helmet>
        <title>FAQs | CasaWood</title>
        <meta
          name="description"
          content="Find answers to frequently asked questions about CasaWood orders, shipping, returns, and product care."
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
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-casawood-warm-gray">
              Find answers to common questions about our products, shipping, returns, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-display font-semibold text-casawood-charcoal mb-6">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${categoryIndex}-${index}`}
                    className="border border-border rounded-lg px-6 bg-card"
                  >
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default FAQs;
