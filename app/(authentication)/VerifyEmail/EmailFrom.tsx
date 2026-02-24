"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgetValidate } from "@/lib/validation/forgetValidation";
import { errorMessage } from "@/lib/msg/errorAlert";
import { toast } from "sonner";
import Loader from "@/components/navbar/spinner/Loader";
import { useEmailVerifyMutation } from "@/app/api/admin/auth/authApi";

export default function EmailOnlyForm() {
    const router = useRouter();

    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);

    const [emailVerify, { isLoading }] = useEmailVerifyMutation();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!forgetValidate(email, (errors) => {
            setError(errors.email || null);
        })) return;

        try {
            const res = await emailVerify({ email }).unwrap();

            if (res) {
                console.log(res);
                toast.success(res?.message);
                setEmail("");
            }

            router.push(`/otp-verify?email=${encodeURIComponent(email)}`);
        } catch (err) {
            errorMessage(err);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-center">
                        Enter Your Email
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
                            {error && (
                                <p className="text-sm text-destructive">{error}</p>
                            )}
                        </div>

                        <Button disabled={isLoading} type="submit" className="w-full">
                            {isLoading ? <Loader /> : "Continue"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}