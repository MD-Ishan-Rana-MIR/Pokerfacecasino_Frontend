import { baseApi } from "../../base-api/baseApi"


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createCategory: builder.mutation({
            query: (payload) => ({
                url: `/admin/categories`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Category"]
        }),
        allCategory: builder.query({
            query: () => ({
                url: `/admin/categories`,
                method: "GET"
            }),
            providesTags: ["Category"]
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/admin/categories/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Category"]
        }),
        categoryUpdate: builder.mutation({
            query: ({ id, updateCategory }) => ({
                url: `/admin/categories/${id}?_method=PATCH`,
                method: "POST",
                body: updateCategory
            }),

            invalidatesTags: ["Category"]
        })


    }),
})

export const {
    useCreateCategoryMutation,
    useAllCategoryQuery,
    useDeleteCategoryMutation,
    useCategoryUpdateMutation

} = authApi
