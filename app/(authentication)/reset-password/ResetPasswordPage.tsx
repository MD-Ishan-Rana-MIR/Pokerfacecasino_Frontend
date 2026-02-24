"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect, useRouter } from "next/navigation";
import { getValidToken } from "@/lib/token/token";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [errors, setErrors] = React.useState<{
        password?: string;
        confirmPassword?: string;
    }>({});

    const router = useRouter()

    React.useEffect(() => {
        const token = getValidToken();

        console.log("page token is", token)

        if (!token) {
            router.push("/admin-login"); // redirect if expired
        }
    }, [router]);

    function validate() {
        const newErrors: {
            password?: string;
            confirmPassword?: string;
        } = {};

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!validate()) return;

        console.log("Password Reset Successful:", password);

        redirect("/login");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-center">
                        Reset Password
                    </CardTitle>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                        Enter your new password below
                    </p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                        {/* New Password */}
                        <div className="space-y-2">
                            <Label>New Password</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label>Confirm Password</Label>
                            <Input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-destructive">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <Button type="submit" className="w-full">
                            Update Password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}