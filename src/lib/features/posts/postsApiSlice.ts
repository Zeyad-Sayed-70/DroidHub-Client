import { PostType, UpdatePost } from "@/types/post.type";
import { UserType } from "@/types/user.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CreatePostDto {
  creatorId: string;
  type: string;
  content?: string;
  sources?: string[];
  caption?: string;
}

interface GetPosts {
  posts: PostType[];
  users: { [key: string]: UserType };
}

export const postsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/posts" }),
  reducerPath: "postApi",
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query<GetPosts, { limit?: number; skip?: number }>({
      query: ({ limit, skip }) => `/?limit=${limit}&skip=${skip}`,
      providesTags: ["Posts"],
    }),
    getPost: builder.query<PostType, string>({
      query: (postId) => `/${postId}`,
    }),
    createPost: builder.mutation<PostType, CreatePostDto>({
      query: (newPost) => ({
        url: "/",
        method: "POST",
        body: newPost,
      }),
    }),
    updatePost: builder.mutation<
      PostType,
      { postId: string; newPost: UpdatePost }
    >({
      query: ({ postId, newPost }) => ({
        url: `/${postId}`,
        method: "PUT",
        body: newPost,
      }),
    }),
    deletePost: builder.mutation<PostType, string>({
      query: (postId) => ({
        url: `/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreatePostMutation, useGetPostQuery, useGetPostsQuery } =
  postsApiSlice;
