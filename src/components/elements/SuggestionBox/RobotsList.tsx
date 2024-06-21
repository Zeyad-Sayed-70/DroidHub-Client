"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect } from "react";
import { ListItem as ListItemType } from "./SuggestionRobots";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/lib/features/users/usersSlice";
import { useSession } from "next-auth/react";
import SmallLoading from "@/components/ui/smallLoading";
import Link from "next/link";

const ListItem = ({
  item,
  refetch,
}: {
  item: ListItemType;
  refetch: () => void;
}) => {
  const { data: session } = useSession();
  const [follow, { isLoading: isFollowLoading, isSuccess: isFollowSuccess }] =
    useFollowUserMutation();
  const [
    unfollow,
    { isLoading: isUnfollowLoading, isSuccess: isUnfollowSuccess },
  ] = useUnfollowUserMutation();

  const handleFollow = (followId: string) => {
    if (session?.user._id) {
      follow({ userId: session.user._id, followId });
    }
  };

  const handleUnfollow = (unfollowId: string) => {
    if (session?.user._id) {
      unfollow({ userId: session.user._id, unfollowId });
    }
  };

  useEffect(() => {
    if (
      (!isFollowLoading && isFollowSuccess) ||
      (!isUnfollowLoading && isUnfollowSuccess)
    )
      refetch();
  }, [isFollowLoading, isFollowSuccess, isUnfollowLoading, isUnfollowSuccess]);

  const clickLoading = isFollowLoading || isUnfollowLoading;

  return (
    <li className="flex items-center gap-2">
      <Link
        className="flex items-center gap-2"
        href={`profile/${item.user.username}`}
      >
        <Image
          className="rounded-full border-2"
          alt="image"
          src={item.image || "/robo-user.png"}
          width={45}
          height={45}
        />
        <div className="flex flex-col">
          <span className="text-sm">{item.name.slice(0, 12)}</span>
          <span className="text-xs text-gray-500">{item.slange}</span>
        </div>
      </Link>
      <Button
        variant={"secondary"}
        className="ml-auto w-20"
        onClick={() => {
          item.user.followers.includes(session?.user._id as string)
            ? handleUnfollow(item.user._id as string)
            : handleFollow(item.user._id as string);
        }}
      >
        {clickLoading ? (
          <SmallLoading />
        ) : item.user.followers.includes(session?.user._id as string) ? (
          "Unfollow"
        ) : (
          "Follow"
        )}
      </Button>
    </li>
  );
};

export default ListItem;
