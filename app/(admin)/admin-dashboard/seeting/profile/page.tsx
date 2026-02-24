"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { updateAlert } from "@/lib/msg/updateAlert";
import { errorMessage } from "@/lib/msg/errorAlert";
import { toast } from "sonner";
import Loader from "@/components/navbar/spinner/Loader";
import { usePasswordUpdateMutation, useProfileQuery, useProfileUpdateMutation } from "@/app/api/admin/auth/authApi";

export default function ProfilePage() {
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = React.useState(false);





    const [errors, setErrors] = React.useState<{ password?: string; confirmPassword?: string }>({});

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Create preview
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };




    // =========================== PROFILE API ========================


    const { data } = useProfileQuery({});

    console.log(data?.data?.user?.avatar_url);


    React.useEffect(() => {
        const user = data?.data?.user;

        if (!user) return;

        setName(user.full_name ?? "");
        setEmail(user.email ?? "");

        // Make sure avatar exists
        if (user?.avatar_url) {
            setImagePreview(user.avatar_url);
        }
    }, [data]);


    // ================================== PROFILE UPDATE API ==========================

    const [profileUpdate, { isLoading }] = useProfileUpdateMutation();

    const formData = new FormData();

    formData.append("full_name", name);
    formData.append("email", email);

    if (imagePreview) {
        formData.append("avatar_url", imagePreview);
    }


    const handleUpdateProfile = async () => {
        const res = await updateAlert();
        if (res.isConfirmed) {
            try {
                const res = await profileUpdate(formData).unwrap();
                if (res) {
                    toast.success(res?.message)
                }
            } catch (error) {
                return errorMessage(error)

            }
        }
    }


    // ========================================= PASSWORD UPDATE =======================================

    const [passwordUpdate, { isLoading: passLoading }] = usePasswordUpdateMutation();

    const [currentPass, setCurrentPass] = React.useState("")
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");


    const [showPassword, setShowPassword] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [showCurr, setShowCurr] = React.useState(false);

    const payload = {
        current_password: currentPass,
        password: password,
        password_confirmation: confirmPassword
    }

    const handlePasswordUpdate = async () => {
        const newErrors: { password?: string; confirmPassword?: string } = {};

        // ✅ Validation
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        // ❗ STOP if validation failed
        if (Object.keys(newErrors).length > 0) return;

        try {
            const alertRes = await updateAlert();

            if (!alertRes.isConfirmed) return;

            const payload = {
                current_password: currentPass,
                new_password: password,
                confirm_password: confirmPassword,
            };

            const res = await passwordUpdate(payload).unwrap();

            if (res) {
                toast.success(res?.message);
                setIsModalOpen(false);
                setPassword("");
                setConfirmPassword("");
                setCurrentPass("");
            }
        } catch (error) {
            return errorMessage(error);
        }
    };




    return (
        <div className=" flex justify-center  p-6">
            <Card className="w-full max-w-xl shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-center">
                        Profile
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-28 h-28 rounded-full overflow-hidden border">
                            {imagePreview ? (
                                <Image
                                    src={imagePreview}
                                    alt="Profile"
                                    width={112}
                                    height={112}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm">
                                    No Image
                                </div>
                            )}
                        </div>
                        <Label className="cursor-pointer text-sm text-primary">
                            Change Profile Image
                            <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </Label>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-4 pt-4">
                        <Button onClick={handleUpdateProfile} className="w-full">
                            {
                                isLoading ? <> <Loader></Loader> </> : "Update Profile"
                            }
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Update Password
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Password Modal */}
            {isModalOpen && (
                <div className="fixed inset-0   flex items-center justify-center p-4">
                    <Card className="w-full max-w-md rounded-2xl shadow-xl relative">
                        <CardHeader>
                            <CardTitle>Update Password</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {/* Current password Password */}
                            <div className="space-y-2">
                                <Label>Current Password</Label>
                                <div className="relative">
                                    <Input
                                        type={showCurr ? "text" : "password"}
                                        value={password}
                                        onChange={(e) =>
                                            setCurrentPass(e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCurr(!showCurr)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground cursor-pointer "
                                    >
                                        {showCurr ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-destructive">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            {/* New Password */}
                            <div className="space-y-2">
                                <Label>New Password</Label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground cursor-pointer "
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
                                <div className="relative">
                                    <Input
                                        type={show ? "text" : "password"}
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShow(!show)
                                        }
                                        className="absolute right-3 top-1/2  cursor-pointer -translate-y-1/2 text-sm text-muted-foreground"
                                    >
                                        {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-destructive">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col  gap-3 pt-2">
                                <Button
                                    className="w-full"
                                    onClick={handlePasswordUpdate}
                                >
                                    Save Password
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </Button>

                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}