import { baseApi } from "../base-api/baseApi"

export const userMarketApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        userAllMarket: builder.query({
            query: () => ({
                url: "/user/get-markets"
            }),
            providesTags: ["Market"]
        }),
        marketDetails: builder.query({
            query: (id) => ({
                url: `/user/view-market/${id}`,
                method: "GET"
            }),
            providesTags: ["Market"]

        })

    }),
})

export const {
    useUserAllMarketQuery,
    useMarketDetailsQuery

} = userMarketApi
