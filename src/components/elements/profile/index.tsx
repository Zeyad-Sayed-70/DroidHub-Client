"use client";
import React, { useEffect } from "react";
// import Posts from "./Posts";
import ProfileHead from "./ProfileHead";
import { useGetUserMutation } from "@/lib/features/users/usersSlice";
import { UserType } from "@/types/user.type";
import Loader from "@/components/ui/loader";
import Posts from "./Posts";

const ProfilePage = ({ profile_id }: { profile_id: string }) => {
  const [getUser, { data: profile, isLoading, isError }] = useGetUserMutation();

  useEffect(() => {
    if (!profile_id) return;

    (async function () {
      await getUser(profile_id);
    })();
  }, [profile_id]);

  if (isError) return <>{new Error("The Profile Page is not found")}</>;
  if (!profile || isLoading) return <Loader />;

  return (
    <article>
      <ProfileHead
        profile={profile as UserType}
        isLoading={isLoading}
        refetch={getUser}
      />
      <Posts profile={profile as UserType} />
    </article>
  );
};

export default ProfilePage;
