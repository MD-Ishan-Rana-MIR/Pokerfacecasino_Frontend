"use client";

import React from "react";
import Image from "next/image";

const Navbar = () => {
    return (
        <div className="flex items-center justify-between w-full">
            {/* Left Side */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Dashboard Overview
                </h1>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-6">
                {/* Notification Bell */}
                <div className="relative cursor-pointer">
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.61606 29.2279V15.3825C9.61606 12.9345 10.629 10.5868 12.4322 8.85581C14.2353 7.12481 16.6809 6.15234 19.2309 6.15234C21.7809 6.15234 24.2264 7.12481 26.0295 8.85581C27.8327 10.5868 28.8456 12.9345 28.8456 15.3825V29.2279M9.61606 29.2279H28.8456M9.61606 29.2279H6.41113M28.8456 29.2279H32.0506M17.6284 33.843H20.8333"
                            stroke="#B9B9B9"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    {/* Notification Dot */}
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white" />
                </div>

                {/* User Avatar */}
                <div className="cursor-pointer">
                    <Image
                        src="/logo/user.svg"
                        alt="user"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                </div>
                <div>
                    <h1 className=" text-[#000000B2] text-2xl " >Admin User</h1>
                    <p className=" text-[#626060] " >ad@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;