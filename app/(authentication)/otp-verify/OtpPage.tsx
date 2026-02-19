"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

export default function OtpPage() {
    const [otp, setOtp] = React.useState<string[]>(["", "", "", "", "", ""]);
    const [error, setError] = React.useState<string | null>(null);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.some((digit) => digit === "")) {
            setError("Please enter the complete 6-digit code");
            return;
        }

        setError(null);
        const finalOtp = otp.join("");
        console.log("OTP Submitted:", finalOtp);

        redirect("/reset-password");
    };

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
                                
                                onClick={() => console.log("Resend OTP")}
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