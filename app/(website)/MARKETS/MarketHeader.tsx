import MaxWidth from '@/components/web/MaxWidth'
import React from 'react'

const MarketHeader = () => {
    return (
        <div className=' mt-10 md:mt-29 bg-[#F8FAFC] md:mb-20 mb-10 ' >
            <MaxWidth>
                <div className=' py-10 md:py-22.5 text-center ' >
                    <h1 className=' text-[#1F2937] font-semibold md:text-6xl text-3xl ' >The Future of Predictions</h1>
                    <div className=' max-w-2xl mx-auto text-lg md:text-2xl ' >
                        <p className=' mt-5 md:mt-12.5 textColor text-lg md:text-2xl ' >Access decentralized markets on Polygon. Transparent, real-time, and community-driven.</p>

                    </div>
                </div>
            </MaxWidth>
        </div>
    )
}

export default MarketHeader