import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Novo estado para alternar modos
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Remove espaços em branco antes e depois do email para evitar erros
    const cleanEmail = email.trim();

    if (isLogin) {
      // --- LÓGICA DE LOGIN ---
      const { error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        toast({
          title: "Erro no Login",
          description: error.message === "Invalid login credentials" 
            ? "Email ou password incorretos." 
            : error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Bem-vindo de volta!",
          description: "Login efetuado com sucesso.",
        });
        navigate("/dashboard");
      }

    } else {
      // --- LÓGICA DE REGISTO ---
      const { error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
      });

      if (error) {
        toast({
          title: "Erro no Registo",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // --- SUCESSO NO REGISTO (Mensagem Alterada) ---
        toast({
          title: "Conta criada com sucesso!",
          description: "Bem-vindo ao clube! A entrar...",
        });
        // Como a confirmação de email está desligada, entra logo:
        navigate("/dashboard");
      }
    }
    
    setLoading(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-20 pb-10 px-4 bg-background">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[120px] rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card className="border-primary/20 shadow-2xl bg-card/80 backdrop-blur-sm">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-heading font-bold">
                  {isLogin ? "Membros ITIC" : "Criar Conta"}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {isLogin 
                    ? "Acede ao repositório e materiais exclusivos" 
                    : "Junta-te à comunidade para ter acesso"}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="membro@iscte-iul.pt"
                        className="pl-9"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-9"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      isLogin ? "Entrar" : "Registar"
                    )}
                  </Button>
                </form>

                {/* Alternador Login / Registo */}
                <div className="mt-6 text-center text-sm">
                  <span className="text-muted-foreground">
                    {isLogin ? "Ainda não tens conta? " : "Já tens conta? "}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:underline font-medium focus:outline-none"
                  >
                    {isLogin ? "Registar" : "Entrar"}
                  </button>
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