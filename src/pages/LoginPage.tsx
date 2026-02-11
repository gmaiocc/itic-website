import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Loader2, ArrowRight, UserPlus, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LOGIN_BG = "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const cleanEmail = email.trim();

    if (isLogin) {
      // --- LÓGICA DE LOGIN ---
      const { error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        toast({
          title: "Access Denied",
          description: "Invalid credentials. Please check your email and password.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Login successful.",
        });
        navigate("/dashboard");
      }

    } else {
      // --- LÓGICA DE REGISTO (SEGURA) ---
      
      try {
        // 1. Verificar Whitelist
        const { data: whitelistData, error: whitelistError } = await supabase
          .from('whitelist')
          .select('email')
          .eq('email', cleanEmail)
          .single();

        if (whitelistError || !whitelistData) {
          throw new Error("This email is not authorized to register. Please contact an administrator.");
        }

        // 2. Criar Conta
        const { error: signUpError } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
        });

        if (signUpError) throw signUpError;

        toast({
          title: "Account Created!",
          description: "Welcome to the club! Redirecting...",
        });
        navigate("/dashboard");

      } catch (error: any) {
        toast({
          title: "Registration Failed",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    }

    setLoading(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Navbar />

        <main className="flex-grow flex items-center justify-center relative pt-24 pb-16 px-4 overflow-hidden">

          {/* Background Elements */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img src={LOGIN_BG} alt="Office Background" className="w-full h-full object-cover grayscale opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white/90" />
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-60 mix-blend-multiply"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md relative z-10"
          >
            <Card className="border border-gray-100 shadow-2xl shadow-gray-200/50 bg-white/80 backdrop-blur-sm rounded-[2rem] overflow-hidden">
              <CardHeader className="space-y-6 text-center pt-10 pb-2">

                <motion.div 
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mx-auto w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100 shadow-inner"
                >
                  {isLogin ? (
                    <LogIn className="w-7 h-7 text-red-600 ml-1" />
                  ) : (
                    <UserPlus className="w-7 h-7 text-red-600" />
                  )}
                </motion.div>

                <div className="space-y-2">
                  <motion.div
                    key={isLogin ? "login-title" : "register-title"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-heading font-bold text-gray-900 tracking-tight">
                      {isLogin ? "Welcome Back" : "Member Access"}
                    </h2>
                    <p className="text-gray-500 text-sm mt-2 max-w-[280px] mx-auto leading-relaxed">
                      {isLogin
                        ? "Enter your credentials to access the internal dashboard."
                        : "Registration is restricted to pre-approved members only."}
                    </p>
                  </motion.div>
                </div>
              </CardHeader>

              <CardContent className="p-8 pt-4">
                <form onSubmit={handleAuth} className="space-y-5">

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-600 transition-colors duration-300" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="student@iscte-iul.pt"
                        className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-200 rounded-xl transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-600 transition-colors duration-300" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-200 rounded-xl transition-all"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-lg shadow-red-600/20 hover:shadow-red-600/30 transition-all mt-6 group"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <span className="flex items-center gap-2">
                        {isLogin ? "Sign In" : "Verify & Register"}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>

                <div className="mt-8 text-center pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={() => { setIsLogin(!isLogin); setEmail(""); setPassword(""); }}
                      className="text-red-600 hover:text-red-800 font-bold hover:underline transition-colors focus:outline-none ml-1"
                    >
                      {isLogin ? "Register now" : "Sign in"}
                    </button>
                  </p>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default LoginPage;