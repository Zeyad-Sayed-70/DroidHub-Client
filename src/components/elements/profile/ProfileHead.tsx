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
import {
  useFollowUserMutation,
  useGetUsersByIdMutation,
  useUnfollowUserMutation,
} from "@/lib/features/users/usersSlice";
import { UserType } from "@/types/user.type";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import { renderImg } from "@/utils/renderImg";

const ProfileHead = ({
  profile,
  refetch,
}: {
  profile: UserType;
  isLoading: boolean;
  refetch: (id: string) => void;
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const isFollowed = profile?.followers?.includes(session?.user._id as string);
  const [alreadyFollow, setAlreadyFollow] = React.useState(isFollowed);

  const isMe = session?.user._id === profile?._id;

  const [
    follow,
    {
      isLoading: isFollowLoading,
      isSuccess: isFollowSuccess,
      data: followData,
    },
  ] = useFollowUserMutation();
  const [
    unFollow,
    {
      isLoading: isUnfollowLoading,
      isSuccess: isUnfollowSuccess,
      data: unfollowData,
    },
  ] = useUnfollowUserMutation();

  const isFollowBtnLoading = isFollowLoading || isUnfollowLoading;
  const isFollowSuccessBtn = isFollowSuccess || isUnfollowSuccess;

  const handleFollow = () => {
    if (profile?._id && session?.user._id) {
      follow({ followId: profile?._id, userId: session?.user._id });
    }
  };

  const handleUnfollow = () => {
    if (profile?._id && session?.user._id) {
      unFollow({ unfollowId: profile?._id, userId: session?.user._id });
    }
  };

  useEffect(() => {
    if (followData)
      setAlreadyFollow(followData?.following?.includes(profile._id as string));
  }, [followData, isFollowSuccessBtn]);

  useEffect(() => {
    if (unfollowData)
      setAlreadyFollow(
        unfollowData?.following?.includes(profile._id as string)
      );
  }, [unfollowData, isUnfollowSuccess]);

  return (
    <section className="bg-white p-6 rounded-md">
      <nav className="mb-2 flex items-center gap-2">
        <Button
          size={"icon"}
          variant={"secondary"}
          className="hover:bg-gray-200"
          onClick={() => router.back()}
        >
          <IoArrowBackSharp />
        </Button>
        <h1 className="text-lg">{profile?.username}</h1>
      </nav>
      <div className="bg-gradient-to-br from-primary to-secondary w-full h-[250px] rounded-md">
        {profile?.banar && (
          <Image
            alt="profile-banar"
            src={renderImg(profile?.banar)}
            width={800}
            height={300}
            className="w-full h-full object-cover rounded-md"
          />
        )}
      </div>
      <header>
        <div className="flex items-start justify-between relative py-4">
          <div className="bg-background min-w-32 max-w-32 min-h-32 max-h-32 rounded-full relative -mb-14 z-0">
            <Image
              alt="profile-avatar"
              src={renderImg(profile?.avatar)}
              width={600}
              height={200}
              className="w-full h-full object-cover rounded-full absolute -top-16 left-3"
              onError={(element) =>
                (element.currentTarget.src = "/robo-user.png")
              }
            />
          </div>
          <div className="flex items-center gap-4">
            {isMe && <ProfileOptions profile={profile} refetch={refetch} />}
          </div>
        </div>
        <div className="w-full relative z-10">
          <Title title={profile?.username} size="text-xl" />
          <span className="text-md text-gray-500">{profile.role}</span>
        </div>
      </header>
      {/* Describtion */}
      <p className="text-gray-700 my-4 max-w-[600px]">{profile?.bio}</p>
      {/* Followers */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-gray-500">Followers</span>{" "}
            {profile?.followers?.length}
          </div>
          <div>
            <span className="text-gray-500">Following</span>{" "}
            {profile?.following?.length}
          </div>
        </div>

        <Button
          disabled={isFollowBtnLoading}
          onClick={() => (alreadyFollow ? handleUnfollow() : handleFollow())}
        >
          {isFollowBtnLoading ? <SmallLoading /> : ""}{" "}
          {alreadyFollow ? "UnFollow" : "Follow"}
        </Button>
      </div>
    </section>
  );
};

export default ProfileHead;
