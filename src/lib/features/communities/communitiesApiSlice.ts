import { CommunityType } from "@/types/community";
import { UserType } from "@/types/user.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CreateCommunityDto {
  name: string;
  description: string;
  image?: string;
  tags: string[];
}

interface UpdateCommunityDto {
  name?: string;
  description?: string;
  image?: string;
  banar?: string;
  tags?: string[];
}

export const communitiesApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/communities`,
  }),
  reducerPath: "communityApi",
  tagTypes: ["Communities"],
  endpoints: (builder) => ({
    getCommunities: builder.query<
      CommunityType[],
      { limit?: number; offset?: number }
    >({
      query: ({ limit, offset }) => `/?limit=${limit}&offset=${offset}`,
      providesTags: ["Communities"],
    }),
    getCommunity: builder.query<CommunityType, string>({
      query: (communityId) => `/${communityId}`,
    }),
    createCommunity: builder.mutation<CommunityType, CreateCommunityDto>({
      query: (newCommunity) => ({
        url: "/",
        method: "POST",
        body: newCommunity,
      }),
    }),
    updateCommunity: builder.mutation<
      CommunityType,
      { communityId: string; newCommunity: UpdateCommunityDto }
    >({
      query: ({ communityId, newCommunity }) => ({
        url: `/${communityId}`,
        method: "PUT",
        body: newCommunity,
      }),
    }),
    deleteCommunity: builder.mutation<CommunityType, string>({
      query: (communityId) => ({
        url: `/${communityId}`,
        method: "DELETE",
      }),
    }),
    toggleMember: builder.mutation<
      CommunityType,
      { communityId: string; memberId: string; action: "join" | "leave" }
    >({
      query: ({ action, communityId, memberId }) => ({
        url: `/member/${communityId}`,
        method: "PUT",
        body: { communityId, memberId, action },
      }),
    }),
  }),
});

export const {
  useCreateCommunityMutation,
  useGetCommunityQuery,
  useGetCommunitiesQuery,
  useUpdateCommunityMutation,
  useDeleteCommunityMutation,
  useToggleMemberMutation,
} = communitiesApiSlice;
