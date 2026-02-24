import { baseApi } from "../base-api/baseApi"

export const userBitApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        bitMarket: builder.mutation({
            query: (payload) => ({
                url: "/user/create-bit",
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Market"]
        }),
        userBitProfile: builder.query({
            query: () => ({
                url: `/user/my-portfolio-info`,
                method: "GET"
            }),
            providesTags: ["Market"]
        })

    }),
})

export const {
    useBitMarketMutation,
    useUserBitProfileQuery

} = userBitApi
