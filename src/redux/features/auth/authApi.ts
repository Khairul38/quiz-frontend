/* eslint-disable no-empty */
import { apiSlice } from "@/redux/api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.data.accessToken,
            })
          );
          dispatch(userLoggedIn(result.data.data.accessToken));
        } catch (error) {}
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/signin",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: [],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.data.accessToken,
            })
          );
          dispatch(userLoggedIn(result.data.data.accessToken));
        } catch (error) {}
      },
    }),
    refreshToken: builder.mutation({
      query: (data) => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
      // invalidatesTags: [],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.data.accessToken,
            })
          );
          dispatch(userLoggedIn(result.data.data.accessToken));
        } catch (error) {}
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useRefreshTokenMutation } =
  authApi;
