"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { redirect } from "next/navigation";
import { validate } from './../../../lib/validation/loginValidation';
import { errorMessage } from "@/lib/msg/errorAlert";
import { toast } from "sonner";
import Loader from "@/components/navbar/spinner/Loader";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/app/api/admin/auth/authApi";

export default function LoginForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});


    const [login, { isLoading }] = useLoginMutation()

    const payload = {
        email, password
    }

    const router = useRouter();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!validate(email, password, setErrors)) return;



        try {

            const res = await login(payload).unwrap()
            if (res) {

                toast.success(res?.message);
                localStorage.setItem("token", res?.data?.token);
                setEmail("");
                setPassword("");
                router.push("/admin-dashboard")
            }
        } catch (error) {
            console.log(error)
            return errorMessage(error)
        }


    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-center">
                        Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="button"
                                variant="link"

                                className="px-0 text-sm cursor-pointer "
                                onClick={() => router.push("/VerifyEmail")}
                            >
                                Forgot password?
                            </Button>
                        </div>

                        <Button disabled={isLoading} type="submit" className="w-full">
                            {
                                isLoading ? <Loader></Loader> : "Sign In"
                            }
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
