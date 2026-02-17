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

const Page: React.FC = () => {
    const [formData, setFormData] = React.useState({
        title: "",
        category: "",
        description: "",
        resolutionRules: "",
        sourceOfTruth: "",
        sourceLink: "",
        predictionCloseDatetime: "",
        resolutionDatetime: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (value: string) => {
        setFormData({ ...formData, category: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
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
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className=" flex  gap-x-12  items-center " >
                            {/* Title */}
                            <div className="space-y-2 w-full ">
                                <Label>Title</Label>
                                <Input
                                    name="title"
                                    placeholder="Enter market title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Category */}
                            <div className="space-y-2 w-full  ">
                                <Label>Category</Label>
                                <Select onValueChange={handleSelectChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="crypto">Crypto</SelectItem>
                                        <SelectItem value="sports">Sports</SelectItem>
                                        <SelectItem value="politics">Politics</SelectItem>
                                        <SelectItem value="technology">Technology</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                name="description"
                                placeholder="Enter description"
                                value={formData.description}

                                onChange={handleChange}
                            />
                        </div>

                        {/* Resolution Rules */}
                        <div className="space-y-2">
                            <Label>Resolution Rules</Label>
                            <Textarea
                                name="resolutionRules"
                                placeholder="Enter resolution rules"
                                value={formData.resolutionRules}
                                onChange={handleChange}
                            />
                        </div>

                        <div className=" flex items-center  gap-x-20 " >
                            {/* Source of Truth */}
                            <div className="space-y-2 w-full ">
                                <Label>Source of Truth (Text)</Label>
                                <Input
                                    name="sourceOfTruth"
                                    placeholder="Enter source of truth"
                                    value={formData.sourceOfTruth}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Source Link */}
                            <div className="space-y-2 w-full ">
                                <Label>Source Link (Optional)</Label>
                                <Input
                                    name="sourceLink"
                                    placeholder="https://example.com"
                                    value={formData.sourceLink}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Date Section - 2 Columns */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Prediction Close Datetime</Label>
                                <Input
                                    type="datetime-local"
                                    name="predictionCloseDatetime"
                                    value={formData.predictionCloseDatetime}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Resolution Datetime</Label>
                                <Input
                                    type="datetime-local"
                                    name="resolutionDatetime"
                                    value={formData.resolutionDatetime}
                                    onChange={handleChange}
                                />
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