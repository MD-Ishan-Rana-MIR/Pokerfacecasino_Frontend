"use client"

import React, { useState } from "react"
import MaxWidth from "./MaxWidth"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ethers } from "ethers"

declare global {
    interface Window {
        ethereum?: unknown
    }
}

const WebNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [account, setAccount] = useState<string | null>(null)
    const pathName = usePathname()

    // Connect MetaMask
    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined" && window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
                console.log(provider)
                await provider.send("eth_requestAccounts", [])
                const signer = await provider.getSigner();
                console.log("singer", signer)
                const userAddress = await signer.getAddress()
                setAccount(userAddress)
            } catch (err) {
                console.error("Wallet connection error:", err)
            }
        } else {
            if (confirm("MetaMask is not installed. Install now?")) {
                window.open("https://metamask.io/download/", "_blank")
            }
        }
    };

    const [isOpenModal, setIsOpenModal] = useState(false);


    return (
        <div className="sticky top-0 z-50 bg-[#F8FAFC] shadow">
            <MaxWidth>
                <div className="flex items-center justify-between py-5">
                    {/* Logo */}
                    <Link href="/">
                        <Image src={"/logo/logo.svg"} width={303} height={56} alt='logo' />
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-x-10">
                            <li>
                                <Link
                                    href="/MARKETS"
                                    className={`text-xl ${pathName === "/MARKETS"
                                        ? "text-[#4F7FD6] font-semibold"
                                        : "textColor"
                                        }`}
                                >
                                    MARKETS
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/PORTFOLIOS"
                                    className={`text-xl ${pathName === "/PORTFOLIOS"
                                        ? "text-[#4F7FD6] font-semibold"
                                        : "textColor"
                                        }`}
                                >
                                    PORTFOLIOS
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex items-center gap-x-6">
                        <button onClick={() => setIsOpenModal(!isOpenModal)} className="flex items-center gap-2 bg-[#E9EAEB] py-2.5 px-5 rounded-2xl cursor-pointer text-[#8C8C8C] font-semibold text-lg md:text-xl">
                            <Image src="/logo/top-icon.svg" width={20} height={20} alt="top" />
                            Top Up
                        </button>

                        <button
                            onClick={connectWallet}
                            className=" bg-[#4F7FD6] py-2.5 px-6 rounded-2xl cursor-pointer text-white font-semibold  md:text-xl text-lg transition"
                        >
                            {account
                                ? `${account.slice(0, 6)}...${account.slice(-4)}`
                                : "Connect Wallet"}
                        </button>
                    </div>

                    {/* Mobile Hamburger */}
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link href="/MARKETS" onClick={() => setIsOpen(false)}>
                                    MARKETS
                                </Link>
                            </li>
                            <li>
                                <Link href="/PORTFOLIOS" onClick={() => setIsOpen(false)}>
                                    PORTFOLIOS
                                </Link>
                            </li>
                            <li className="flex flex-col gap-3 pt-3 border-t">
                                <button onClick={() => setIsOpenModal(!isOpenModal)} className="flex justify-center items-center gap-2 bg-[#E9EAEB] py-2.5 px-5 rounded-2xl cursor-pointer text-[#8C8C8C] font-semibold text-lg md:text-xl">
                                    <Image src="/logo/top-icon.svg" width={20} height={20} alt="top" />
                                    Top Up
                                </button>

                                <button
                                    onClick={connectWallet}
                                    className=" bg-[#4F7FD6] py-2.5 px-6 rounded-2xl cursor-pointer text-white font-semibold  md:text-xl text-lg transition"
                                >
                                    {account
                                        ? `${account.slice(0, 6)}...${account.slice(-4)}`
                                        : "Connect Wallet"}
                                </button>
                            </li>
                        </ul>
                    </div>
                )}

                {isOpenModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

                        {/* Modal Card */}
                        <div className="bg-white w-full max-w-md rounded-2xl p-6 relative animate-in fade-in zoom-in duration-200">

                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpenModal(false)}
                                className="absolute top-4 cursor-pointer right-4 text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>

                            <h2 className=" md:text-3xl text-lg font-semibold mb-4">
                                Add USDC to Wallet
                            </h2>
                            <p className=" text-[#6B6B6B] md:text-2xl text-[17px] italic " >Pay by card to add USDC on Polygon directly to your wallet.</p>

                            {/* Example Content */}
                            <div className="space-y-4 md:mt-12 mt-6 ">
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F7FD6]"
                                />

                                <button className="w-full bg-[#4F7FD6] text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition">
                                    Confirm Top Up
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </MaxWidth>
        </div>
    )
}

export default WebNavbar