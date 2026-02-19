"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { logoutAlert } from "@/lib/msg/logoutAlert";
import { User2 } from "lucide-react";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();

    const handleLogout = async () => {
        const res = await logoutAlert();
        if (res.isConfirmed) {
            redirect("/")
        }
    }

    return (
        <div className="flex h-screen bg-white">
            {/* ================= Sidebar ================= */}
            <aside
                className={`fixed top-0 left-0 bottom-0 h-screen transition-all duration-300 border-r border-gray-200 bg-white ${sidebarOpen ? "`w-87.5 px-7" : "w-25 px-3"
                    }`}
            >
                {/* Logo + Toggle */}
                <div
                    className={`flex items-center gap-x-6 ${sidebarOpen ? "justify-between" : "justify-center"
                        } p-4 mt-4`}
                >
                    {sidebarOpen && (
                        <Link href={"/admin-dashboard"}>
                            <Image
                                src="/logo/logo.svg"
                                width={200}
                                height={50}
                                alt="logo"
                            />
                        </Link>
                    )}

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-gray-700 p-2 rounded-md hover:bg-gray-100 transition cursor-pointer text-2xl  "
                    >
                        ☰
                    </button>
                </div>

                {/* ================= Menu ================= */}
                <nav className="mt-8">
                    <ul className="space-y-3">
                        {/* home  */}
                        <li>
                            <Link
                                href="/admin-dashboard"
                                className={`flex items-center py-3 rounded-xl transition-all duration-300 ${sidebarOpen
                                    ? "gap-4 px-4"
                                    : "justify-center"
                                    } ${pathname === "/admin-dashboard"
                                        ? "bg-[#EDF2FB]"
                                        : "hover:bg-gray-100"
                                    }`}
                            >
                                {/* Icon (Always visible) */}
                                <svg
                                    width="29"
                                    height="29"
                                    viewBox="0 0 29 29"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.5 27.1875C21.5071 27.1875 27.1875 21.5071 27.1875 14.5C27.1875 7.49289 21.5071 1.8125 14.5 1.8125C7.49289 1.8125 1.8125 7.49289 1.8125 14.5C1.8125 21.5071 7.49289 27.1875 14.5 27.1875Z"
                                        fill="#4F7FD6"
                                    />
                                    <path
                                        d="M12.6875 8.4585H16.3125V20.5418H12.6875V8.4585Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M8.45833 12.6875H20.5417V16.3125H8.45833V12.6875Z"
                                        fill="white"
                                    />
                                </svg>

                                {/* Text (Only when open) */}
                                <span
                                    className={`text-[#4F7FD6] text-lg font-medium transition-all duration-300 ${sidebarOpen
                                        ? "opacity-100"
                                        : "opacity-0 w-0 overflow-hidden"
                                        }`}
                                >
                                    Create Market
                                </span>
                            </Link>
                        </li>
                        {/* category */}
                        <li>
                            <Link
                                href="/admin-dashboard/category"
                                className={`flex items-center py-3 rounded-xl transition-all duration-300 ${sidebarOpen
                                    ? "gap-4 px-4"
                                    : "justify-center"
                                    } ${pathname === "/admin-dashboard/category"
                                        ? "bg-[#EDF2FB]"
                                        : "hover:bg-gray-100"
                                    }`}
                            >
                                {/* Icon (Always visible) */}
                                <svg
                                    width="29"
                                    height="29"
                                    viewBox="0 0 29 29"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.5 27.1875C21.5071 27.1875 27.1875 21.5071 27.1875 14.5C27.1875 7.49289 21.5071 1.8125 14.5 1.8125C7.49289 1.8125 1.8125 7.49289 1.8125 14.5C1.8125 21.5071 7.49289 27.1875 14.5 27.1875Z"
                                        fill="#4F7FD6"
                                    />
                                    <path
                                        d="M12.6875 8.4585H16.3125V20.5418H12.6875V8.4585Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M8.45833 12.6875H20.5417V16.3125H8.45833V12.6875Z"
                                        fill="white"
                                    />
                                </svg>

                                {/* Text (Only when open) */}
                                <span
                                    className={`text-[#4F7FD6] text-lg font-medium transition-all duration-300 ${sidebarOpen
                                        ? "opacity-100"
                                        : "opacity-0 w-0 overflow-hidden"
                                        }`}
                                >
                                    Categories
                                </span>
                            </Link>
                        </li>
                        {/* Resolve Markets */}
                        <li>
                            <Link
                                href="/admin-dashboard/resolve-market"
                                className={`flex items-center py-3 rounded-xl transition-all duration-300 ${sidebarOpen
                                    ? "gap-4 px-4"
                                    : "justify-center"
                                    } ${pathname === "/admin-dashboard/resolve-market"
                                        ? "bg-[#EDF2FB]"
                                        : "hover:bg-gray-100"
                                    }`}
                            >
                                {/* Icon (Always visible) */}
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_142_1623)">
                                        <path d="M20.4357 4.20911C17.4901 1.28632 11.4871 0.959036 8.04544 4.4235C7.48098 4.97605 7.583 5.60784 7.96673 5.99157C8.23757 6.2738 8.66583 6.39809 9.07235 6.2738C11.4757 5.51773 13.6989 5.45041 15.4705 6.75904L14.5228 9.2867C14.1613 10.2686 14.3535 10.9568 14.9966 11.6114L17.603 14.2291C18.1224 14.7594 18.6978 14.9179 19.4538 14.7366L21.2819 14.3192L22.1622 15.1996L22.0152 16.4859C21.9364 17.0162 22.0038 17.3435 22.4667 17.8065L23.3471 18.6527C23.8318 19.1379 24.4527 19.1829 24.9152 18.72L28.5376 15.1209C29 14.6579 28.9322 14.0375 28.4583 13.5409L27.5894 12.6719C27.1492 12.2204 26.7996 12.1302 26.2916 12.2095L24.9944 12.3674L24.1026 11.5099L24.6443 9.56893C24.8137 8.93714 24.5993 8.34989 23.9219 7.68393L20.4357 4.20911ZM1.15017 23.2C0.056978 24.1704 1.37687e-05 25.1859 1.01605 26.2129L2.80991 27.9958C3.81403 29 4.86321 28.9435 5.8228 27.8602L16.689 15.662L13.3488 12.3333L1.15017 23.2Z" fill="#4F7FD6" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_142_1623">
                                            <rect width="29" height="29" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>


                                {/* Text (Only when open) */}
                                <span
                                    className={`text-[#4F7FD6] text-lg font-medium transition-all duration-300 ${sidebarOpen
                                        ? "opacity-100"
                                        : "opacity-0 w-0 overflow-hidden"
                                        }`}
                                >
                                    Resolve Markets
                                </span>
                            </Link>
                        </li>

                        {/* Emergency Paulse */}
                        <li>
                            <Link
                                href="/admin-dashboard/emergency"
                                className={`flex items-center py-3 rounded-xl transition-all duration-300 ${sidebarOpen
                                    ? "gap-4 px-4"
                                    : "justify-center"
                                    } ${pathname === "/admin-dashboard/emergency"
                                        ? "bg-[#EDF2FB]"
                                        : "hover:bg-gray-100"
                                    }`}
                            >
                                {/* Icon (Always visible) */}
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_142_1623)">
                                        <path d="M20.4357 4.20911C17.4901 1.28632 11.4871 0.959036 8.04544 4.4235C7.48098 4.97605 7.583 5.60784 7.96673 5.99157C8.23757 6.2738 8.66583 6.39809 9.07235 6.2738C11.4757 5.51773 13.6989 5.45041 15.4705 6.75904L14.5228 9.2867C14.1613 10.2686 14.3535 10.9568 14.9966 11.6114L17.603 14.2291C18.1224 14.7594 18.6978 14.9179 19.4538 14.7366L21.2819 14.3192L22.1622 15.1996L22.0152 16.4859C21.9364 17.0162 22.0038 17.3435 22.4667 17.8065L23.3471 18.6527C23.8318 19.1379 24.4527 19.1829 24.9152 18.72L28.5376 15.1209C29 14.6579 28.9322 14.0375 28.4583 13.5409L27.5894 12.6719C27.1492 12.2204 26.7996 12.1302 26.2916 12.2095L24.9944 12.3674L24.1026 11.5099L24.6443 9.56893C24.8137 8.93714 24.5993 8.34989 23.9219 7.68393L20.4357 4.20911ZM1.15017 23.2C0.056978 24.1704 1.37687e-05 25.1859 1.01605 26.2129L2.80991 27.9958C3.81403 29 4.86321 28.9435 5.8228 27.8602L16.689 15.662L13.3488 12.3333L1.15017 23.2Z" fill="#4F7FD6" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_142_1623">
                                            <rect width="29" height="29" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>


                                {/* Text (Only when open) */}
                                <span
                                    className={`text-[#4F7FD6] text-lg font-medium transition-all duration-300 ${sidebarOpen
                                        ? "opacity-100"
                                        : "opacity-0 w-0 overflow-hidden"
                                        }`}
                                >
                                    Emergency Pause
                                </span>
                            </Link>
                        </li>


                        {/* Profile */}
                        <li>
                            <Link
                                href="/admin-dashboard/profile"
                                className={`flex items-center py-3 rounded-xl transition-all duration-300 ${sidebarOpen
                                    ? "gap-4 px-4"
                                    : "justify-center"
                                    } ${pathname === "/admin-dashboard/profile"
                                        ? "bg-[#EDF2FB]"
                                        : "hover:bg-gray-100"
                                    }`}
                            >
                                {/* Icon (Always visible) */}
                                <span>
                                    <User2 className=" text-[#4F7FD6] font-bold text-4xl  " />
                                </span>


                                {/* Text (Only when open) */}
                                <span
                                    className={`text-[#4F7FD6] text-lg font-medium transition-all duration-300 ${sidebarOpen
                                        ? "opacity-100"
                                        : "opacity-0 w-0 overflow-hidden"
                                        }`}
                                >
                                    Profile
                                </span>
                            </Link>
                        </li>






















                        {/* Logout btn  */}

                        <li onClick={handleLogout} className="flex items-center   py-3 rounded-xl transition-all duration-300  cursor-pointer " >
                            <span>
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.04167 25.375C5.37708 25.375 4.80836 25.1386 4.3355 24.6657C3.86264 24.1928 3.62581 23.6237 3.625 22.9583V6.04167C3.625 5.37708 3.86183 4.80836 4.3355 4.3355C4.80917 3.86264 5.37789 3.62581 6.04167 3.625H14.5V6.04167H6.04167V22.9583H14.5V25.375H6.04167ZM19.3333 20.5417L17.6719 18.7896L20.7531 15.7083H10.875V13.2917H20.7531L17.6719 10.2104L19.3333 8.45833L25.375 14.5L19.3333 20.5417Z" fill="#4F7FD6" />
                                </svg>

                            </span>
                            <p className=" text-[#4F7FD6] text-lg font-medium transition-all duration-300 " >
                                Log Out
                            </p>
                        </li>

                    </ul>
                </nav>
            </aside>

            {/* ================= Header ================= */}
            <header
                className={`fixed top-0 h-24 bg-white shadow z-20 flex items-center justify-between px-6 transition-all duration-300 ${sidebarOpen ? "ml-87.5" : "ml-25"
                    }`}
                style={{
                    width: sidebarOpen
                        ? "calc(100% - 350px)"
                        : "calc(100% - 100px)",
                }}
            >
                <Navbar />
            </header>

            {/* ================= Main Content ================= */}
            <main
                className={`flex-1 p-6 mt-24 transition-all duration-300 ${sidebarOpen ? "ml-87.5" : "ml-25"
                    }`}
            >
                {children}
            </main>
        </div>
    );
}