import React from "react";

const MarketSkeleton = () => {
    // Create an array of 10 items
    const skeletons = Array.from({ length: 10 });

    return (
        <div className="space-y-6">
            {skeletons.map((_, index) => (
                <div
                    key={index}
                    className="px-10 py-11 rounded-[25px] border-2 border-[#E9EAEB] flex justify-between items-center animate-pulse"
                >
                    <div className="space-y-3 w-full">
                        {/* Status Badge Skeleton */}
                        <div className="h-10 w-28 bg-gray-200 rounded-[14px]" />

                        {/* Title Skeleton */}
                        <div className="h-10 w-125 bg-gray-200 rounded-md" />

                        {/* Meta Info Skeleton */}
                        <div className="h-6 w-72 bg-gray-200 rounded-md" />
                    </div>

                    {/* Button Skeleton */}
                    <div className="h-14 w-32 bg-gray-200 rounded-lg ml-6" />
                </div>
            ))}
        </div>
    );
};

export default MarketSkeleton;