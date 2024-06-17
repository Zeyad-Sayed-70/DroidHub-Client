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
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/posts`,
  }),
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
    toggleReaction: builder.mutation<
      { post: PostType; user: UserType },
      { postId: string; userId: string }
    >({
      query: ({ postId, userId }) => ({
        url: `/reaction`,
        method: "POST",
        body: { postId, userId },
      }),
    }),
    createComment: builder.mutation<
      { comment: any },
      {
        postId: string;
        userId: string;
        comment: string;
        replyToCommentId?: string;
      }
    >({
      query: ({ postId, userId, comment, replyToCommentId }) => ({
        url: `/comments`,
        method: "POST",
        body: { postId, userId, comment, replyToCommentId },
      }),
    }),
    getPostComments: builder.mutation<
      { comments: any; usersHash: { [key: string]: any } },
      {
        postId: string;
      }
    >({
      query: ({ postId }) => ({
        url: `/comments/${postId}`,
        method: "GET",
      }),
    }),
    updateComment: builder.mutation<
      { comment: any },
      {
        comment: string;
        commentId: string;
      }
    >({
      query: ({ comment, commentId }) => ({
        url: `/comments/${commentId}`,
        method: "PUT",
        body: { comment },
      }),
    }),
    deleteComment: builder.mutation<
      { comment: any },
      {
        commentId: string;
      }
    >({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useToggleReactionMutation,
  useCreateCommentMutation,
  useGetPostCommentsMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = postsApiSlice;
