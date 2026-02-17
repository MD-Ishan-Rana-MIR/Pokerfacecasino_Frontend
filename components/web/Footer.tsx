import React from 'react'
import MaxWidth from './MaxWidth'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className=' bg-[#F8FAFC]  md:pt-18 md:pb-37 px-4 py-4 ' >
            <MaxWidth>
                <div className=' flex md:flex-row flex-col  w-full justify-between   ' >
                    <div className=' max-w-93 ' >
                        <Image src={"/logo/logo.svg"} width={303} height={56} alt='logo' />
                        <h1 className=' mt-3 text-[#000000] italic text-[16px] ' >Predict global events and earn USDC on the Polygon network. Simple, decentralized predicting for everyone.</h1>
                    </div>
                    <div>
                        <h1 className=' text-[#1F2937] text-2xl font-semibold mt-3 ' >Quick Links</h1>
                        <ul className=' md:mt-10 md:space-y-4 mt-5 space-y-2 ' >
                            <li>
                                <Link className=' text-[#1F2937] text-lg  ' href={"/MARKETS"} >Markets</Link>
                            </li>
                            <li>
                                <Link className=' text-[#1F2937] text-lg  ' href={"/PORTFOLIOS"} >Portfolios</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h1 className=' text-[#1F2937] text-2xl font-semibold mt-3 ' >Contact Us</h1>
                        <div className=' md:mt-10 mt-5 ' >
                            <div className=' flex items-center gap-x-2 ' >
                                <span className=' mt-1 ' >
                                    <svg width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.66667 21.3333C1.93333 21.3333 1.30578 21.0724 0.784 20.5507C0.262222 20.0289 0.000888889 19.4009 0 18.6667V2.66667C0 1.93333 0.261333 1.30578 0.784 0.784C1.30667 0.262222 1.93422 0.000888889 2.66667 0H24C24.7333 0 25.3613 0.261333 25.884 0.784C26.4067 1.30667 26.6676 1.93422 26.6667 2.66667V18.6667C26.6667 19.4 26.4058 20.028 25.884 20.5507C25.3622 21.0733 24.7342 21.3342 24 21.3333H2.66667ZM13.3333 12L2.66667 5.33333V18.6667H24V5.33333L13.3333 12ZM13.3333 9.33333L24 2.66667H2.66667L13.3333 9.33333ZM2.66667 5.33333V2.66667V18.6667V5.33333Z" fill="#1F2937" />
                                    </svg>
                                </span>
                                <p className=' text-lg text-[#1F2937] ' >
                                    Support@credinet.com
                                </p>
                            </div>
                            <div className=' flex items-center gap-x-2 md:mt-4 mt-2 ' >
                                <span className=' mt-1 ' >
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.6666 4C11.3333 4 13.9999 10 13.9999 10.6667C13.9999 12 11.9999 13.3333 11.3333 14.6667C10.6666 16 11.9999 17.3333 13.3333 18.6667C13.8533 19.1867 15.9999 21.3333 17.3333 20.6667C18.6666 20 19.9999 18 21.3333 18C21.9999 18 27.9999 20.6667 27.9999 21.3333C27.9999 24 25.9999 26 23.9999 26.6667C21.9999 27.3333 20.6666 27.3333 17.9999 26.6667C15.3333 26 13.3333 25.3333 9.99992 22C6.66659 18.6667 5.99992 16.6667 5.33325 14C4.66659 11.3333 4.66659 10 5.33325 8C5.99992 6 7.99992 4 10.6666 4Z" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </span>
                                <p className=' text-lg text-[#1F2937] ' >
                                    +2355997684234
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </MaxWidth>
        </div>
    )
}

export default Footer