"use client"
import { Input } from '@/components/ui/input'
import MaxWidth from '@/components/web/MaxWidth'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'

const MarketDetails = () => {
    const handleBack = () => {
        redirect("/MARKETS")
    }

    const [selectInput, setSeleceInput] = useState("yes");

    return (
        <MaxWidth>
            {/* backe button */}
            <div>
                <div className=' md:mt-19 mt-9 flex items-center gap-x-2.5 ' >
                    <span onClick={handleBack} className='mt-1 cursor-pointer ' >
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_29_259)">
                                <path d="M10.2841 19.484C9.99659 19.7715 9.60665 19.933 9.20007 19.933C8.79348 19.933 8.40354 19.7715 8.116 19.484L1.216 12.584C0.928544 12.2965 0.767061 11.9066 0.767061 11.5C0.767061 11.0934 0.928544 10.7035 1.216 10.4159L8.116 3.51591C8.40519 3.2366 8.79251 3.08205 9.19455 3.08555C9.59658 3.08904 9.98116 3.2503 10.2655 3.53459C10.5497 3.81888 10.711 4.20346 10.7145 4.6055C10.718 5.00753 10.5634 5.39486 10.2841 5.68405L6.1334 9.96665L20.7001 9.96665C21.1067 9.96665 21.4967 10.1282 21.7843 10.4157C22.0719 10.7033 22.2334 11.0933 22.2334 11.5C22.2334 11.9066 22.0719 12.2967 21.7843 12.5842C21.4967 12.8718 21.1067 13.0333 20.7001 13.0333L6.1334 13.0333L10.2841 17.3159C10.5716 17.6035 10.7331 17.9934 10.7331 18.4C10.7331 18.8066 10.5716 19.1965 10.2841 19.484Z" fill="#6B6B6B" />
                            </g>
                            <defs>
                                <clipPath id="clip0_29_259">
                                    <rect width="23" height="23" fill="white" transform="translate(23 23) rotate(180)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </span>
                    <span className=' textColor md:text-[28px] text-lg ' >
                        Back to Markets
                    </span>
                </div>

                <div className=' bg-[#F8FAFC] rounded-[25px] md:py-15 py-6  md:px-14 px-7 md:mt-20 mt-8 ' >
                    <div>
                        <h1 className=' text-[#1F2937] font-semibold md:text-5xl text-2xl   ' >Will Bitcoin hit $100k before the end of Q1 2026?</h1>
                        <p className=' md:mt-10 mt-5 md:text-[28px] text-lg  text-[#1F2937] ' >This market resolves to YES if the BTC/USDC price hits or exceeds $100,000 on Binance Spot at any point before March 31, 2026, 23:59 UTC.</p>
                    </div>

                    <div className=' border-2 border-[#EDF2FB] md:my-11 my-5 ' ></div>

                    <div className=' w-full flex items-center justify-between  ' >
                        <div className=' md:space-y-6 space-y-3 ' >
                            <h1 className=' textColor md:text-2xl text-[15px] ' >SOURCE</h1>
                            <p className=' md:font-semibold text-[#4F7FD6] md:text-[28px] text-lg ' >Binance API</p>
                        </div>
                        <div className=' md:space-y-6 space-y-3 ' >
                            <h1 className=' textColor md:text-2xl text-[15px] ' >CLOSETIME</h1>
                            <p className=' md:font-semibold text-[#1F2937] md:text-[28px] text-lg ' >Mar 31, 2026</p>
                        </div>
                        <div className=' md:space-y-6 space-y-3 ' >
                            <h1 className=' textColor md:text-2xl text-[15px] ' >POOL SPLIT</h1>
                            <p className=' md:font-semibold text-[#00993B] md:text-[28px] text-lg ' >64% YES</p>
                        </div>

                    </div>

                </div>



                {/* Make a Prediction */}
                <div className='bg-[#F8FAFC] rounded-[25px] md:py-15 py-6  md:px-14 px-7 md:mt-15 mt-7 md:mb-50 mb-10 ' >
                    <h1 className=' md:text-5xl text-2xl font-medium text-[#1F2937] ' >Make a Prediction</h1>
                    <div className=' md:mt-20 mt-10 flex items-center gap-x-4.5  ' >
                        <button onClick={() => { setSeleceInput("yes") }} className={` font-semibold md:text-[28px] text-lg  py-3 md:py-7 cursor-pointer w-full rounded-[17px] ${selectInput == "yes" ? ' bg-[#E6F5EB] border-2 border-[#00993B] text-[#00993B] ' : ' text-[#8C8C8C] bg-white border border-[#E9EAEB] '} `} >YES</button>
                        <button onClick={() => { setSeleceInput("no") }} className={` font-semibold md:text-[28px] text-lg  py-3 md:py-7 cursor-pointer w-full rounded-[17px] ${selectInput == "no" ? ' bg-[#fbedeb] border-2 border-[#FF4B31] text-[#FF4B31] ' : ' text-[#8C8C8C] bg-white border border-[#E9EAEB] '} `} >No</button>
                    </div>
                    <div className=' md:mt-13 mt-6 ' >
                        <Input placeholder='0.00' className=' bg-white ' />
                        <button onClick={() => { setSeleceInput("yes") }} className={` md:mt-11 mt-5 font-semibold md:text-[28px]  bg-[#4F7FD6] text-white text-lg  py-3 md:py-7 cursor-pointer w-full rounded-[17px] $ `} >APPROVE USDC</button>
                    </div>
                    <p className=' text-[#8C8C8C] md:text-2xl text-lg text-center md:mt-11 mt-5 ' >USDC must be present in your connected wallet.</p>
                </div>
            </div>
        </MaxWidth>
    )
}

export default MarketDetails