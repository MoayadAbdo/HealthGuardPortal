import { useState } from "react";
import { useLocation } from "wouter";
import { Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      if (formData.username && formData.password) {
        toast({
          title: "Welcome back",
          description: "Successfully logged in to HealthGuard Portal",
        });
        setLocation("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter valid credentials",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/20 p-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
      </div>

      <Card className="w-full max-w-md border-border/50 shadow-2xl shadow-primary/5 backdrop-blur-sm bg-card/80">
        <CardHeader className="space-y-4 flex flex-col items-center text-center pt-8 pb-2">
          {/* LOGO */}
          <div className="p-4 bg-primary/10 rounded-2xl mb-2 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="HealthGuard Logo"
              className="h-20 w-20 object-contain"
            />
          </div>

          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-primary">
              HealthGuard Portal
            </CardTitle>
            <CardDescription className="text-base">
              Secure Medical Administration Access
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username */}
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Username"
                className="pl-10 h-11 bg-background/50 border-border focus:ring-primary/20 transition-all"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10 h-11 bg-background/50 border-border focus:ring-primary/20 transition-all"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:to-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
              disabled={isLoading}
            >
              {isLoading ? (
                "Authenticating..."
              ) : (
                <span className="flex items-center gap-2">
                  Sign In to Dashboard <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>

            {/* Footer */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Having trouble? </span>
              <a href="#" className="text-primary font-medium hover:underline">
                Contact IT Support
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
