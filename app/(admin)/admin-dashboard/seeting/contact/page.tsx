import React from 'react'

const page = () => {
    return (
        <div>
            <div className=' flex items-center gap-x-4 ' >
                <h1 className=' text-6xl font-semibold text-[#1F2937] ' >Settings</h1> <span className=' mt-3 ' >
                    <svg width="20" height="37" viewBox="0 0 20 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 1.5L18.5 18.5L1.5 35.5" stroke="#1A4B9B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span><span className=' text-[#486FAF] text-[40px] font-semibold ' >Contact Us</span>
            </div>


            <div className=' border border-[#A5A5A580] mt-8  pt-5 pb-17.5 rounded-[15px] shadow ' >
                <h1 className=' text-lg text-[#000000] font-semibold  px-10 pb-5.5 ' >Contact Us</h1>
                <hr />
                <div className='px-10' >
                    <div className=' mt-8 ' >
                        <input className=' w-full placeholder:text-[#000000] px-5 py-4 border border-[#01304E33] hover:outline-0 focus:outline-0 rounded-[11px]  ' placeholder='Contact Number' type='text' />
                    </div>
                    <div className=' mt-8 ' >
                        <input className=' w-full placeholder:text-[#000000] px-5 py-4 border border-[#01304E33] hover:outline-0 focus:outline-0 rounded-[11px]  ' placeholder='Email Address' type='email' />
                    </div>
                    <div className=' mt-20 ' >
                        <button className=' py-4 text-white text-lg rounded-[11px] cursor-pointer bg-[#1A4B9B] w-full ' >Save</button>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default page