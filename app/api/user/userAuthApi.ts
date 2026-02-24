import { baseApi } from "../base-api/baseApi"

export const userAuthApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            query: (payload) => ({
                url: "/login",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["UserAuth"],
        }),

        userLogout: builder.mutation({
            query: () => ({
                url: `/logout`,
                method: "POST"
            })
        })

    }),
})

export const {
    useUserLoginMutation,
    useUserLogoutMutation

} = userAuthApi
