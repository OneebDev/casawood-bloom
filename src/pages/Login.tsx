import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Redirect if already logged in
  if (user) {
    navigate("/");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate("/");
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          toast({
            title: "Error",
            description: "Password must be at least 6 characters.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        await signUp(formData.email, formData.password, formData.name);
        toast({
          title: "Account created!",
          description: "We have sent a verification link to your email. Please verify your email, then sign in.",
        });
        // Switch back to login form after signup
        setIsLogin(true);
      }
    } catch (error: any) {
      let errorMessage = "An error occurred. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please login instead.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        errorMessage = "Invalid email or password.";
      } else if (error.code === "auth/email-not-verified") {
        errorMessage = "Please verify your email first. Check your inbox for the verification link.";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid credentials. Please check your email and password.";
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: "Welcome!",
        description: "You have successfully logged in with Google.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Login" : "Sign Up"} | CasaWood</title>
        <meta name="description" content="Login or create an account at CasaWood to access your orders and wishlist." />
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-[#FFFDF7]">
        {/* Brand wordmark */}
        <div className="mb-10 text-3xl font-display font-semibold tracking-wide">
          <span className="text-casawood-charcoal">Casa</span>
          <span className="text-[#F5B400]">Wood</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-2xl p-8 shadow-casawood border border-border">
            {/* Logo/Brand */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-display font-semibold text-casawood-charcoal">
                {isLogin ? "Sign in" : "Create account"}
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                {isLogin
                  ? "Choose how you’d like to sign in"
                  : "Join CasaWood today"}
              </p>
            </div>

            {/* Google Sign In */}
            <Button
              type="button"
              variant="outline"
              className="w-full mb-6 h-12 px-6 gap-3 rounded-full border border-[#E4E0D6] bg-white text-sm font-medium text-[#3c4043] shadow-none hover:bg-[#fafafa] hover:text-[#3c4043]"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#EA4335"
                  d="M12 10.2v3.6h5.02c-.22 1.15-.9 2.13-1.92 2.78v2.31h3.1c1.82-1.68 2.88-4.16 2.88-7.09 0-.68-.06-1.33-.18-1.96H12z"
                />
                <path
                  fill="#34A853"
                  d="M6.62 14.32 5.98 14.8l-2.48 1.9C5.14 19.86 8.3 22 12 22c2.43 0 4.47-.8 5.96-2.11l-3.1-2.31c-.86.58-1.96.94-2.86.94-2.2 0-4.07-1.48-4.74-3.54z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.5 7.7A9.96 9.96 0 0 0 2 12c0 1.58.38 3.06 1.03 4.39l3.59-2.78A5.94 5.94 0 0 1 6.06 12c0-.62.11-1.22.3-1.79z"
                />
                <path
                  fill="#4285F4"
                  d="M12 6.04c1.32 0 2.5.45 3.43 1.32l2.57-2.57C16.45 3.56 14.43 2.8 12 2.8 8.3 2.8 5.14 4.94 3.5 7.7l3.86 2.51C7.93 7.14 9.8 6.04 12 6.04z"
                />
              </svg>
              <span>Continue with Google</span>
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-10"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="text-right">
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}

                <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                  <LogIn size={18} />
                  {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>

              {/* Toggle Login/Signup */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline font-medium"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </motion.div>
          <div className="mt-8 text-xs text-[#4A7A3C] flex items-center justify-center gap-8">
            <Link to="/privacy-policy" className="hover:underline">Privacy policy</Link>
            <Link to="/terms-of-service" className="hover:underline">Terms of service</Link>
          </div>
        </div>
      </>
  );
}

export default Login;
