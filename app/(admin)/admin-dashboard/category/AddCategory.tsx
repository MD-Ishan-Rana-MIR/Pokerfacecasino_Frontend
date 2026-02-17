"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
const AddCategory = () => {
    const [category, setCategory] = useState("");

    const handleSave = () => {
        console.log("New Category:", category);
        setCategory("");
    };
    return (
        <div>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-center w-full">
                    <div>
                        <h1 className="text-5xl font-semibold text-[#1F2937]">
                            Category Registry
                        </h1>
                        <p className="mt-4 text-2xl text-[#6B6B6B]">
                            Manage dynamic taxonomies for all prediction markets.
                        </p>
                    </div>

                    {/* Modal Trigger */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="rounded-xl px-6 text-xl ">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5 20C10.5 20.3978 10.658 20.7794 10.9393 21.0607C11.2206 21.342 11.6022 21.5 12 21.5C12.3978 21.5 12.7794 21.342 13.0607 21.0607C13.342 20.7794 13.5 20.3978 13.5 20V13.5H20C20.3978 13.5 20.7794 13.342 21.0607 13.0607C21.342 12.7794 21.5 12.3978 21.5 12C21.5 11.6022 21.342 11.2206 21.0607 10.9393C20.7794 10.658 20.3978 10.5 20 10.5H13.5V4C13.5 3.60218 13.342 3.22064 13.0607 2.93934C12.7794 2.65804 12.3978 2.5 12 2.5C11.6022 2.5 11.2206 2.65804 10.9393 2.93934C10.658 3.22064 10.5 3.60218 10.5 4V10.5H4C3.60218 10.5 3.22064 10.658 2.93934 10.9393C2.65804 11.2206 2.5 11.6022 2.5 12C2.5 12.3978 2.65804 12.7794 2.93934 13.0607C3.22064 13.342 3.60218 13.5 4 13.5H10.5V20Z" fill="white" />
                                </svg>
                                ADD CATEGORY
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-md rounded-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-semibold">
                                    Add Category
                                </DialogTitle>
                            </DialogHeader>

                            {/* Input Field */}
                            <div className="space-y-3 py-4">
                                <Label>Category Name</Label>
                                <Input
                                    placeholder="Enter category name"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>

                            {/* <DialogFooter className="  "> */}
                            <div className=" space-y-4 " >
                                <Button className="w-full text-xl font-medium  " onClick={handleSave}>Confirm & Save</Button>
                                <button className=" text-[#8C8C8C] w-full text-xl font-medium cursor-pointer ">Cancel</button>
                            </div>
                            {/* </DialogFooter> */}
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default AddCategory