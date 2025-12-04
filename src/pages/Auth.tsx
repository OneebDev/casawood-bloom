import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// Dummy credentials for testing
const DUMMY_EMAIL = "test@casawood.com";
const DUMMY_PASSWORD = "password123";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login validation
      if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
        toast({
          title: "Login successful!",
          description: "Welcome back to CasaWood.",
        });
        navigate("/");
      } else {
        toast({
          title: "Invalid credentials",
          description: `Use: ${DUMMY_EMAIL} / ${DUMMY_PASSWORD}`,
          variant: "destructive",
        });
      }
    } else {
      // Signup simulation
      if (email && password && name) {
        toast({
          title: "Account created!",
          description: "You can now sign in with your credentials.",
        });
        setIsLogin(true);
        setName("");
      } else {
        toast({
          title: "Please fill all fields",
          description: "All fields are required to create an account.",
          variant: "destructive",
        });
      }
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked");
  };

  const handleFacebookSignIn = () => {
    console.log("Facebook sign in clicked");
  };

  return (
    <>
      <Helmet>
        <title>{`${isLogin ? "Sign In" : "Sign Up"} | CasaWood`}</title>
        <meta name="description" content="Sign in or create an account at CasaWood to access your orders and saved items." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <h1 className="font-display text-3xl font-bold text-foreground">
                Casa<span className="text-primary">Wood</span>
              </h1>
            </Link>
          </div>

          {/* Card */}
          <div className="bg-card rounded-2xl shadow-casawood-lg p-8 border border-border">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                {isLogin ? "Sign in" : "Create account"}
              </h2>
              <p className="text-muted-foreground text-sm">
                {isLogin ? "Choose how you'd like to sign in" : "Join CasaWood today"}
              </p>
            </div>

            {/* Social Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-foreground border-border hover:bg-muted"
                onClick={handleGoogleSignIn}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-foreground border-border hover:bg-muted"
                onClick={handleFacebookSignIn}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </Button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <Separator className="bg-border" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-sm text-muted-foreground">
                or
              </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 bg-background border-border focus:border-primary"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-background border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-background border-border focus:border-primary"
                />
              </div>

              {isLogin && (
                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button type="submit" className="w-full h-12" variant="default">
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            {/* Demo Credentials Hint */}
            {isLogin && (
              <div className="mt-4 p-3 rounded-lg bg-muted border border-border">
                <p className="text-xs text-muted-foreground text-center">
                  <span className="font-medium">Demo credentials:</span><br />
                  Email: <span className="font-mono text-foreground">test@casawood.com</span><br />
                  Password: <span className="font-mono text-foreground">password123</span>
                </p>
              </div>
            )}

            {/* Toggle */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-accent font-medium hover:underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex justify-center gap-6 mt-8 text-sm">
            <Link to="/privacy-policy" className="text-accent hover:underline">
              Privacy policy
            </Link>
            <Link to="/terms" className="text-accent hover:underline">
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
