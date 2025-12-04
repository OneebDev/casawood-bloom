import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "Living Room", path: "/products?category=living-room" },
      { name: "Bedroom", path: "/products?category=bedroom" },
      { name: "Dining Room", path: "/products?category=dining" },
      { name: "Home Office", path: "/products?category=office" },
      { name: "Outdoor", path: "/products?category=outdoor" },
    ],
    support: [
      { name: "Contact Us", path: "/contact" },
      { name: "FAQs", path: "/faqs" },
      { name: "Shipping Info", path: "/shipping" },
      { name: "Returns", path: "/returns" },
      { name: "Track Order", path: "/track-order" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Blog", path: "/blog" },
      { name: "Sustainability", path: "/sustainability" },
      { name: "Press", path: "/press" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <footer className="bg-casawood-charcoal text-casawood-cream">
      {/* Newsletter Section */}
      <div className="border-b border-casawood-warm-gray/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-display font-semibold mb-3">
              Join the CasaWood Family
            </h3>
            <p className="text-casawood-warm-gray mb-6">
              Subscribe for exclusive offers, design inspiration, and early
              access to new collections.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent border-casawood-warm-gray/30 text-casawood-cream placeholder:text-casawood-warm-gray focus:border-primary"
              />
              <Button variant="default" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-display font-bold">
                Casa<span className="text-casawood-green">Wood</span>
              </span>
            </Link>
            <p className="text-casawood-warm-gray mb-6 max-w-sm">
              Crafting timeless furniture pieces that transform houses into
              homes. Quality craftsmanship, sustainable materials, delivered
              with care.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-casawood-warm-gray hover:text-casawood-cream transition-colors"
              >
                <Phone size={18} />
                <span>+1 (234) 567-890</span>
              </a>
              <a
                href="mailto:hello@casawood.com"
                className="flex items-center gap-3 text-casawood-warm-gray hover:text-casawood-cream transition-colors"
              >
                <Mail size={18} />
                <span>hello@casawood.com</span>
              </a>
              <div className="flex items-start gap-3 text-casawood-warm-gray">
                <MapPin size={18} className="mt-1 shrink-0" />
                <span>123 Design Street, Creative District, NY 10001</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-casawood-warm-gray/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-casawood-warm-gray hover:text-casawood-cream transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-casawood-warm-gray hover:text-casawood-cream transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-casawood-warm-gray hover:text-casawood-cream transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-casawood-warm-gray/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-casawood-warm-gray text-sm">
              © {currentYear} CasaWood. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-casawood-warm-gray hover:text-casawood-cream transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-casawood-warm-gray hover:text-casawood-cream transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-casawood-warm-gray hover:text-casawood-cream transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
