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
        toggleBlogLike: builder.mutation({
            query: (id) => ({
                url: `${BLOG_URL}/${id}/like`,
                method: 'POST',
            }),
            // Optimistically update the cache
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // Update the blog details cache
                    dispatch(
                        blogApiSlice.util.updateQueryData('getBlog', id, (draft) => {
                            draft.isLiked = data.isLiked;
                            draft.likeCount = data.likes;
                        })
                    );
                } catch {
                    // If the mutation fails, the cache will be rolled back automatically
                }
            },
        }),
    }),
});

export const { 
    useGetBlogsQuery, 
    useGetBlogQuery, 
    useCreateBlogMutation,
    useToggleBlogLikeMutation 
} = blogApiSlice; 