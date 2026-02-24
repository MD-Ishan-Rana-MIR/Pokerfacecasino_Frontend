"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import MaxWidth from "@/components/web/MaxWidth"
import { redirect, } from "next/navigation"
import { useUserAllMarketQuery } from "@/app/api/user/userMarketApi"
import { MarketType } from "@/lib/type/marketType"
import Image from "next/image"
import MarketListSkeleton from "@/components/ui/MarketListSkeleton"

export default function MarketList() {

    const { data, isLoading } = useUserAllMarketQuery({});


    const marketData: MarketType[] = data?.data || [];

    const [filter, setFilter] = useState<"All" | "Politics" | "Crypto">("All")

    const filteredMarkets =
        filter === "All"
            ? marketData
            : marketData.filter((market) => market.category?.name)

    const tabs = ["All", "Politics", "Crypto"] as const

    const marketDetails = (id: number) => {
        redirect(`/market-details/${id}`)
    }





    if (isLoading) {
        return (
            <div>
                <MarketListSkeleton />
            </div>
        )
    }

    return (
        <MaxWidth>
            <div className="space-y-8 md:mb-20 mb-10">
                {/* Custom Tabs */}
                <div className="flex md:w-[30%] w-full px-2.5 py-2 mx-auto gap-3 bg-[#f8fafc] justify-center rounded-2xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-5 py-3 transition-all duration-200 cursor-pointer ${filter === tab
                                ? "md:text-2xl py-3 px-2.5 rounded-[17px] text-lg text-[#4F7FD6] bg-white font-semibold"
                                : "textColor font-semibold md:text-2xl text-lg"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Cards Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:mt-20 mt-10 ">
                    {filteredMarkets.map((market) =>
                        market.status === "Locked" ? (
                            // Locked Market Card
                            <Card
                                key={market.id}
                                className="relative rounded-2xl shadow-sm border  bg-white overflow-hidden"
                            >
                                <div className=" flex justify-center " >
                                    <svg width="99" height="99" viewBox="0 0 99 99" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24.75 90.75H74.25C78.7875 90.75 82.5 87.0375 82.5 82.5V45.375C82.5 40.8375 78.7875 37.125 74.25 37.125H70.125V28.875C70.125 17.49 60.885 8.25 49.5 8.25C38.115 8.25 28.875 17.49 28.875 28.875V37.125H24.75C20.2125 37.125 16.5 40.8375 16.5 45.375V82.5C16.5 87.0375 20.2125 90.75 24.75 90.75ZM37.125 28.875C37.125 22.0688 42.6938 16.5 49.5 16.5C56.3063 16.5 61.875 22.0688 61.875 28.875V37.125H37.125V28.875Z" fill="#BABDC1" />
                                    </svg>

                                </div>

                                <div className=" " >


                                    <Image src={"/logo/Ribbon.svg"} alt="r" width={800} height={121} />

                                </div>


                                <CardContent className="p-6 flex flex-col items-center justify-center space-y-4 opacity-60">
                                    <h1 className=" md:text-5xl text-2xl text-[#545454] " >Market Locked</h1>


                                </CardContent>

                            </Card>
                        ) : (
                            // Open Market Card
                            <Card
                                key={market.id}
                                className="rounded-2xl shadow-sm border bg-white hover:shadow-md transition"
                            >
                                <CardContent className="p-6 space-y-6">
                                    {/* Top Section */}
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`text-xs font-semibold px-3 py-1 rounded-md ${market.category?.name === "Politics"
                                                ? "text-[#4F7FD6] font-semibold md:text-xl text-lg bg-[#EDF2FB]"
                                                : "text-[#D44735] font-semibold md:text-xl text-lg bg-[#FFC7BF]"
                                                }`}
                                        >
                                            {(market.category?.name.toUpperCase())}
                                        </span>
                                        <span className="md:text-lg text-sm text-[#BABDC1] font-medium">
                                            {new Date(market.created_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <div className="h-22">
                                        <h2 className="md:text-2xl text-lg font-medium text-[#1F2937] leading-snug md:mt-9">
                                            {market.titile}
                                        </h2>
                                    </div>

                                    {/* Voting Section */}
                                    <div className="space-y-2 md:mt-10">
                                        <div className="flex justify-between text-sm font-medium">
                                            <span className="text-[#00993B] md:text-2xl text-lg">
                                                YES {(typeof market.yesPercent === 'string' ? parseFloat(market.yesPercent) : Number(market.yesPercent)).toFixed(1)}%
                                            </span>
                                            <span className="md:text-2xl text-lg text-[#FF4B31]">
                                                {(typeof market.noPercent === 'string' ? parseFloat(market.noPercent) : Number(market.noPercent)).toFixed(1)}% NO
                                            </span>
                                        </div>

                                        <div className="flex w-full h-3 rounded-full overflow-hidden bg-gray-200">
                                            <div
                                                className="bg-[#00993B]"
                                                style={{ width: `${market.yesPercent}%` }}
                                            />
                                            <div
                                                className="bg-[#FF4B31]"
                                                style={{ width: `${market.noPercent}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <div className="mt-5 md:mt-10">
                                        <button
                                            onClick={() => marketDetails(market.id)}
                                            className="w-full border-2 border-[#4F7FD6] py-4 cursor-pointer rounded-4xl text-lg font-medium text-[#4F7FD6] md:text-2xl"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    )}
                </div>
            </div>
        </MaxWidth>
    )
}