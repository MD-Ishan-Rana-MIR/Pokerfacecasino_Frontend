import MaxWidth from '@/components/web/MaxWidth'
import React from 'react'

const Portfoli = () => {
    return (
        <>
            <div className=' md:mt-29 mt-12 bg-[#F8FAFC] md:py-22.5  py-10 text-center  ' >
                <h1 className=' md:text-6xl text-3xl font-semibold ' >Your Portfolio</h1>
                <p className=' md:mt-12 mt-6 md:text-[28px] text-lg  textColor max-w-5xl mx-auto ' >
                    Track your active positions, review settled outcomes and claim your USDC winnings.
                </p>
            </div>
            <div className="md:mt-28 mt-12 md:mb-24 mb-10 ">
                <MaxWidth>
                    <div className="grid md:grid-cols-3 gap-6 items-center w-full">

                        {/* Total Invested */}
                        <div className="text-center shadow-sm border border-[#E9EAEB] rounded-2xl md:px-12 px-5 md:py-28 py-12">
                            <h1 className="text-[#B5B5B5] md:text-2xl text-lg font-semibold">
                                TOTAL INVESTED
                            </h1>
                            <div className="text-[#1F2937] md:text-5xl text-2xl font-semibold flex items-center justify-center md:mt-9 mt-4">
                                $1,250.00
                                <span className="text-[#B5B5B5] md:text-2xl text-lg ml-3">
                                    USDC
                                </span>
                            </div>
                        </div>

                        {/* Active Predictions */}
                        <div className="text-center shadow-sm border border-[#E9EAEB] rounded-2xl md:px-12 px-5 md:py-28 py-12">
                            <h1 className="text-[#B5B5B5] md:text-2xl text-lg font-semibold">
                                ACTIVE PREDICTIONS
                            </h1>
                            <div className="text-[#4F7FD6] md:text-5xl text-2xl font-semibold md:mt-9 mt-4">
                                4
                            </div>
                        </div>

                        {/* Total Claimable */}
                        <div className="text-center shadow-sm border border-[#00993B] bg-[#F2FFF6] rounded-2xl md:px-12 px-5 md:py-28 py-12">
                            <h1 className="text-[#00993B] md:text-2xl text-lg font-semibold">
                                TOTAL CLAIMABLE
                            </h1>
                            <div className="text-[#00993B] md:text-5xl text-2xl font-semibold flex items-center justify-center md:mt-9 mt-4">
                                $1,250.00
                                <span className="text-[#B0DFC2] md:text-2xl text-lg ml-3">
                                    USDC
                                </span>
                            </div>
                        </div>

                    </div>
                </MaxWidth>
            </div>
        </>
    )
}

export default Portfoli