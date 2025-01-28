import { apiSlice } from "./apiSlice.js";
import { CART_URL } from "../constants.js";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (data) => ({
        url: CART_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
    updateCartQuantity: builder.mutation({
      query: ({ userId, productId, quantity }) => ({
        url: `${CART_URL}/update`,
        method: 'PUT',
        body: { userId, productId, quantity }
      }),
      invalidatesTags: ['Cart']
    }),
    fetchCart: builder.query({
      query: (userId) => ({
        url: `${CART_URL}`,
        params: { userId }
      }),
      providesTags: ['Cart']
    }),
    
  }),
});

export const { 
  useAddCartMutation,
  useUpdateCartQuantityMutation,
  useFetchCartQuery 
} = cartApiSlice;
