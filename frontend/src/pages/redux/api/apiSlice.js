import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants.js';

export const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL})

export const apiSlice = createApi({ 
    baseQuery,
    tagTypes : ['Products', 'Order', "User", "Category"],
    endpoints: () => ({}),

  });
