"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import MaxWidth from "@/components/web/MaxWidth"
import { redirect } from "next/navigation"

type Market = {
    id: number
    category: "Politics" | "Crypto"
    title: string
    yesPercent: number
    noPercent: number
    time: string
}

const markets: Market[] = [
    {
        id: 1,
        category: "Politics",
        title: "Will Bitcoin hit $100k before the end of Q1 2026?",
        yesPercent: 64,
        noPercent: 36,
        time: "14h 20m",
    },
    {
        id: 2,
        category: "Crypto",
        title: "Will Ethereum reach $10k in 2026?",
        yesPercent: 52,
        noPercent: 48,
        time: "10h 12m",
    },
    {
        id: 3,
        category: "Politics",
        title: "Will the US election result in a party switch?",
        yesPercent: 41,
        noPercent: 59,
        time: "1d 4h",
    },
    {
        id: 4,
        category: "Crypto",
        title: "Will Solana flip Ethereum market cap?",
        yesPercent: 33,
        noPercent: 67,
        time: "8h 50m",
    },
    {
        id: 5,
        category: "Politics",
        title: "Will inflation drop below 2% in 2026?",
        yesPercent: 72,
        noPercent: 28,
        time: "3h 30m",
    },
    {
        id: 6,
        category: "Crypto",
        title: "Will Bitcoin ETF inflows exceed $50B?",
        yesPercent: 58,
        noPercent: 42,
        time: "16h 10m",
    },
    {
        id: 7,
        category: "Politics",
        title: "Will a new tax reform bill pass this year?",
        yesPercent: 46,
        noPercent: 54,
        time: "9h 25m",
    },
    {
        id: 8,
        category: "Crypto",
        title: "Will XRP win its legal battle?",
        yesPercent: 61,
        noPercent: 39,
        time: "12h 8m",
    },
    {
        id: 9,
        category: "Politics",
        title: "Will oil prices exceed $120/barrel?",
        yesPercent: 38,
        noPercent: 62,
        time: "7h 42m",
    },
    {
        id: 10,
        category: "Crypto",
        title: "Will Dogecoin reach $1?",
        yesPercent: 29,
        noPercent: 71,
        time: "5h 18m",
    },
]



export default function MarketList() {
    const [filter, setFilter] = useState<"All" | "Politics" | "Crypto">("All")

    const filteredMarkets =
        filter === "All"
            ? markets
            : markets.filter((market) => market.category === filter)

    const tabs = ["All", "Politics", "Crypto"] as const

    const marketDetails = (id: number) => {
        redirect(`/market-details/${id}`)
    }

    return (
        <MaxWidth>
            <div className="space-y-8 md:mb-20 mb-10 ">

                {/* Custom Tabs */}
                <div className="flex md:w-[30%] w-full px-2.5 py-2 mx-auto  gap-3 bg-[#f8fafc]  justify-center rounded-2xl ">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-5 py-3  transition-all duration-200 cursor-pointer
                ${filter === tab
                                    ? " md:text-2xl py-3 px-2.5 rounded-[17px] text-lg text-[#4F7FD6] bg-white cursor-pointer  font-semibold"
                                    : " textColor font-semibold md:text-2xl text-lg "
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Cards Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:mt-20 mt-10 ">
                    {filteredMarkets.map((market) => (
                        <Card
                            key={market.id}
                            className="rounded-2xl shadow-sm border bg-white hover:shadow-md transition   "
                        >
                            <CardContent className="p-6 space-y-6">

                                {/* Top Section */}
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`text-xs font-semibold px-3 py-1 rounded-md ${market.category === "Politics"
                                            ? "text-[#4F7FD6] font-semibold md:text-xl text-lg bg-[#EDF2FB] px-3 py-1.5 "
                                            : "text-[#D44735] font-semibold md:text-xl text-lg bg-[#FFC7BF] px-3 py-1.5 "
                                            }`}
                                    >
                                        {market.category.toUpperCase()}
                                    </span>
                                    <span className="md:text-lg text-sm text-[#BABDC1] font-medium ">
                                        {market.time}
                                    </span>
                                </div>

                                {/* Title */}
                                <div className=" h-22 " >
                                    <h2 className="md:text-2xl text-lg font-medium text-[#1F2937] leading-snug md:mt-9 ">
                                        {market.title}
                                    </h2>
                                </div>

                                {/* Voting Section */}
                                <div className="space-y-2 md:mt-10   ">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-[#00993B] md:text-2xl text-lg ">
                                            YES {market.yesPercent}%
                                        </span>
                                        <span className="md:text-2xl text-lg  text-[#FF4B31] ">
                                            {market.noPercent}% NO
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
                                {/* <Button
                                    variant="outline"
                                    className="w-full rounded-xl border-blue-500 text-blue-600 hover:bg-blue-50"
                                >
                                    View Details
                                </Button> */}
                                <div className=" mt-5 md:mt-10 " >
                                    <button onClick={() => { marketDetails(market.id) }} className=" w-full border-2 border-[#4F7FD6] py-4 cursor-pointer rounded-4xl text-lg font-medium text-[#4F7FD6] md:text-2xl  " >View Details</button>
                                </div>

                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>
        </MaxWidth>
    )
}