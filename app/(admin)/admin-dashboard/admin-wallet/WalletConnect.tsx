"use client"
import { ethers } from "ethers"
import React, { useState } from 'react'

const WalletConnect = () => {
    const [account, setAccount] = useState<string | null>(null)
    const connectWallet = async () => {
        alert("Wallet connected")
        if (typeof window.ethereum !== "undefined" && window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
            await provider.send("eth_requestAccounts", [])
            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();

            setAccount(userAddress)
            localStorage.setItem("address", userAddress);
        } else {
            if (confirm("MetaMask is not installed. Install now?")) {
                window.open("https://metamask.io/download/", "_blank")
            }
        }
    };

    return (
        <div>
            <div className=' flex justify-between items-center ' >
                <h1 className=' text-[#1F2937] text-6xl font-semibold ' >Wallet Overview</h1>
                <button onClick={connectWallet} className=' text-white text-2xl font-semibold px-5 py-2.5 rounded-[14px] bg-[#4F7FD6] cursor-pointer ' >CONNECT WALLET</button>
            </div>
            <div>
                <h1 className=' mt-5 text-[#6B6B6B] text-[28px] ' >Manage administrative treasury and monitor user prediction flow</h1>
            </div>




            <div className=' mt-9 flex items-center  gap-x-11 ' >

                {/* ADMIN BALANCE */}
                <div className=' text-center w-full shadow shadow-[#00000003] border border-[#E9EAEB] py-9 px-14 rounded-[14px] ' >
                    <h1 className=' text-lg font-semibold text-[#B5B5B5] ' >ADMIN BALANCE</h1>
                    <p className=' mt-5.5 text-[#1F2937] text-[48px] font-semibold ' >$1,250.00 <span className=' text-[#B5B5B5] text-[30px] ' >USDC</span></p>
                </div>
                {/* TOTAL VALUE LOCKED */}
                <div className=' text-center w-full shadow shadow-[#00000003] border border-[#E9EAEB] py-9 px-14 rounded-[14px] ' >
                    <h1 className=' text-lg font-semibold text-[#B5B5B5] ' >TOTAL VALUE LOCKED</h1>
                    <p className=' mt-5.5 text-[#1F2937] text-[48px] font-semibold ' >$45,250.00 <span className=' text-[#B5B5B5] text-[30px] ' >USDC</span></p>
                </div>
                {/* ACTIVE PREDICTIONS */}
                <div className=' w-full text-center shadow shadow-[#00000003] border border-[#E9EAEB] py-9 px-14 rounded-[14px] ' >
                    <h1 className=' text-lg font-semibold text-[#B5B5B5] ' >ACTIVE PREDICTIONS</h1>
                    <p className=' mt-5.5 text-[#1F2937] text-[48px] font-semibold ' >124</p>
                </div>
            </div>
        </div>
    )
}

export default WalletConnect