import { apiSlice } from "@/redux/api/apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ searchTerm, name }) => {
        let queryString = `/categories?size=50`;
        if (searchTerm && searchTerm.length > 0) {
          queryString += `&searchTerm=${searchTerm}`;
        }
        if (name && name.length > 0) {
          queryString += `&name=${name}`;
        }
        return queryString;
      },
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
