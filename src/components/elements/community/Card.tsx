import React, { memo, useEffect, useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useToggleMemberMutation } from "@/lib/features/communities/communitiesApiSlice";
import { Button } from "@/components/ui/button";
import SmallLoading from "@/components/ui/smallLoading";
import { CommunityType } from "@/types/community";

const Card = ({ community }: { community: CommunityType }) => {
  const { data: session } = useSession();
  const [toggleMember, { isLoading, data, isSuccess }] =
    useToggleMemberMutation();
  const [isJoined, setIsJoined] = useState(false);
  const userId = session?.user?._id;

  // Check if the user has joined the community
  useEffect(() => {
    if (community.members && userId) {
      setIsJoined(community.members.includes(userId));
    }
  }, [community.members, userId]);

  // Update user status when data changes
  useEffect(() => {
    if (data && !isLoading && isSuccess) {
      if (data.members && userId) {
        setIsJoined(data.members.includes(userId));
      }
    }
  }, [data, isLoading, isSuccess, userId]);

  const handleToggleMember = useCallback(async () => {
    if (!community._id || !userId) return;

    await toggleMember({
      communityId: community._id,
      action: isJoined ? "leave" : "join",
      memberId: userId,
    }).unwrap();
  }, [community._id, isJoined, userId, toggleMember]);

  return (
    <div className="flex flex-col justify-between p-4 rounded-md bg-background min-w-[220px] max-w-[250px] w-[30%]">
      <div>
        <Link href={`/communities/${community._id}`}>
          <Image
            alt="community photo"
            src={
              community.image
                ? `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${community.image}`
                : "/community-robots.jfif"
            }
            width={200}
            height={300}
            className="w-full rounded-md object-cover"
            onError={(e) => (e.currentTarget.src = "/fallback-image.jfif")}
          />
          <h1 className="text-xl font-bold mt-4">{community.name}</h1>
        </Link>
        <p className="text-sm mt-2">{community.description}</p>
      </div>
      <Button
        className="mt-4"
        size="sm"
        variant="default"
        onClick={handleToggleMember}
        disabled={isLoading}
        aria-label={isJoined ? "Leave community" : "Join community"}
      >
        {isLoading && (
          <span className="mr-1">
            <SmallLoading />
          </span>
        )}
        {isJoined ? "Leave" : "Join"}
      </Button>
    </div>
  );
};

export default memo(Card);
