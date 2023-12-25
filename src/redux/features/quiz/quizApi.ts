import { apiSlice } from "@/redux/api/apiSlice";

const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizs: builder.query({
      query: ({ searchTerm, question, creatorId, categoryId }) => {
        let queryString = `/quizs?size=50`;
        if (searchTerm && searchTerm.length > 0) {
          queryString += `&searchTerm=${searchTerm}`;
        }
        if (question && question.length > 0) {
          queryString += `&question=${question}`;
        }
        if (creatorId && creatorId.length > 0) {
          queryString += `&creatorId=${creatorId}`;
        }
        if (categoryId && categoryId.length > 0) {
          queryString += `&categoryId=${categoryId}`;
        }
        return queryString;
      },
      providesTags: ["quizs"],
    }),
    createQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["quizs"],
    }),
    getSingleQuiz: builder.query({
      query: (id) => `/quizs/${id}`,
      providesTags: ["quiz"],
    }),
    updateQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["quiz", "quizs"],
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["quizs"],
    }),
  }),
});

export const {
  useGetQuizsQuery,
  useGetSingleQuizQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} = quizApi;
