import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Home, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | CasaWood</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center bg-hero-gradient">
          <div className="text-center px-4">
            <h1 className="text-8xl font-display font-bold text-casawood-green mb-4">404</h1>
            <h2 className="text-2xl font-display font-semibold text-casawood-charcoal mb-4">
              Page Not Found
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Oops! The page you're looking for seems to have wandered off. Let's get you back on track.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="hero" size="lg">
                <Link to="/">
                  <Home size={18} />
                  Go Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/products">
                  <ArrowLeft size={18} />
                  Browse Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NotFound;
