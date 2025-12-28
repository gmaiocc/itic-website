import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, School, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { signIn, signInWithProvider } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get redirect path or default to admin
    const from = location.state?.from?.pathname || "/admin";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await signIn(email, password);
            navigate(from, { replace: true });
        } catch (err: any) {
            console.error("Login error:", err);
            // Supabase specific error handling
            if (err.message === "Invalid login credentials") {
                setError("Invalid email or password. Please try again.");
            } else {
                setError(err.message || "Failed to sign in. Please check your connection.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSSOLogin = async () => {
        try {
            // This is a placeholder for now, but wired up to the auth context
            // When university SSO is ready, you'd configure the provider in Supabase
            // and call signInWithProvider('azure') or similar
            setError("University SSO is not yet configured. Please use email login.");
            // await signInWithProvider('azure'); 
        } catch (err: any) {
            setError("Failed to initiate SSO login.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
            <Card className="w-full max-w-md shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access the ITIC dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@itic.pt"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Button variant="link" size="sm" className="px-0 h-auto text-muted-foreground" type="button">
                                    Forgot password?
                                </Button>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <Separator className="flex-1" />
                        <span className="text-xs text-muted-foreground uppercase">Or continue with</span>
                        <Separator className="flex-1" />
                    </div>

                    <Button
                        variant="outline"
                        className="w-full relative"
                        onClick={handleSSOLogin}
                        type="button"
                        disabled={isLoading} // Enabled for demo, but logically disabled until implemented
                    >
                        <School className="mr-2 h-4 w-4" />
                        University Account
                        <span className="absolute -top-2 -right-2 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 text-[10px] text-white items-center justify-center">
                                !
                            </span>
                        </span>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                        SSO integration coming soon
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center text-xs text-muted-foreground">
                    Protected by Supabase Auth
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;
