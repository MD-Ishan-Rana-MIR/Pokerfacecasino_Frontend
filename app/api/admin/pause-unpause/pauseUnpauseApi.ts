import { baseApi } from "../../base-api/baseApi"

export const pauseUnpauseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        pauseMarket: builder.mutation({
            query: () => ({
                url: `/admin/opened-locked-toggle`,
                method: "PATCH",
            }),
            invalidatesTags: ["Market"]
        }),
        getMarketStatus: builder.query({
            query: () => ({
                url: `/admin/get-status`,
                method: "GET"
            }),
            providesTags: ["Market"]
        })
    }),
})

export const { usePauseMarketMutation, useGetMarketStatusQuery } = pauseUnpauseApi
