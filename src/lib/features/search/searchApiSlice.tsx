import { UserType } from "@/types/user.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/search`,
  }),
  reducerPath: "searchApi",
  tagTypes: ["Search"],
  endpoints: (builder) => ({
    search: builder.mutation<
      { users?: UserType[] },
      { q: string; target?: string }
    >({
      query: ({ q, target }) => `/?q=${q}${target ? "&target=" + target : ""}`,
    }),
  }),
});

export const { useSearchMutation } = searchApiSlice;
