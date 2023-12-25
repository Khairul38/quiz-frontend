import { apiSlice } from "@/redux/api/apiSlice";

const leaderBoardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderBoards: builder.query({
      query: ({
        searchTerm,
        totalMark,
        correctlyAnswer,
        userId,
        categoryId,
      }) => {
        let queryString = `/leaderBoards?size=50`;
        if (searchTerm && searchTerm.length > 0) {
          queryString += `&searchTerm=${searchTerm}`;
        }
        if (totalMark && totalMark.length > 0) {
          queryString += `&totalMark=${totalMark}`;
        }
        if (correctlyAnswer && correctlyAnswer.length > 0) {
          queryString += `&correctlyAnswer=${correctlyAnswer}`;
        }
        if (userId && userId.length > 0) {
          queryString += `&userId=${userId}`;
        }
        if (categoryId && categoryId.length > 0) {
          queryString += `&categoryId=${categoryId}`;
        }
        return queryString;
      },
      providesTags: ["leaderBoards"],
    }),
    createLeaderBoard: builder.mutation({
      query: (data) => ({
        url: "/leaderBoards/create-leaderBoard",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leaderBoards", "leaderBoard"],
    }),
    getSingleLeaderBoard: builder.query({
      query: (id) => `/leaderBoards/${id}`,
      providesTags: ["leaderBoard"],
    }),
    updateLeaderBoard: builder.mutation({
      query: ({ id, data }) => ({
        url: `/leaderBoards/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["leaderBoards", "leaderBoard"],
    }),
  }),
});

export const {
  useGetLeaderBoardsQuery,
  useGetSingleLeaderBoardQuery,
  useCreateLeaderBoardMutation,
  useUpdateLeaderBoardMutation,
} = leaderBoardApi;
