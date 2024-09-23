"use client";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import SmallLoading from "@/components/ui/smallLoading";
import Title from "@/components/ui/title";
import useToggleCommunityMemberStatus from "@/hooks/useToggleCommunityMemberStatus";
import { useGetCommunityQuery } from "@/lib/features/communities/communitiesApiSlice";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import ProfileOptions from "./ProfileOptions";

const ProfileHead = () => {
  const { community_id } = useParams();

  const {
    data: community,
    isLoading,
    refetch,
  } = useGetCommunityQuery(community_id as string);

  const {
    handleToggleMember,
    isJoined,
    isLoading: isMemberStatusLoading,
  } = useToggleCommunityMemberStatus({
    community,
  });

  if (isLoading) return <Loader />;

  return (
    <section>
      <div className="bg-background w-full h-52 rounded-md">
        <Image
          alt="community-banar"
          src={
            community?.banar
              ? `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${
                  community?.banar as string
                }`
              : "/community-robots.jfif"
          }
          width={600}
          height={200}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <header className="flex items-center gap-4 my-4">
        <div className="bg-background min-w-16 max-w-16 min-h-16 max-h-16 rounded-full">
          <Image
            alt="community-banar"
            src={
              community?.image
                ? `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${
                    community?.image as string
                  }`
                : "/robo-user.png"
            }
            width={600}
            height={200}
            className="w-full h-full object-cover rounded-full"
            onError={(element) =>
              (element.currentTarget.src = "/robo-user.png")
            }
          />
        </div>
        <div className="flex items-center justify-between gap-4 w-full">
          <Title title={community?.name as string} />

          <div className="flex items-center gap-4">
            <Button
              variant="default"
              onClick={handleToggleMember}
              disabled={isMemberStatusLoading}
              aria-label={isJoined ? "Leave community" : "Join community"}
            >
              {isMemberStatusLoading && (
                <span className="mr-1">
                  <SmallLoading />
                </span>
              )}
              {isJoined ? "Leave" : "Join"}
            </Button>

            <ProfileOptions community={community} refetch={refetch} />
          </div>
        </div>
      </header>
    </section>
  );
};

export default ProfileHead;
