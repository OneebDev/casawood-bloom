import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending reset email
    setIsSubmitted(true);
    toast({
      title: "Reset link sent",
      description: "Check your email for password reset instructions.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | CasaWood</title>
        <meta name="description" content="Reset your CasaWood account password." />
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
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Mail size={28} className="text-muted-foreground" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                    Forgot password?
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    No worries, we'll send you reset instructions.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
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

                  <Button type="submit" className="w-full h-12" variant="default">
                    Reset Password
                  </Button>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-casawood-green-light flex items-center justify-center">
                  <CheckCircle size={28} className="text-casawood-green" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                  Check your email
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  We sent a password reset link to<br />
                  <span className="font-medium text-foreground">{email}</span>
                </p>
                <Button
                  variant="outline"
                  className="w-full h-12"
                  onClick={() => setIsSubmitted(false)}
                >
                  Didn't receive the email? Click to resend
                </Button>
              </div>
            )}

            {/* Back to Login */}
            <Link
              to="/auth"
              className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
