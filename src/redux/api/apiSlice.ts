import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { userLoggedOut } from "../features/auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: async (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    // if (result?.error?.status === 401 || result?.error?.status === 404) {
    //   api.dispatch(userLoggedOut());
    //   localStorage.clear();
    // }
    return result;
  },
  tagTypes: ["quizs", "quiz", "leaderBoards", "leaderBoard"],
  endpoints: () => ({}),
});
