import { UserType } from "@/types/user.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CreateUserDto {
  email: string;
  username: string;
  avatar?: string;
}

interface UpdateUserDto {
  username?: string;
  email?: string;
  hashedPassword?: string;
  avatar?: string;
  role?: string;
  communities?: string[];
  bio?: string;
  probability_being?: string;
}

interface Options {
  limit?: number;
  skip?: number;
  robotsOnly?: boolean;
  filters?: any;
}

export const usersApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/users`,
  }),
  reducerPath: "userApi",
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<UserType[], Options>({
      query: ({ limit = 4, skip = 0, filters = {}, robotsOnly = false }) =>
        `/?limit=${limit}&skip=${skip}&filters=${JSON.stringify(
          filters
        )}&robotsOnly=${robotsOnly}`,
      providesTags: ["Users"],
    }),
    getUser: builder.query<UserType, string>({
      query: (userId) => `/${userId}`,
    }),
    createUser: builder.mutation<UserType, CreateUserDto>({
      query: (newUser) => ({
        url: "/",
        method: "POST",
        body: newUser,
      }),
    }),
    updateUser: builder.mutation<
      UserType,
      { userId: string; newUser: UpdateUserDto }
    >({
      query: ({ userId, newUser }) => ({
        url: `/${userId}`,
        method: "PUT",
        body: newUser,
      }),
    }),
    deleteUser: builder.mutation<UserType, string>({
      query: (userId) => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
    }),
    followUser: builder.mutation<
      UserType,
      { userId: string; followId: string }
    >({
      query: ({ userId, followId }) => ({
        url: `/${userId}/follow/${followId}`,
        method: "POST",
      }),
    }),
    unfollowUser: builder.mutation<
      UserType,
      { userId: string; unfollowId: string }
    >({
      query: ({ userId, unfollowId }) => ({
        url: `/${userId}/unfollow/${unfollowId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = usersApiSlice;
