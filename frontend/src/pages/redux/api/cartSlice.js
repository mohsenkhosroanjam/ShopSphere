import { apiSlice } from "./apiSlice.js";
import { CART_URL } from "../constants.js";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (newProduct) => ({
        url: `${CART_URL}`,
        method: "POST",
        body: newProduct,
        
      }),
    }),

    fetchCart: builder.query({
      query: (userId) => ({
        url: `${CART_URL}/${userId}`,
      }),
    }),
    
  }),
});

export const { useAddCartMutation, useFetchCartQuery } = cartApiSlice;
