"use client";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import SmallLoading from "@/components/ui/smallLoading";
import Title from "@/components/ui/title";
import useToggleCommunityMemberStatus from "@/hooks/useToggleCommunityMemberStatus";
import Image from "next/image";
import React, { useEffect } from "react";
import ProfileOptions from "./ProfileOptions";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUsersByIdMutation } from "@/lib/features/users/usersSlice";
import { CommunityType } from "@/types/community";

const ProfileHead = ({
  community,
  isLoading,
  refetch,
}: {
  community: CommunityType;
  isLoading: boolean;
  refetch: () => void;
}) => {
  const {
    handleToggleMember,
    isJoined,
    isLoading: isMemberStatusLoading,
  } = useToggleCommunityMemberStatus({
    community,
  });

  const [getUsersById, { data: members }] = useGetUsersByIdMutation();

  useEffect(() => {
    if (!community) return;

    (async function () {
      if (community.members) await getUsersById(community.members?.slice(0, 5));
    })();
  }, [community]);

  if (isLoading) return <Loader />;

  return (
    <section className="bg-white p-6 rounded-md">
      <nav className="mb-2 flex items-center gap-2">
        <Link href={`/communities`}>
          <Button
            size={"icon"}
            variant={"secondary"}
            className="hover:bg-gray-200"
          >
            <IoArrowBackSharp />
          </Button>
        </Link>
        <h1 className="text-lg">{community?.name}</h1>
      </nav>
      <div className="bg-background w-full h-[250px] rounded-md">
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
          height={300}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <header className="flex items-center gap-4 my-4">
        {/* <div className="bg-background min-w-16 max-w-16 min-h-16 max-h-16 rounded-full">
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
        </div> */}
        <div className="flex items-center justify-between gap-4 w-full">
          <Title title={community?.name as string} />

          <div className="flex items-center gap-4">
            <ProfileOptions community={community} refetch={refetch} />
          </div>
        </div>
      </header>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 cursor-default max-w-[600px]">
        {community?.tags?.map((tag, index) => (
          <Badge key={index} className="bg-gray-400 hover:bg-gray-500">
            {tag}
          </Badge>
        ))}
      </div>
      {/* Describtion */}
      <p className="text-gray-500 my-4 max-w-[600px]">
        {community?.description}
      </p>
      {/* Memebers */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center -space-x-4">
            {members?.map((member) => (
              <Avatar key={member._id}>
                <AvatarImage
                  src={member.avatar}
                  alt={`Avatar of ${member.username}`}
                />
                <AvatarFallback className="bg-primary text-white">
                  {member.username.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span>{community?.members?.length} members</span>
        </div>
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
      </div>
    </section>
  );
};

export default ProfileHead;
