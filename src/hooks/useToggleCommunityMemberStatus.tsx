import { useToggleMemberMutation } from "@/lib/features/communities/communitiesApiSlice";
import { CommunityType } from "@/types/community";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const useToggleCommunityMemberStatus = ({
  community,
}: {
  community: CommunityType | undefined;
}) => {
  const { data: session } = useSession();
  const [toggleMember, { isLoading, data, isSuccess }] =
    useToggleMemberMutation();
  const [isJoined, setIsJoined] = useState(false);
  const userId = session?.user?._id;

  // Check if the user has joined the community
  useEffect(() => {
    if (community?.members && userId) {
      setIsJoined(community.members.includes(userId));
    }
  }, [community?.members, userId]);

  // Update user status when data changes
  useEffect(() => {
    if (data && !isLoading && isSuccess) {
      if (data.members && userId) {
        setIsJoined(data.members.includes(userId));
      }
    }
  }, [data, isLoading, isSuccess, userId]);

  const handleToggleMember = useCallback(async () => {
    if (!community?._id || !userId) return;

    await toggleMember({
      communityId: community._id,
      action: isJoined ? "leave" : "join",
      memberId: userId,
    }).unwrap();
  }, [community?._id, isJoined, userId, toggleMember]);

  return { handleToggleMember, isJoined, isLoading };
};

export default useToggleCommunityMemberStatus;
