import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imageApiSlice = createApi({
  reducerPath: "imageApi",
  tagTypes: ["Image"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/images`,
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation<{ url: string }, FormData>({
      query: (data) => ({
        url: "/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Image"],
    }),
  }),
});

export const { useUploadImageMutation } = imageApiSlice;
