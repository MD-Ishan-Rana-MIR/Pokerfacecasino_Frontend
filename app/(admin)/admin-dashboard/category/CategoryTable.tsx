"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import Loader from "@/components/navbar/spinner/Loader";
import { CategoryType } from "@/lib/type/categoryType";
import { deleteAlert } from "@/lib/msg/deleteAlert";
import { toast } from "sonner";
import { errorMessage } from "@/lib/msg/errorAlert";
import { useAllCategoryQuery, useCategoryUpdateMutation, useDeleteCategoryMutation } from "@/app/api/admin/category/categoryApi";

interface Category {
    id: number;
    name: string;
    status: string | "Active" | "Inactive";
}

const CategoryTable: React.FC = () => {


    const [viewCategory, setViewCategory] = useState<Category | null>(null);
    const [updateCategory, setUpdateCategory] = useState<Category | null>(null);


    // ==================== Category Delete ============================

    const [deleteCategory] = useDeleteCategoryMutation();

    const handleDelete = async (id: number) => {

        try {
            const res = await deleteAlert();

            if (res.isConfirmed) {
                const res = await deleteCategory(id).unwrap();
                console.log(res)
                if (res) {
                    return toast.success(res?.message)
                }
            }
        } catch (error) {
            return errorMessage(error);
        }



    };



    // ======================== ALL CATEGORY API =================================

    const { data, isLoading } = useAllCategoryQuery({});

    const categoryData: CategoryType[] = data?.data || [];


    // ======================== CATEGORY UPDATE API =================================



    const [categoryUpdate, { isLoading: update }] = useCategoryUpdateMutation()




    const handleUpdateSave = async () => {
        const id = updateCategory!.id;
        if (!updateCategory) return;
        try {
            const res = await categoryUpdate({ id, updateCategory }).unwrap();
            if (res) {
                console.log(res)
                setUpdateCategory(null);
            }
        } catch (error) {
            return errorMessage(error)
        }
    };













    if (isLoading) {
        return (
            <div className=" mt-20 " >
                <Loader  ></Loader>
            </div>
        )
    }




    return (
        <div className="mt-18">
            <div className="overflow-x-auto border rounded-lg">
                <table className="w-full">
                    <thead className="bg-[#E9F4FF] text-[#4F7FD6] font-semibold  ">
                        <tr>
                            <th className="px-6 py-3 text-center">ID</th>
                            <th className="px-6 py-3 text-center">Category Name</th>
                            <th className="px-6 py-3 text-center">Status</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {categoryData.map((cat, i) => (
                            <tr key={cat.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-3 text-center">{i + 1}</td>
                                <td className="px-6 py-3 text-center">{cat.name}</td>
                                <td className="px-6 py-3 text-center">
                                    <Badge
                                        className={`${cat.status === "Active"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {cat.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-3 flex justify-center gap-2">
                                    {/* View Button */}
                                    <Button
                                        size="sm"
                                        className="bg-[#EDF2FB]"
                                        onClick={() => setViewCategory(cat)}
                                    >
                                        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.3889 4.25C9.63744 4.25 8.91677 4.54851 8.38542 5.07986C7.85407 5.61122 7.55556 6.33189 7.55556 7.08333C7.55556 7.83478 7.85407 8.55545 8.38542 9.0868C8.91677 9.61816 9.63744 9.91667 10.3889 9.91667C11.1403 9.91667 11.861 9.61816 12.3924 9.0868C12.9237 8.55545 13.2222 7.83478 13.2222 7.08333C13.2222 6.33189 12.9237 5.61122 12.3924 5.07986C11.861 4.54851 11.1403 4.25 10.3889 4.25ZM10.3889 11.8056C9.13648 11.8056 7.93536 11.308 7.04977 10.4224C6.16419 9.53686 5.66667 8.33574 5.66667 7.08333C5.66667 5.83092 6.16419 4.62981 7.04977 3.74422C7.93536 2.85863 9.13648 2.36111 10.3889 2.36111C11.6413 2.36111 12.8424 2.85863 13.728 3.74422C14.6136 4.62981 15.1111 5.83092 15.1111 7.08333C15.1111 8.33574 14.6136 9.53686 13.728 10.4224C12.8424 11.308 11.6413 11.8056 10.3889 11.8056ZM10.3889 0C5.66667 0 1.63389 2.93722 0 7.08333C1.63389 11.2294 5.66667 14.1667 10.3889 14.1667C15.1111 14.1667 19.1439 11.2294 20.7778 7.08333C19.1439 2.93722 15.1111 0 10.3889 0Z" fill="#4F7FD6" />
                                        </svg>

                                    </Button>

                                    {/* Update Button */}
                                    <Button
                                        size="sm"
                                        className=" cursor-pointer bg-[#FFF4CE]  "

                                        onClick={() => setUpdateCategory(cat)}
                                    >
                                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.61117 6.61133H5.66672C5.16576 6.61133 4.68531 6.81034 4.33107 7.16457C3.97684 7.51881 3.77783 7.99925 3.77783 8.50022V17.0002C3.77783 17.5012 3.97684 17.9816 4.33107 18.3359C4.68531 18.6901 5.16576 18.8891 5.66672 18.8891H14.1667C14.6677 18.8891 15.1481 18.6901 15.5024 18.3359C15.8566 17.9816 16.0556 17.5012 16.0556 17.0002V16.0558" stroke="#FFA600" strokeWidth="1.13333" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15.1111 4.72249L17.9444 7.55582M19.2525 6.21943C19.6245 5.84746 19.8334 5.34297 19.8334 4.81693C19.8334 4.29089 19.6245 3.7864 19.2525 3.41443C18.8805 3.04246 18.376 2.8335 17.85 2.8335C17.324 2.8335 16.8195 3.04246 16.4475 3.41443L8.5 11.3336V14.1669H11.3333L19.2525 6.21943Z" stroke="#FFA600" strokeWidth="1.13333" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </Button>

                                    {/* Delete Button */}
                                    <Button
                                        size="sm"
                                        className=" bg-[#FFEDEA] cursor-pointer "
                                        onClick={() => handleDelete(cat.id)}
                                    >
                                        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.2222 0.944444H9.91667L8.97222 0H4.25L3.30556 0.944444H0V2.83333H13.2222M0.944445 15.1111C0.944445 15.6121 1.14345 16.0925 1.49769 16.4468C1.85192 16.801 2.33237 17 2.83333 17H10.3889C10.8899 17 11.3703 16.801 11.7245 16.4468C12.0788 16.0925 12.2778 15.6121 12.2778 15.1111V3.77778H0.944445V15.1111Z" fill="#FF4B31" />
                                        </svg>

                                    </Button>

                                    {/* View Modal */}
                                    {viewCategory && viewCategory.id === cat.id && (
                                        <Dialog open={true} onOpenChange={() => setViewCategory(null)}>
                                            <DialogContent className="sm:max-w-md rounded-2xl">
                                                <DialogHeader>
                                                    <DialogTitle className=" text-[#1F2937] text-3xl font-semibold  " >Category Details</DialogTitle>
                                                </DialogHeader>
                                                {/* <div className="p-7.5 rounded-4xl bg-[#E9EAEB] mt-12 ">
                                                    <p className=" text-lg textColor " >INTERNAL REGISTER ID</p>
                                                    <p className=" text-[#4F7FD6] text-2xl " >#221123</p>
                                                </div> */}
                                                <div className="p-7.5 rounded-4xl bg-[#E9EAEB] mt-5 ">
                                                    <p className=" text-lg textColor " >DISPLAY NAME</p>
                                                    <p className=" text-[#1F2937] font-semibold text-2xl " >{viewCategory?.name}</p>
                                                </div>
                                                <div className="p-7.5 rounded-4xl bg-[#E9EAEB] mt-5 ">
                                                    <p className=" text-lg textColor " >STATUS</p>
                                                    <Badge
                                                        className={`${viewCategory.status === "Active"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                            }`}
                                                    >
                                                        {viewCategory.status}
                                                    </Badge>
                                                </div>
                                                <DialogFooter className="flex justify-end">
                                                    <Button onClick={() => setViewCategory(null)}>Close</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    )}

                                    {/* Update Modal */}
                                    {updateCategory && updateCategory.id === cat.id && (
                                        <Dialog open={true} onOpenChange={() => setUpdateCategory(null)}>
                                            <DialogContent className="sm:max-w-md rounded-2xl">
                                                <DialogHeader>
                                                    <DialogTitle>Update Category</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-4 py-2">
                                                    <div className="space-y-2">
                                                        <Label className=" my-2 " >Category Name</Label>
                                                        <Input

                                                            value={updateCategory.name}
                                                            onChange={(e) =>
                                                                setUpdateCategory({ ...updateCategory, name: e.target.value })
                                                            }
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Status</Label>
                                                        <Select
                                                            value={updateCategory.status}
                                                            onValueChange={(value: "Active" | "Inactive") =>
                                                                setUpdateCategory({ ...updateCategory, status: value })
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Active">Active</SelectItem>
                                                                <SelectItem value="Inactive">Inactive</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <DialogFooter className="flex justify-end gap-3">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => setUpdateCategory(null)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={handleUpdateSave}>
                                                        {
                                                            update ? <div> <Loader></Loader> </div> : "Save"
                                                        }
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {categoryData.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center py-6 text-gray-500 font-medium">
                                    No categories found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryTable;