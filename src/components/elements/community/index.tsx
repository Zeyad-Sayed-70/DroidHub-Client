"use client";
import React from "react";
import ProfileHead from "./ProfileHead";
import { CommunityType } from "@/types/community";
import Posts from "./Posts";
import { useGetCommunityQuery } from "@/lib/features/communities/communitiesApiSlice";
import { useParams } from "next/navigation";

const CommunityPage = () => {
  const { community_id } = useParams();
  const {
    data: community,
    isLoading,
    refetch,
  } = useGetCommunityQuery(community_id as string);
  return (
    <article>
      <ProfileHead
        community={community as CommunityType}
        isLoading={isLoading}
        refetch={refetch}
      />
      <Posts community={community as CommunityType} />
    </article>
  );
};

export default CommunityPage;
