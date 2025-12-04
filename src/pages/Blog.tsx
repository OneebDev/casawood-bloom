import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Choosing the Perfect Living Room Sofa",
    excerpt: "Finding the ideal sofa involves balancing comfort, style, and durability. Here's our comprehensive guide to making the right choice.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
    category: "Buying Guide",
    date: "December 1, 2024",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Sustainable Furniture: Why It Matters",
    excerpt: "Learn about our commitment to eco-friendly practices and how sustainable furniture benefits both your home and the planet.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop",
    category: "Sustainability",
    date: "November 28, 2024",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Small Space Solutions: Maximizing Your Apartment",
    excerpt: "Discover clever furniture arrangements and multi-functional pieces that make the most of limited square footage.",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=400&fit=crop",
    category: "Interior Design",
    date: "November 22, 2024",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "The Art of Wood Finishing: Behind the Scenes",
    excerpt: "Take a peek into our workshop and learn about the traditional techniques our craftsmen use to create lasting finishes.",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=400&fit=crop",
    category: "Craftsmanship",
    date: "November 15, 2024",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "2024 Color Trends for Home Interiors",
    excerpt: "Explore this year's most popular color palettes and how to incorporate them into your furniture choices.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    category: "Trends",
    date: "November 8, 2024",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Caring for Your Wooden Furniture",
    excerpt: "Essential maintenance tips to keep your wooden furniture looking beautiful for generations to come.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
    category: "Care Guide",
    date: "November 1, 2024",
    readTime: "5 min read",
  },
];

const Blog = () => {
  return (
    <Layout>
      <Helmet>
        <title>Blog | CasaWood</title>
        <meta
          name="description"
          content="Discover interior design tips, furniture buying guides, and behind-the-scenes stories from CasaWood."
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
              Our Blog
            </h1>
            <p className="text-lg text-casawood-warm-gray">
              Design inspiration, furniture care tips, and stories from our workshop.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl overflow-hidden group"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
