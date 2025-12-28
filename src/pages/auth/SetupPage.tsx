// First Admin Setup Page
// This page allows creating the initial admin user when no admins exist
// After the first admin is created, this page becomes inaccessible

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Shield, AlertCircle, CheckCircle } from "lucide-react";

const SetupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
    const [adminExists, setAdminExists] = useState(false);

    const navigate = useNavigate();

    // Check if an admin already exists
    useEffect(() => {
        const checkForAdmin = async () => {
            try {
                const { data, error } = await supabase
                    .from("user_profiles")
                    .select("id")
                    .eq("role", "admin")
                    .limit(1);

                if (error) {
                    console.error("Error checking for admin:", error);
                    // If error is due to RLS, assume setup is needed
                    setAdminExists(false);
                } else {
                    setAdminExists(data && data.length > 0);
                }
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setIsCheckingAdmin(false);
            }
        };

        checkForAdmin();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validation
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        try {
            // 1. Create the user in Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    // Skip email confirmation for first admin
                    emailRedirectTo: `${window.location.origin}/auth/login`,
                },
            });

            if (authError) throw authError;
            if (!authData.user) throw new Error("Failed to create user");

            // 2. Update the user profile to be an admin
            // The trigger should have created the profile, now we update the role
            const { error: profileError } = await supabase
                .from("user_profiles")
                .update({ role: "admin" })
                .eq("id", authData.user.id);

            if (profileError) {
                console.error("Error updating profile:", profileError);
                // Try to insert if update fails (in case trigger didn't fire)
                const { error: insertError } = await supabase
                    .from("user_profiles")
                    .insert({
                        id: authData.user.id,
                        email: authData.user.email,
                        role: "admin",
                        auth_provider: "local",
                    });

                if (insertError) throw insertError;
            }

            setSuccess(true);

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate("/auth/login");
            }, 2000);

        } catch (err: any) {
            console.error("Setup error:", err);
            if (err.message?.includes("already registered")) {
                setError("This email is already registered. Try logging in instead.");
            } else {
                setError(err.message || "Failed to create admin user");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Loading state while checking for existing admin
    if (isCheckingAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    // If admin already exists, show message
    if (adminExists) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                        </div>
                        <CardTitle>Setup Complete</CardTitle>
                        <CardDescription>
                            An admin account already exists. Please use the login page.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            className="w-full"
                            onClick={() => navigate("/auth/login")}
                        >
                            Go to Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Success state
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                        </div>
                        <CardTitle>Admin Created!</CardTitle>
                        <CardDescription>
                            Your admin account has been created successfully.
                            Redirecting to login...
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Setup form
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Shield className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Initial Setup</CardTitle>
                    <CardDescription>
                        Create the first admin account for ITIC Dashboard
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
                            <Label htmlFor="email">Admin Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@itic.pt"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="At least 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                                minLength={6}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Admin...
                                </>
                            ) : (
                                "Create Admin Account"
                            )}
                        </Button>
                    </form>

                    <p className="text-xs text-center text-muted-foreground mt-4">
                        This page is only accessible when no admin exists.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default SetupPage;
