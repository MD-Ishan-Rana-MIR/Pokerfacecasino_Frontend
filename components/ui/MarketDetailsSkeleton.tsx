import React from 'react'
import MaxWidth from '../web/MaxWidth'

const MarketDetailsSkeleton = () => {
    return (
        <div>
            <MaxWidth>
                <div className="animate-pulse">
                    {/* Back button skeleton */}
                    <div className="md:mt-19 mt-9 flex items-center gap-x-2.5">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <div className="w-40 h-6 bg-gray-300 rounded"></div>
                    </div>

                    {/* Market Details Card Skeleton */}
                    <div className="bg-[#F8FAFC] rounded-[25px] md:py-15 py-6 md:px-14 px-7 md:mt-20 mt-8">
                        <div className="w-3/4 h-10 bg-gray-300 rounded"></div>
                        <div className="w-full h-6 bg-gray-200 rounded mt-6"></div>
                        <div className="w-5/6 h-6 bg-gray-200 rounded mt-3"></div>

                        <div className="border-2 border-[#EDF2FB] md:my-11 my-5"></div>

                        <div className="flex justify-between">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="space-y-3">
                                    <div className="w-20 h-4 bg-gray-300 rounded"></div>
                                    <div className="w-28 h-6 bg-gray-400 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Prediction Card Skeleton */}
                    <div className="bg-[#F8FAFC] rounded-[25px] md:py-15 py-6 md:px-14 px-7 md:mt-15 mt-7">
                        <div className="w-1/3 h-8 bg-gray-300 rounded"></div>

                        <div className="flex gap-4 mt-10">
                            <div className="w-full h-14 bg-gray-300 rounded-[17px]"></div>
                            <div className="w-full h-14 bg-gray-300 rounded-[17px]"></div>
                        </div>

                        <div className="mt-6">
                            <div className="w-full h-14 bg-gray-300 rounded"></div>
                            <div className="w-full h-14 bg-gray-400 rounded mt-5"></div>
                        </div>
                    </div>
                </div>
            </MaxWidth>
        </div>
    )
}

export default MarketDetailsSkeleton