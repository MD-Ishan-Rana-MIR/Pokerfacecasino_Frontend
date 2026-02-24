"use client";
import { useUserBitProfileQuery } from "@/app/api/user/userBitApi";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";

/* ================================
Types
================================ */

type PredictionStatus = "Open" | "Win" | "Lost";
type PredictionSide = "Yes" | "No";

interface Prediction {
    id: number;
    title: string;
    side: PredictionSide;
    amount: number;
    currency: string;
    status: PredictionStatus;
    claimAmount?: number;
}

/* ================================
Data
================================ */

// const predictionsData: Prediction[] = [
//     {
//         id: 1,
//         title: "Will Bitcoin hit $100k?",
//         side: "Yes",
//         amount: 500,
//         currency: "USDC",
//         status: "Open",
//     },
//     {
//         id: 2,
//         title: "US Fed Rate Cut in March",
//         side: "Yes",
//         amount: 200,
//         currency: "USDC",
//         status: "Win",
//         claimAmount: 385,
//     },
//     {
//         id: 3,
//         title: "ETH to $4k?",
//         side: "No",
//         amount: 300,
//         currency: "USDC",
//         status: "Lost",
//     },
// ];

/* ================================
Component
================================ */

export default function PredictionTable() {

    const { data } = useUserBitProfileQuery({});


    const predictionsData = data?.data?.predictions || []
    console.log("bit predictionsData is", predictionsData);

    const [activeTab, setActiveTab] =
        useState<PredictionStatus>("Open");

    const filteredData = predictionsData.filter(
        (item: any) => item.status === activeTab
    );

    const getStatusStyles = (status: PredictionStatus) => {
        switch (status) {
            case "Open":
                return "bg-blue-100 text-blue-600";
            case "Win":
                return "bg-green-100 text-green-600";
            case "Lost":
                return "bg-red-100 text-red-500";
            default:
                return "";
        }
    };

    return (
        <div className="max-w-350 mx-auto px-4 mt-10 mb-20">

            {/* Tabs */}
            <div className="flex flex-wrap gap-6 md:gap-10 mb-6">
                {(["Open", "Win", "Loss"] as PredictionStatus[]).map(
                    (tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 text-base md:text-xl cursor-pointer font-semibold transition ${activeTab === tab
                                ? "text-[#4F7FD6] border-b-2 border-[#4F7FD6]"
                                : "text-[#6B6B6B]"
                                }`}
                        >
                            {tab === "Open"
                                ? "Open Predictions"
                                : tab === "Win"
                                    ? "Win Predictions"
                                    : "Lost Predictions"}
                        </button>
                    )
                )}
            </div>

            {/* Desktop / Tablet Table */}
            <div className="hidden md:block bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden">

                {/* Header */}
                <div className="grid grid-cols-5 bg-[#F9FAFB] px-6 lg:px-10 py-4 text-sm lg:text-lg font-semibold text-[#B5B5B5] uppercase">
                    <div>Market Title</div>
                    <div>Side</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div>Action</div>
                </div>

                {filteredData.length === 0 && (
                    <div className="text-center py-10 text-[#B5B5B5]">
                        No predictions found.
                    </div>
                )}

                {filteredData.map((item: Prediction) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-5 px-6 lg:px-10 py-6 items-center border-t border-[#F0F0F0]"
                    >
                        <div className="font-medium text-[#1F2937] text-sm lg:text-lg">
                            {item.title}
                        </div>

                        <div
                            className={`font-semibold text-sm lg:text-lg ${item.side === "Yes"
                                ? "text-green-600"
                                : "text-red-500"
                                }`}
                        >
                            {item.side}
                        </div>

                        <div className="font-medium text-[#1F2937] text-sm lg:text-lg">
                            {item.amount.toFixed(2)} {item.currency}
                        </div>

                        <div>
                            <span
                                className={`text-xs lg:text-sm px-4 py-2 rounded-lg font-semibold ${getStatusStyles(
                                    item.status
                                )}`}
                            >
                                {item.status}
                            </span>
                        </div>

                        <div>
                            {item.status === "Open" && (
                                <span className="text-gray-400 italic text-sm">
                                    Waiting...
                                </span>
                            )}

                            {item.status === "Win" && item.claimAmount && (
                                <button className="bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-semibold px-5 py-2 rounded-lg transition">
                                    CLAIM {item.claimAmount.toFixed(2)}
                                </button>
                            )}

                            {item.status === "Lost" && (
                                <span className="text-[#B5B5B5] text-sm">
                                    Closed
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-4">
                {filteredData.map((item: Prediction) => (
                    <div
                        key={item.id}
                        className="border border-[#E5E7EB] rounded-xl p-4 bg-white"
                    >
                        <div className="font-semibold text-[#1F2937] mb-3">
                            {item.title}
                        </div>

                        <div className="flex justify-between mb-2">
                            <span className="text-[#B5B5B5]">Side</span>
                            <span
                                className={`font-semibold ${item.side === "Yes"
                                    ? "text-green-600"
                                    : "text-red-500"
                                    }`}
                            >
                                {item.side}
                            </span>
                        </div>

                        <div className="flex justify-between mb-2">
                            <span className="text-[#B5B5B5]">Amount</span>
                            <span className="font-medium">
                                {item.amount.toFixed(2)} {item.currency}
                            </span>
                        </div>

                        <div className="flex justify-between mb-4">
                            <span className="text-[#B5B5B5]">Status</span>
                            <span
                                className={`text-xs px-3 py-1 rounded-lg font-semibold ${getStatusStyles(
                                    item.status
                                )}`}
                            >
                                {item.status}
                            </span>
                        </div>

                        {item.status === "Win" && item.claimAmount && (
                            <button className="w-full bg-[#16A34A] text-white py-2 rounded-lg font-semibold">
                                CLAIM {item.claimAmount.toFixed(2)}
                            </button>
                        )}

                        {item.status === "Open" && (
                            <div className="text-gray-400 italic text-sm">
                                Waiting...
                            </div>
                        )}

                        {item.status === "Lost" && (
                            <div className="text-[#B5B5B5] text-sm">
                                Closed
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}