"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import MaxWidth from "@/components/web/MaxWidth"

type SkeletonProps = {
    count?: number
}

export default function MarketListSkeleton({ count = 9 }: SkeletonProps) {
    return (
        <MaxWidth>
            <div className="space-y-8 md:mb-20 mb-10">

                {/* Custom Tabs Skeleton */}
                <div className="flex md:w-[30%] w-full px-2.5 py-2 mx-auto gap-3 bg-[#f8fafc] justify-center rounded-2xl animate-pulse">
                    {Array(3)
                        .fill(0)
                        .map((_, idx) => (
                            <div
                                key={idx}
                                className="px-5 py-3 rounded-[17px] bg-gray-300 md:text-2xl text-lg"
                            />
                        ))}
                </div>

                {/* Cards Grid Skeleton */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:mt-20 mt-10">
                    {Array(count)
                        .fill(0)
                        .map((_, idx) => (
                            <Card
                                key={idx}
                                className="rounded-2xl shadow-sm border bg-white transition animate-pulse"
                            >
                                <CardContent className="p-6 space-y-6">

                                    {/* Top Section */}
                                    <div className="flex items-center justify-between">
                                        <div className="w-24 h-6 bg-gray-300 rounded-md" />
                                        <div className="w-16 h-4 bg-gray-200 rounded-md" />
                                    </div>

                                    {/* Title */}
                                    <div className="h-22">
                                        <div className="w-full h-6 bg-gray-300 rounded-md mt-4 md:mt-9" />
                                        <div className="w-5/6 h-6 bg-gray-300 rounded-md mt-2" />
                                    </div>

                                    {/* Voting Section */}
                                    <div className="space-y-2 md:mt-10">
                                        <div className="flex justify-between">
                                            <div className="w-16 h-4 bg-gray-300 rounded-md" />
                                            <div className="w-16 h-4 bg-gray-300 rounded-md" />
                                        </div>

                                        <div className="flex w-full h-3 rounded-full overflow-hidden bg-gray-200">
                                            <div className="bg-gray-300" style={{ width: "60%" }} />
                                            <div className="bg-gray-300" style={{ width: "40%" }} />
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <div className="mt-5 md:mt-10">
                                        <div className="w-full h-12 bg-gray-300 rounded-4xl md:h-14" />
                                    </div>

                                </CardContent>
                            </Card>
                        ))}
                </div>

            </div>
        </MaxWidth>
    )
}