import { BLOG_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const blogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: ({ page = 1, limit = 10 }) => ({
                url: `${BLOG_URL}/get-blogs?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Blog"],
        }),
        getBlog: builder.query({
            query: (id) => `${BLOG_URL}/${id}`,
            providesTags: (result, error, id) => [{ type: 'Blog', id }],
        }),
        createBlog: builder.mutation({
            query: (data) => ({
                url: `${BLOG_URL}/create`,
                method: "POST",
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ["Blog"],
        }),
    }),
});

export const { useGetBlogsQuery, useGetBlogQuery, useCreateBlogMutation } = blogApiSlice; 