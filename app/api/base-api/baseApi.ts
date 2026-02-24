import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const baseApi = createApi({
    reducerPath: "api",

    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/`,

        prepareHeaders: (headers) => {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("token");
                const user_token = localStorage.getItem("user-token");
                const address = localStorage.getItem("address");

                // ✅ Prefer token if exists
                if (token) {
                    headers.set("Authorization", `Bearer ${token}`);
                }
                if (user_token) {
                    headers.set("Authorization", `Bearer ${user_token}`);
                }


                if (address) {
                    headers.set("X-Wallet-Address", address);
                }
            }

            headers.set("Accept", "application/json");

            return headers;
        },
    }),

    tagTypes: ["Auth", "Category", "Market", "UserAuth", "UserBit"],

    endpoints: () => ({}),
});