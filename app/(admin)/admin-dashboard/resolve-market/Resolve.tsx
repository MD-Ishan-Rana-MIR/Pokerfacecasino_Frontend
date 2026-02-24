"use client"

import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FaRegTrashAlt } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAllMarketByAdminQuery, useMarketDeleteMutation, useMarketResolveMutation, useMarketUpdateMutation, useSingleMarketQuery } from "@/app/api/admin/market/marketApi";
import { AdminMarketType } from "@/lib/type/marketType";
import moment from "moment";
import { Edit2Icon, } from "lucide-react";
import { errorMessage } from "@/lib/msg/errorAlert";
import { deleteAlert } from "@/lib/msg/deleteAlert";
import { toast } from "sonner";
import { useAllCategoryQuery } from "@/app/api/admin/category/categoryApi";
import { CategoryType } from "@/lib/type/categoryType";
import { updateAlert } from "@/lib/msg/updateAlert";
import Loader from "@/components/navbar/spinner/Loader";
import MarketSkeleton from "@/components/ui/MarketSkeleton";

declare global {
    interface Window {
        ethereum?: any;
    }
}

const Resolve = () => {
    const [open, setOpen] = useState(false);


    const [loading, setLoading] = useState(false);

    // ✅ Transfer function (Ethers v6)
    const triggerResolution = async (
        userWallet: string,
        amount: number
    ) => {
        try {
            if (!window.ethereum) {
                alert("MetaMask not found!");
                return;
            }

            // if (!outcome) {
            //     alert("Please select an outcome first.");
            //     return;
            // }

            // if (!proof) {
            //     alert("Resolution proof is required.");
            //     return;
            // }

            setLoading(true);

            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);

            const signer = await provider.getSigner();
            const adminAddress = await signer.getAddress();

            console.log("Admin Wallet:", adminAddress);
            console.log("Sending to:", userWallet);

            const tx = await signer.sendTransaction({
                to: userWallet,
                value: ethers.parseEther(amount.toString()),
            });

            alert("Transaction sent! Hash: " + tx.hash);

            await tx.wait();

            alert("Transfer successful!");
            setOpen(false);

        } catch (err: any) {
            console.error(err);
            alert("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };


    const { data, isLoading } = useAllMarketByAdminQuery({});

    console.log("admin market is", data?.data);

    const market: AdminMarketType[] = data?.data || [];



    // ========================================== Market Delete ========================================= 

    const [marketDelete] = useMarketDeleteMutation();

    const handleMarketDelete = async (id: number) => {
        try {
            const res = await deleteAlert();
            if (res.isConfirmed) {
                const res = await marketDelete(id).unwrap();
                if (res) {
                    toast.success(res?.message)
                }
            }
        } catch (error) {
            return errorMessage(error);
        }
    };


    // ========================================== Market Update ========================================= 

    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [id, setId] = useState<number | null>(null);



    // ===================================== Single Market Api ==========================================
    const { data: category } = useAllCategoryQuery({});

    const categoryData: CategoryType[] = category?.data || [];

    const { data: singleMarket } = useSingleMarketQuery(id);

    console.log("Single market is", singleMarket?.data);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [resulation_roles, setResulation_roles] = useState("");
    const [source_of_truth, setSource_of_truth] = useState("");
    const [source_link, setSource_link] = useState("");
    const [prediction_close_datetime, setPrediction_close_datetime] = useState("");
    const [resulation_datetime, setResulation_datetime] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");


    useEffect(() => {
        if (singleMarket?.data) {
            setTitle(singleMarket?.data?.title);
            setDescription(singleMarket?.data?.description);
            setResulation_roles(singleMarket?.data?.resulation_roles);
            setSource_of_truth(singleMarket?.data?.source_of_truth);
            setSource_link(singleMarket?.data?.source_link);
            setPrediction_close_datetime(singleMarket?.data?.prediction_close_datetime);
            setResulation_datetime(singleMarket?.data?.resulation_datetime);
            setSelectedCategory(singleMarket?.data?.category_id);
        }
    }, [singleMarket?.data]);

    const payload = {
        title: title,
        category_id: selectedCategory,
        description: description,
        resulation_roles: resulation_roles,
        source_of_truth: source_of_truth,
        source_link: source_link,
        prediction_close_datetime: prediction_close_datetime,
        resulation_datetime: resulation_datetime,

    };



    // ========================================== Market Update =========================================

    const [marketUpdate, { isLoading: marketLoading }] = useMarketUpdateMutation();

    const openModal = (id: number) => {
        setId(id)
        setUpdateModal(!updateModal);
    }
    const handleUpdateModal = async (e: React.FormEvent) => {
        e.preventDefault(); // 🔥 prevents browser reload

        try {
            const alert = await updateAlert();

            if (alert.isConfirmed) {
                const response = await marketUpdate({ id, payload }).unwrap();
                toast.success(response?.message);
                setUpdateModal(false);
            }
        } catch (error) {
            errorMessage(error);
        }
    };



    // ========================================== Market Resolve =========================================

    const [marketResolve] = useMarketResolveMutation();
    const [proof, setProof] = useState<string>("");

    const [outcome, setOutcome] = useState<string>("");
    const [resolveId, setResolveId] = useState<number | null>(null);

    const marketResolveModalOpen = (id: number) => {
        setOpen(true)
        setResolveId(id)
    }



    const formData = {
        market_id: resolveId,
        choose_result: outcome,
        resolution_proof: proof
    }


    const handleMarketResolve = async () => {
        try {
            const res = await marketResolve(formData).unwrap();

            if (res) {
                console.log(res);
                toast.success(res?.message)
                setOutcome("");
                setProof("");
                setOpen(false)
            }

        } catch (error) {
            return errorMessage(error)
        }
    }





    if (isLoading) {
        return (
            <div>
                <MarketSkeleton />
            </div>
        )
    }







    return (
        <div>
            {/* Header */}
            <div>
                <h1 className="text-5xl font-semibold text-[#1F2937]">
                    Resolve Markets
                </h1>
                <p className="mt-4 text-2xl text-[#6B6B6B]">
                    Select the final outcome and trigger contract settlements.
                </p>
            </div>

            {/* Market Card */}
            {
                market.map((item, i) => (
                    <div
                        key={i}
                        className="px-10 py-11 rounded-[25px] border-2 border-[#E9EAEB] mt-14 flex justify-between items-center"
                    >
                        <div className="space-y-3">
                            <button className="bg-[#FFFBEB] py-2.5 px-5 rounded-[14px] text-[#DB7B06] font-semibold text-lg">
                                {
                                    item?.status
                                }
                            </button>

                            <h1 className="text-[#1F2937] font-semibold text-4xl">
                                {item.title}
                            </h1>

                            <p className="text-[#6B6B6B] text-lg">
                                Market ID: #{item.id} • Closed on {item?.prediction_close_datetime
                                    ? moment(item.prediction_close_datetime).format('LLL')
                                    : "--"}
                            </p>
                        </div>

                        <div className=" flex items-center  gap-x-6 " >
                            <Button
                                className="text-2xl font-semibold px-6"
                                onClick={() => marketResolveModalOpen(item?.id)}
                            >
                                Resolve
                            </Button>
                            {/* <Button
                                className="text-2xl font-semibold px-4 py-5 "
                                onClick={() => openModal(item.id)}
                            >
                                <span><Edit2Icon /></span>

                            </Button>
                            <Button
                                onClick={() => { handleMarketDelete(item?.id) }}
                                className="text-2xl font-semibold px-4 py-5 "
                            >
                                <span><FaRegTrashAlt size={30} /></span>

                            </Button> */}
                        </div>
                    </div>
                ))
            }

            {/* Market Resolve Modal  */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-[#1F2937] text-4xl font-semibold">
                            Resolve Outcome
                        </DialogTitle>
                        <DialogTitle className="text-2xl text-gray-500">
                            {/* Bitcoin hit $100k? */}
                        </DialogTitle>
                    </DialogHeader>

                    <h1 className="text-[#6B6B6B] text-lg font-medium">
                        CHOOSE RESULT
                    </h1>
                    {/* Yes, No, Invalid */}

                    {/* Outcome Buttons */}
                    <div className="flex mt-3 gap-4">
                        {["Yes", "No", "Invalid"].map((item) => (
                            <button
                                key={item}
                                onClick={() => setOutcome(item)}
                                className={`border rounded-[21px] px-10 py-4 font-semibold transition
                                ${outcome === item
                                        ? "bg-[#4F7FD6] text-white border-[#4F7FD6]"
                                        : "border-[#E9EAEB] text-[#8C8C8C]"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Proof Input */}
                    <Label>RESOLUTION PROOF (REQUIRED)</Label>
                    <Input
                        placeholder="Link to Binance historical data..."
                        value={proof}
                        type="url"
                        onChange={(e) => setProof(e.target.value)}
                    />

                    {/* Action Buttons */}
                    <div className="mt-6 space-y-3">
                        <button
                            onClick={handleMarketResolve}
                            disabled={loading}
                            className="w-full bg-[#4F7FD6] cursor-pointer py-4 text-2xl font-semibold text-white rounded-[21px] hover:opacity-90 transition"
                        >
                            {
                                marketLoading ? <> <Loader /> </> : "Trigger Contract Resolution"
                            }
                        </button>

                        <button
                            onClick={() => (false)}
                            className="w-full text-[#8C8C8C] py-4 text-2xl font-semibold cursor-pointer "
                        >
                            Cancel
                        </button>
                    </div>
                </DialogContent>
            </Dialog>


            {/* Market  Update Modal  */}



            {updateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">

                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setUpdateModal(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-white w-[50%] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-8 z-50">

                        {/* Header */}
                        <div className="mb-8">
                            <div className=" flex  justify-between items-center  " >
                                <h2 className="text-[#1F2937] text-4xl font-semibold  ">
                                    Update Market
                                </h2>
                                <h1 onClick={() => { setUpdateModal(!updateModal) }} className=" font-semibold text-2xl cursor-pointer " > X </h1>
                            </div>

                        </div>

                        <form onSubmit={handleUpdateModal} className="space-y-6">

                            {/* Title */}
                            <div className="space-y-2">
                                <label className="font-medium">Title</label>
                                <input
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    className="w-full  rounded-lg px-4 py-3  border border-[#E9EAEB] hover:outline-0 focus:outline-0  "
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="font-medium">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value) }}
                                    className="w-full  rounded-lg px-4 py-3  border border-[#E9EAEB] hover:outline-0 focus:outline-0  "
                                />
                            </div>

                            {/* Resolution Rules */}
                            <div className="space-y-2">
                                <label className="font-medium">Resolution Rules</label>
                                <textarea
                                    value={resulation_roles}
                                    onChange={(e) => { setResulation_roles(e.target.value) }}
                                    className="w-full  rounded-lg px-4 py-3  border border-[#E9EAEB] hover:outline-0 focus:outline-0  "
                                />
                            </div>

                            {/* Source Section */}
                            <div className="flex gap-x-12">
                                <div className="space-y-2 w-full">
                                    <label className="font-medium">Source of Truth</label>
                                    <input
                                        value={source_of_truth}
                                        onChange={(e) => { setSource_of_truth(e.target.value) }}
                                        className="w-full  rounded-lg px-4 py-3  border border-[#E9EAEB] hover:outline-0 focus:outline-0  "
                                        placeholder="Enter source"
                                    />
                                </div>

                                <div className="space-y-2 w-full">
                                    <label className="font-medium">Source Link (Optional)</label>
                                    <input
                                        value={source_link}
                                        onChange={(e) => { setSource_link(e.target.value) }}
                                        type="url"
                                        className="w-full  rounded-lg px-4 py-3  border border-[#E9EAEB] hover:outline-0 focus:outline-0  "
                                        placeholder="https://example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 w-full">
                                <label className="font-medium">Category</label>

                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full rounded-lg px-4 py-3 border border-[#E9EAEB] hover:outline-0 focus:outline-0"
                                >
                                    <option value="">Select category</option>

                                    {categoryData?.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date Section */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="font-medium">Prediction Close Datetime</label>
                                    <input
                                        value={prediction_close_datetime}
                                        onChange={(e) => { setPrediction_close_datetime(e.target.value) }}
                                        type="datetime-local"
                                        className="w-full  rounded-lg px-4 py-3  border border-[#E9EAEB] hover:outline-0 focus:outline-0  "
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="font-medium">Resolution Datetime</label>
                                    <input
                                        value={resulation_datetime}
                                        onChange={(e) => { setResulation_datetime(e.target.value) }}
                                        type="datetime-local"
                                        className="w-full  rounded-lg px-4 py-3  border border-[#E9EAEB] hover:outline-0 focus:outline-0  "
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-x-6 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setUpdateModal(false)}
                                    className="bg-gray-200 px-10 py-4 font-semibold text-xl rounded-[23px] cursor-pointer "
                                >
                                    Save Draft
                                </button>

                                <button
                                    type="submit"
                                    disabled={marketLoading}
                                    className="bg-[#4F7FD6] text-white px-10 py-4 font-semibold text-xl rounded-[23px] cursor-pointer "
                                >
                                    {
                                        marketLoading ? <> <Loader /> </> : "Publish to DB & Contract"
                                    }
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

        </div >
    );
};

export default Resolve;