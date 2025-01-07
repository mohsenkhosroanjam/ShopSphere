// src/slices/apiSlice.js
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

// Remove BASE_URL from individual endpoints since it's handled in baseQuery
const baseQuery = fetchBaseQuery({
    baseUrl: '', // Empty since BASE_URL is included in constants
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User', 'Category'],
    endpoints: (builder) => ({}),
});