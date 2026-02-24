"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { errorMessage } from "@/lib/msg/errorAlert";
import { toast } from "sonner";
import { saveToken } from "@/lib/token/token";
import { useEmailVerifyMutation, useOtpVerifyMutation } from "@/app/api/admin/auth/authApi";

export default function OtpPage() {
    const [otp, setOtp] = React.useState<string[]>(["", "", "", "", "", ""]);
    const [error, setError] = React.useState<string | null>(null);
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    // resend otp 
    const [emailVerify, { isLoading }] = useEmailVerifyMutation();

    const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return; // Only numbers

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };


    const [otpVerify, { isLoading: otpLoading }] = useOtpVerifyMutation();


    // ========================= otp verify ==========================

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.some((digit) => digit === "")) {
            setError("Please enter the complete 6-digit code");
            return;
        }

        setError(null);
        const finalOtp = otp.join("");
        console.log("OTP Submitted:", finalOtp);
        console.log(finalOtp)


        const payload = {
            otp: finalOtp
        }

        try {
            const res = await otpVerify(payload).unwrap();
            if (res) {
                console.log(res)
                console.log(res?.data?.token)
                saveToken(res?.data?.token)
                toast.success(res?.message);
                router.push("/reset-password");
            }
        } catch (error) {
            return errorMessage(error)
        }
    };



    // ========================= resend otp ==========================

    const payload = {
        email: email
    }

    const handleResendOtp = async () => {
        try {
            const res = await emailVerify(payload).unwrap();
            if (res) {
                toast.success(res?.message)
            }
        } catch (error) {
            return errorMessage(error)
        }
    }










    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-center">
                        Verify OTP
                    </CardTitle>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                        Enter the 6-digit code sent to your email
                    </p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-center gap-3">
                            {otp.map((digit, index) => (
                                <Input
                                    key={index}
                                    ref={(el) => {
                                        inputsRef.current[index] = el;
                                    }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) =>
                                        handleChange(e.target.value, index)
                                    }
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-12 h-12 text-center text-lg font-semibold"
                                />
                            ))}
                        </div>

                        {error && (
                            <p className="text-sm text-destructive text-center">
                                {error}
                            </p>
                        )}

                        <Button type="submit" className="w-full">
                            Verify
                        </Button>

                        <div className="text-center">
                            <Button
                                type="button"
                                variant="link"
                                className="text-sm"

                                onClick={handleResendOtp}
                            >
                                Resend Code
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}