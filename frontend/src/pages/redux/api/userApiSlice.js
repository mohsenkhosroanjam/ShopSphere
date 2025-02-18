import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    googleLogin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/google-login`,
        method: "POST",
        body: data,
      }),
    }),

    googleSignIn: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/google-signin`,
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),

    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateUser: builder.mutation({
      query: ({ userId, ...updatedFields }) => ({
        url: `${USERS_URL}/${userId}`,
        method: "PUT",
        body: updatedFields,
      }),
      invalidatesTags: ["User"], // Automatically invalidate the "User" cache
    }),
    distributorRegister: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/distributor/register`,
        method: "POST",
        body: data,
      }),
    }),
    distributorLogin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/distributor/login`,
        method: "POST",
        body: data,
      }),
    }),
    requestAccountDeletion: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/request-deletion`,
        method: 'POST',
      }),
    }),
    confirmAccountDeletion: builder.mutation({
      query: (token) => ({
        url: `${USERS_URL}/confirm-deletion/${token}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGoogleLoginMutation,
  useGoogleSignInMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDistributorRegisterMutation, 
  useDistributorLoginMutation,
  useRequestAccountDeletionMutation,
  useConfirmAccountDeletionMutation,
} = userApiSlice;
