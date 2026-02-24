import { baseApi } from "../../base-api/baseApi"


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        marketCreate: builder.mutation({
            query: (formData) => ({
                url: `/admin/markets`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["Market"]
        }),

        allMarketByAdmin: builder.query({
            query: () => ({
                url: `/admin/markets`,
                method: "GET"
            }),
            providesTags: ["Market"]
        }),

        marketDelete: builder.mutation({
            query: (id) => ({
                url: `/admin/markets/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Market"]
        }),

        singleMarket: builder.query({
            query: (id) => ({
                url: `/admin/markets/${id}`
            }),
            providesTags: ["Market"]
        }),
        marketUpdate: builder.mutation({
            query: ({ id, payload }) => ({
                url: `/admin/markets/${id}?_method=PATCH`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Market"]
        }),
        marketResolve: builder.mutation({
            query: (formData) => ({
                url: `/admin/resolve-market`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["Market"]
        })



    }),
})

export const {
    useMarketCreateMutation,
    useAllMarketByAdminQuery,
    useMarketDeleteMutation,
    useSingleMarketQuery,
    useMarketUpdateMutation,
    useMarketResolveMutation

} = authApi
