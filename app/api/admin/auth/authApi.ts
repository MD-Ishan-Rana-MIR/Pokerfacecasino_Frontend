import { AdminLoginPayloadType, LoginApiResponsetype } from "@/lib/type/authType"
import { baseApi } from "../../base-api/baseApi"

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginApiResponsetype, AdminLoginPayloadType>({
            query: (payload) => ({
                url: "/login",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Auth"],
        }),

        emailVerify: builder.mutation({
            query: (payload) => ({
                url: `/forgot-password`,
                method: "POST",
                body: payload
            })
        }),


        otpVerify: builder.mutation({
            query: (payload) => ({
                url: `/verify-otp`,
                method: "POST",
                body: payload
            })
        }),



        profile: builder.query({
            query: () => ({
                url: `/get-profile`,
                method: "GET"
            }),
            providesTags: ["Auth"]
        }),

        profileUpdate: builder.mutation({
            query: (formData) => ({
                url: `/personalization`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["Auth"]
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: `/logout`,
                method: "POST",
            }),
            invalidatesTags: ["Auth"]
        }),


        passwordUpdate: builder.mutation({
            query: (formData) => ({
                url: `/update-password`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["Auth"]
        }),

        adminProfile: builder.query({
            query: () => ({
                url: `/get-profile`
            }),
            providesTags: ["Auth"]
        })






    }),
})

export const {
    useLoginMutation,
    useAdminLogoutMutation,
    useEmailVerifyMutation, useOtpVerifyMutation, useProfileQuery, useProfileUpdateMutation, usePasswordUpdateMutation,
    useAdminProfileQuery
} = authApi
