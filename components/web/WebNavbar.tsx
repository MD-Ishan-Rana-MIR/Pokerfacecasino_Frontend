"use client"

import React, { useEffect, useState } from "react"
import MaxWidth from "./MaxWidth"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ethers } from "ethers"
import { useUserLoginMutation, useUserLogoutMutation } from "@/app/api/user/userAuthApi"
import { errorMessage } from "@/lib/msg/errorAlert"
import { toast } from "sonner"
import Loader from "../navbar/spinner/Loader"
import { logoutAlert } from "@/lib/msg/logoutAlert"

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ethereum?: any
    }
}

const WebNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [account, setAccount] = useState<string | null>(null)
    const pathName = usePathname();

    const router = useRouter();


    // ======================================== Check Balanace  =========================================

    const [balance, setBalance] = useState("");

    const checkBalance = async () => {
        if (!window.ethereum) {
            alert("মেটামাস্ক ইন্সটল করুন!");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);

            // 🔥 Request wallet connection (important)
            await window.ethereum.request({ method: "eth_requestAccounts" });

            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            const balanceWei = await provider.getBalance(address);
            const balanceEth = ethers.formatEther(balanceWei);

            setBalance(parseFloat(balanceEth).toFixed(4));

        } catch (error) {
            console.error("Balance Check Error:", error);
        }
    };

    // ✅ Auto run when page loads
    useEffect(() => {
        const fetchBalance = async () => {
            await checkBalance();
        };

        fetchBalance();
    }, []);


    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const user = localStorage.getItem("user-token");
        setToken(user)
        if (!user) {
            router.push("/")
        }
    }, [token, router])




    // ================================ user login ======================================

    const [userLogin, { isLoading }] = useUserLoginMutation();

    // Connect MetaMask
    const connectWallet = async () => {
        if (!window.ethereum) {
            if (confirm("MetaMask is not installed. Install now?")) {
                window.open("https://metamask.io/download/", "_blank");
            }
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);

            // 🔥 Request wallet connection
            await provider.send("eth_requestAccounts", []);

            // 🔥 Check current network
            const network = await provider.getNetwork();

            if (Number(network.chainId) !== 137) {
                try {
                    // Try switching to Polygon
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x89" }],
                    });
                } catch (switchError: any) {
                    // If Polygon not added → add it
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [
                                {
                                    chainId: "0x89",
                                    chainName: "Polygon Mainnet",
                                    rpcUrls: ["https://polygon-rpc.com"],
                                    nativeCurrency: {
                                        name: "MATIC",
                                        symbol: "MATIC",
                                        decimals: 18,
                                    },
                                    blockExplorerUrls: ["https://polygonscan.com"],
                                },
                            ],
                        });
                    } else {
                        throw switchError;
                    }
                }
            }

            // 🔥 Continue login after network verified
            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();

            const payload = { wallet_address: userAddress };

            const res = await userLogin(payload).unwrap();

            if (res) {
                localStorage.setItem("address", userAddress);
                localStorage.setItem("user-token", res?.data?.token);
                window.location.href = "/"
                setAccount(userAddress);
                toast.success("Connected to Polygon successfully ✅");
            }



        } catch (err) {
            return errorMessage("MetaMask connection failed");
        }
    };

    const [isOpenModal, setIsOpenModal] = useState(false);

    // ==================================== Logout function =========================================

    const [userLogout, { isLoading: logoutLoading }] = useUserLogoutMutation();

    const disconnectWallet = async () => {
        try {

            const res = await logoutAlert();
            if (res.isConfirmed) {
                const res = await userLogout({}).unwrap();
                if (res) {
                    setAccount(null);
                    localStorage.removeItem("address");
                    localStorage.removeItem("user-token");
                    window.location.href = "/"
                    toast.success(res?.message)
                }
            }


        } catch (error) {
            return errorMessage(error)
        }
    };

    // Listen for account change
    useEffect(() => {
        if (typeof window.ethereum !== "undefined" && window.ethereum) {
            const handleAccountsChanged = (accounts: string[]) => {
                if (accounts.length === 0) {
                    setAccount(null)
                } else {
                    setAccount(accounts[0])
                }
            }

                ; (window.ethereum as any).on("accountsChanged", handleAccountsChanged)

            return () => {
                ; (window.ethereum as any).removeListener(
                    "accountsChanged",
                    handleAccountsChanged
                )
            }
        }
    }, [])

    useEffect(() => {
        const savedWallet = localStorage.getItem("address");
        if (savedWallet) {
            const handler = () => setAccount(savedWallet);
            handler();
        }
    }, []);


    // Initialize wallet from localStorage


    //     console.log("account is", account)

    //     const handleTopUp = async () => {
    //     if (!window.ethereum) return alert("MetaMask সংযুক্ত করুন");

    //     const provider = new ethers.BrowserProvider(window.ethereum);
    //     const signer = await provider.getSigner();
    //     const address = await signer.getAddress();

    //     const amount = parseFloat(usdcAmount); // ইউজারের ইনপুট

    //     // ব্যাকএন্ডে কল: পেমেন্ট প্রক্রিয়া শুরু করা
    //     // POST /api/topup { address, amount }

    //     console.log("USDC পাঠানো হবে:", address, "Amount:", amount);
    // }




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
                            {
                                token && (
                                    <li>
                                        <Link
                                            href="/markets"
                                            className={`text-xl ${pathName === "/markets"
                                                ? "text-[#4F7FD6] font-semibold"
                                                : "textColor"
                                                }`}
                                        >
                                            MARKETS
                                        </Link>
                                    </li>
                                )
                            }
                            {
                                token && (
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
                                )
                            }
                        </ul>
                    </nav>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex items-center gap-x-6">
                        {
                            token && (
                                // <button onClick={() => setIsOpenModal(!isOpenModal)} className="flex items-center gap-2 bg-[#E9EAEB] py-2.5 px-5 rounded-2xl cursor-pointer text-[#8C8C8C] font-semibold text-lg md:text-xl">
                                //     <Image src="/logo/top-icon.svg" width={20} height={20} alt="top" />
                                //     Top Up
                                // </button>
                                <Link target="_blank" className="flex items-center gap-2 bg-[#E9EAEB] py-2.5 px-5 rounded-2xl cursor-pointer text-[#8C8C8C] font-semibold text-lg md:text-xl" href={`https://sepolia-faucet.pk910.de/`}>
                                    Top Up
                                </Link>
                            )
                        }
                        {
                            token && (
                                <>
                                    <h1 className=" text-[#B5B5B5] text-lg font-medium " >BALANCE
                                        <p className=" text-[#000000]  text-lg font-medium  " >{balance}  <span className=" text-[#4F7FD6] " >USDC</span> </p>
                                    </h1>

                                </>
                            )
                        }

                        {token ? (
                            <>
                                <button
                                    onClick={disconnectWallet}
                                    className="bg-red-500 py-2.5 px-6 rounded-2xl text-white font-semibold text-lg cursor-pointer "
                                >
                                    {
                                        logoutLoading ? <> <Loader /> </> : "Logout"
                                    }
                                </button>

                            </>




                        ) : (
                            <button
                                onClick={connectWallet}
                                className="bg-[#4F7FD6] py-2.5 px-6 rounded-2xl text-white font-semibold text-lg cursor-pointer "
                            >
                                {
                                    isLoading ? <> <Loader></Loader> </> : "Connect Wallet"
                                }
                            </button>

                        )}
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
                            {
                                token && (
                                    <li>
                                        <Link href="/markets" onClick={() => setIsOpen(false)}>
                                            MARKETS
                                        </Link>
                                    </li>
                                )
                            }
                            {
                                token && (
                                    <li>
                                        <Link href="/PORTFOLIOS" onClick={() => setIsOpen(false)}>
                                            PORTFOLIOS
                                        </Link>
                                    </li>
                                )
                            }
                            <li className="flex flex-col gap-3 pt-3 border-t">
                                {
                                    token && (
                                        <button onClick={() => setIsOpenModal(!isOpenModal)} className="flex justify-center items-center gap-2 bg-[#E9EAEB] py-2.5 px-5 rounded-2xl cursor-pointer text-[#8C8C8C] font-semibold text-lg md:text-xl">
                                            <Image src="/logo/top-icon.svg" width={20} height={20} alt="top" />
                                            Top Up
                                        </button>
                                    )
                                }

                                {token ? (
                                    <button
                                        onClick={disconnectWallet}
                                        className="bg-red-500 py-2.5 px-6 rounded-2xl text-white font-semibold text-lg cursor-pointer "
                                    >
                                        {
                                            logoutLoading ? <> <Loader /> </> : "Logout"
                                        }
                                    </button>
                                ) : (
                                    <button
                                        onClick={connectWallet}
                                        className="bg-[#4F7FD6] py-2.5 px-6 rounded-2xl text-white font-semibold text-lg cursor-pointer "
                                    >
                                        {
                                            isLoading ? <> <Loader></Loader> </> : "Connect Wallet"
                                        }
                                    </button>
                                )}
                            </li>
                        </ul>
                    </div>
                )}

                {/* {isOpenModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

                        
                        <div className="bg-white w-full max-w-md rounded-2xl p-6 relative animate-in fade-in zoom-in duration-200">

                            
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
                )} */}
            </MaxWidth>
        </div>
    )
}

export default WebNavbar