"use client";
import React, { useMemo, useState } from "react";
import { useGetUsersQuery } from "@/lib/features/users/usersSlice";
import { useSession } from "next-auth/react";
import useDebounce from "@/hooks/useDebounce";
import ListItem from "./RobotsList";
import { UserType } from "@/types/user.type";
import ListItemSkeleton from "./ListItemSkeleton";

export interface ListItem {
  name: string;
  image: string;
  slange: string;
  user: UserType;
}

const SuggestionRobots = () => {
  const { data: session } = useSession();

  const queryParams = {
    limit: 4,
    robotsOnly: true,
    filters: { followers: { $nin: [session?.user._id] } },
  };

  const debouncedQueryParams = useDebounce(queryParams, 500); // 500ms debounce delay

  const { data, isLoading, refetch } = useGetUsersQuery(debouncedQueryParams);

  const lisItems = useMemo(
    () =>
      data
        ? data.map((user) => ({
            name: user.username,
            image: user.avatar as string,
            slange: user.role,
            user: user,
          }))
        : [],
    [data]
  );

  return (
    <section className="p-4 rounded-md bg-background shadow-md">
      <h1 className="font-bold text-md">You might like</h1>
      <ul className="flex flex-col gap-3 my-3">
        {isLoading && (
          <>
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
          </>
        )}
        {!isLoading && lisItems.length === 0 && (
          <h4>No recommend robots found.</h4>
        )}
        {lisItems?.map((item, ind) => (
          <ListItem key={ind} item={item} refetch={refetch} />
        ))}
      </ul>
    </section>
  );
};

export default SuggestionRobots;
