"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { errorMessage } from "@/lib/msg/errorAlert";
import { CategoryType } from "@/lib/type/categoryType";
import { toast } from "sonner";
import { Controller, useForm } from 'react-hook-form';
import { useAllCategoryQuery } from "@/app/api/admin/category/categoryApi";
import { useMarketCreateMutation } from "@/app/api/admin/market/marketApi";
type FormValues = {
    title: string;
    category_id: string;
    description: string;
    resulation_roles: string;
    source_of_truth: string;
    source_link?: string;
    prediction_close_datetime: string;
    resulation_datetime: string;
};

const Page: React.FC = () => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        getValues
    } = useForm<FormValues>();

    // ========================================= ALL CATEGORY ================================

    const { data, isLoading } = useAllCategoryQuery({});

    const categoryData: CategoryType[] = data?.data || [];



    // ==================== MARKET CREATE ======================== 

    const [marketCreate, { isLoading: loading }] = useMarketCreateMutation();

 


    const onSubmit = async (formData: FormValues) => {
        try {
            const res = await marketCreate(formData).unwrap();
            toast.success(res?.message);
            reset();
        } catch (error) {
            errorMessage(error);
        }
    };


    return (
        <div className="p-8 space-y-6">
            {/* Page Heading */}
            <div>
                <h1 className="text-4xl font-bold headingColor">
                    Create New Market
                </h1>
                <p className="text-lg textColor mt-2">
                    Deploy market metadata to the database and initialize the smart contract.
                </p>
            </div>

            {/* Form Card */}
            <Card className="rounded-2xl shadow-lg">
                <CardContent className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Title + Category */}
                        <div className="flex gap-x-12 items-center">

                            {/* Title */}
                            <div className="space-y-2 w-full">
                                <Label>Title</Label>
                                <Input
                                    placeholder="Enter market title"
                                    {...register("title", {
                                        required: "Title is required",
                                    })}
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* Category */}
                            <div className="space-y-2 w-full">
                                <Label>Category</Label>

                                <Controller
                                    name="category_id"
                                    control={control}
                                    rules={{ required: "Category is required" }}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {isLoading ? (
                                                    <SelectItem value="loading" disabled>
                                                        Loading...
                                                    </SelectItem>
                                                ) : (
                                                    categoryData.map((cat) => (
                                                        <SelectItem
                                                            key={cat.id}
                                                            value={String(cat.id)}
                                                        >
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))
                                                )}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                {errors.category_id && (
                                    <p className="text-red-500 text-sm">
                                        {errors.category_id.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                placeholder="Enter description"
                                {...register("description", {
                                    required: "Description is required",
                                })}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Resolution Rules */}
                        <div className="space-y-2">
                            <Label>Resolution Rules</Label>
                            <Textarea
                                placeholder="Enter resolution rules"
                                {...register("resulation_roles", {
                                    required: "Resolution rules are required",
                                    minLength: {
                                        value: 10,
                                        message: "Resolution rules must be at least 10 characters",
                                    },
                                })}
                            />
                            {errors.resulation_roles && (
                                <p className="text-red-500 text-sm">
                                    {errors.resulation_roles.message}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-x-20">

                            {/* Source of Truth */}
                            <div className="space-y-2 w-full">
                                <Label>Source of Truth (Text)</Label>
                                <Input
                                    placeholder="Enter source of truth"
                                    {...register("source_of_truth", {
                                        required: "Source of truth is required",
                                        minLength: {
                                            value: 3,
                                            message: "Must be at least 3 characters",
                                        },
                                    })}
                                />
                                {errors.source_of_truth && (
                                    <p className="text-red-500 text-sm">
                                        {errors.source_of_truth.message}
                                    </p>
                                )}
                            </div>

                            {/* Source Link */}
                            <div className="space-y-2 w-full">
                                <Label>Source Link (Optional)</Label>
                                <Input
                                    type="url"
                                    placeholder="https://example.com"
                                    {...register("source_link", {
                                        pattern: {
                                            value:
                                                /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/,
                                            message: "Enter a valid URL",
                                        },
                                    })}
                                />
                                {errors.source_link && (
                                    <p className="text-red-500 text-sm">
                                        {errors.source_link.message}
                                    </p>
                                )}
                            </div>

                        </div>

                        {/* Date Section - 2 Columns */}
                        <div className="grid md:grid-cols-2 gap-6">

                            {/* Prediction Close Datetime */}
                            <div className="space-y-2">
                                <Label>Prediction Close Datetime</Label>
                                <Input
                                    type="datetime-local"
                                    {...register("prediction_close_datetime", {
                                        required: "Prediction close datetime is required",
                                    })}
                                />
                                {errors.prediction_close_datetime && (
                                    <p className="text-red-500 text-sm">
                                        {errors.prediction_close_datetime.message}
                                    </p>
                                )}
                            </div>

                            {/* Resolution Datetime */}
                            <div className="space-y-2">
                                <Label>Resolution Datetime</Label>
                                <Input
                                    type="datetime-local"
                                    {...register("resulation_datetime", {
                                        required: "Resolution datetime is required",
                                        validate: (value) => {
                                            const predictionDate = getValues("prediction_close_datetime");
                                            if (predictionDate && value <= predictionDate) {
                                                return "Resolution datetime must be after prediction close datetime";
                                            }
                                            return true;
                                        },
                                    })}
                                />
                                {errors.resulation_datetime && (
                                    <p className="text-red-500 text-sm">
                                        {errors.resulation_datetime.message}
                                    </p>
                                )}
                            </div>

                        </div>

                        {/* Submit Button */}
                        <div className=" flex justify-end gap-x-11 " >
                            <button className=" bg-[#F1F1F1] px-11 py-4 cursor-pointer font-semibold text-xl  textColor rounded-[23px] " >Save Draft</button>
                            <Button type="submit" className=" px-11 py-4 cursor-pointer font-semibold text-xl  text-[#FFFFFF] rounded-[23px]">
                                Pulish to DB & Contract
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;