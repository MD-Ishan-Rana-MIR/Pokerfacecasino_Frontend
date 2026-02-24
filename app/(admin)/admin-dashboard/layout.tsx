"use client";

import React, {  useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { logoutAlert } from "@/lib/msg/logoutAlert";
import { errorMessage } from "@/lib/msg/errorAlert";
import { toast } from "sonner";
// import { removeToken } from "@/lib/token/token";
import { useAdminLogoutMutation } from "@/app/api/admin/auth/authApi";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();

    // ========================= LOGOUT API ========================

    const [adminLogout] = useAdminLogoutMutation();


    const router = useRouter();
    const handleLogout = async () => {
        const res = await logoutAlert();
        if (res.isConfirmed) {
            try {
                const res = await adminLogout({}).unwrap();
                if (res) {
                    toast.success(res?.message);
                    // removeToken();
                    router.push("/admin-login")
                }
            } catch (error) {
                return errorMessage(error)
            }

        }
    }

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         router.push("/admin-login")
    //     }
    // }, [router])


    const [settingOpen, setSettingOpen] = useState(false); // Dropdown state
    const pathnames = "/admin-dashboard/seeting"; // Example current path

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

                        {/* Admin Wallet */}
                        <li>
                            <Link
                                href="/admin-dashboard/admin-wallet"
                                className={`flex items-center py-3 rounded-xl transition-all duration-300 ${sidebarOpen
                                    ? "gap-4 px-4"
                                    : "justify-center"
                                    } ${pathname === "/admin-dashboard/admin-wallet"
                                        ? "bg-[#EDF2FB]"
                                        : "hover:bg-gray-100"
                                    }`}
                            >
                                {/* Icon (Always visible) */}
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" fillRule="evenodd" d="M25.496 9.67148C25.4275 9.66745 25.3546 9.66584 25.2773 9.66664H22.2262C19.7274 9.66664 17.5898 11.6338 17.5898 14.1979C17.5898 16.762 19.7286 18.7291 22.2262 18.7291H25.2773C25.3546 18.73 25.4279 18.7283 25.4972 18.7243C26.0108 18.6933 26.4956 18.4767 26.8612 18.1148C27.2269 17.7529 27.4486 17.2704 27.4849 16.7571C27.4897 16.6846 27.4897 16.6061 27.4897 16.5336V11.8622C27.4897 11.7897 27.4897 11.7111 27.4849 11.6386C27.4486 11.1254 27.2269 10.6429 26.8612 10.281C26.4956 9.91907 26.0095 9.70244 25.496 9.67148ZM21.9592 15.4062C22.602 15.4062 23.1228 14.8649 23.1228 14.1979C23.1228 13.5309 22.602 12.9896 21.9592 12.9896C21.3151 12.9896 20.7943 13.5309 20.7943 14.1979C20.7943 14.8649 21.3151 15.4062 21.9592 15.4062Z" fill="#4F7FD6" />
                                    <path fill-rule="evenodd" fillRule="evenodd" d="M25.276 20.5417C25.3178 20.54 25.3594 20.5482 25.3974 20.5656C25.4354 20.583 25.4687 20.6091 25.4948 20.6419C25.5208 20.6746 25.5387 20.713 25.5471 20.7539C25.5555 20.7949 25.5541 20.8373 25.543 20.8776C25.3014 21.7379 24.9159 22.4726 24.2985 23.0888C23.3934 23.9951 22.2467 24.395 20.8305 24.586C19.453 24.7708 17.6949 24.7708 15.474 24.7708H12.922C10.7011 24.7708 8.94175 24.7708 7.56546 24.586C6.14929 24.395 5.00258 23.9939 4.09754 23.09C3.19371 22.185 2.79254 21.0383 2.60162 19.6221C2.41675 18.2446 2.41675 16.4865 2.41675 14.2656V14.1302C2.41675 11.9093 2.41675 10.15 2.60162 8.7725C2.79254 7.35633 3.19371 6.20962 4.09754 5.30458C5.00258 4.40075 6.14929 3.99958 7.56546 3.80867C8.94296 3.625 10.7011 3.625 12.922 3.625H15.474C17.6949 3.625 19.4542 3.625 20.8305 3.80988C22.2467 4.00079 23.3934 4.40196 24.2985 5.30579C24.9159 5.92446 25.3014 6.65792 25.543 7.51825C25.5541 7.55857 25.5555 7.60093 25.5471 7.64189C25.5387 7.68284 25.5208 7.72125 25.4948 7.75397C25.4687 7.7867 25.4354 7.81283 25.3974 7.83024C25.3594 7.84765 25.3178 7.85584 25.276 7.85417H22.2262C18.7981 7.85417 15.7773 10.5608 15.7773 14.1979C15.7773 17.835 18.7981 20.5417 22.2262 20.5417H25.276ZM6.948 8.45833C6.70765 8.45833 6.47714 8.55381 6.30718 8.72377C6.13723 8.89372 6.04175 9.12423 6.04175 9.36458C6.04175 9.60493 6.13723 9.83544 6.30718 10.0054C6.47714 10.1754 6.70765 10.2708 6.948 10.2708H11.7813C12.0217 10.2708 12.2522 10.1754 12.4221 10.0054C12.5921 9.83544 12.6876 9.60493 12.6876 9.36458C12.6876 9.12423 12.5921 8.89372 12.4221 8.72377C12.2522 8.55381 12.0217 8.45833 11.7813 8.45833H6.948Z" fill="#4F7FD6" />
                                </svg>


                                {/* Text (Only when open) */}
                                <span
                                    className={`text-[#4F7FD6] text-lg font-medium transition-all duration-300 ${sidebarOpen
                                        ? "opacity-100"
                                        : "opacity-0 w-0 overflow-hidden"
                                        }`}
                                >
                                    Admin Wallet
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


                        {/* Settings Parent */}
                        <li>
                            <button
                                onClick={() => setSettingOpen(!settingOpen)}
                                className={`flex items-center cursor-pointer w-full py-3 rounded-xl transition-all duration-300 ${sidebarOpen ? "gap-4 px-4" : "justify-center"
                                    } ${pathname.startsWith("/admin-dashboard/seeting")
                                        ? "bg-[#EDF2FB]"
                                        : "hover:bg-gray-100"
                                    }`}
                            >
                                {/* Icon */}
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_648_1137)">
                                        <path d="M20.4352 4.20911C17.4896 1.28632 11.4866 0.959036 8.04495 4.4235C7.48049 4.97605 7.58251 5.60784 7.96624 5.99157C8.23708 6.2738 8.66535 6.39809 9.07186 6.2738C11.4752 5.51773 13.6984 5.45041 15.47 6.75904L14.5223 9.2867C14.1608 10.2686 14.353 10.9568 14.9962 11.6114L17.6025 14.2291C18.1219 14.7594 18.6973 14.9179 19.4533 14.7366L21.2814 14.3192L22.1617 15.1996L22.0147 16.4859C21.936 17.0162 22.0033 17.3435 22.4662 17.8065L23.3466 18.6527C23.8313 19.1379 24.4522 19.1829 24.9147 18.72L28.5371 15.1209C28.9995 14.6579 28.9317 14.0375 28.4578 13.5409L27.5889 12.6719C27.1487 12.2204 26.7992 12.1302 26.2911 12.2095L24.9939 12.3674L24.1021 11.5099L24.6438 9.56893C24.8132 8.93714 24.5988 8.34989 23.9214 7.68393L20.4352 4.20911ZM1.14969 23.2C0.0564897 24.1704 -0.000474513 25.1859 1.01556 26.2129L2.80942 27.9958C3.81354 29 4.86272 28.9435 5.82231 27.8602L16.6885 15.662L13.3483 12.3333L1.14969 23.2Z" fill="#4F7FD6" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_648_1137">
                                            <rect width="29" height="29" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>


                                {/* Text */}
                                <span
                                    className={`text-[#4F7FD6] text-lg font-medium transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                                        }`}
                                >
                                    Seeting
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            {settingOpen && sidebarOpen && (
                                <ul className="mt-2 ml-12 space-y-2">
                                    <li>
                                        <Link
                                            href="/admin-dashboard/seeting/profile"
                                            className={`block py-2 px-4 text-[#4F7FD6] text-lg font-medium transition-all duration-300 rounded-lg hover:bg-gray-100 ${pathname === "/admin-dashboard/seeting/profile"
                                                ? "bg-[#EDF2FB]"
                                                : "hover:bg-gray-100"
                                                } `}
                                        >
                                            Personal Information
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/admin-dashboard/seeting/contact"
                                            className={`block py-2 px-4 text-[#4F7FD6] text-lg font-medium transition-all duration-300 rounded-lg hover:bg-gray-100 ${pathname === "/admin-dashboard/seeting/contact"
                                                ? "bg-[#EDF2FB]"
                                                : "hover:bg-gray-100"
                                                } `}
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            )}
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