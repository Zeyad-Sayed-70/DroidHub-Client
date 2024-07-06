"use client";
import React, { useMemo } from "react";
import Card from "./Card";
import { useGetCommunitiesQuery } from "@/lib/features/communities/communitiesApiSlice";
import LoadingCard from "./LoadingCard";

const Cards = () => {
  const { data, isLoading } = useGetCommunitiesQuery({
    limit: 10,
    offset: 0,
  });

  const cards = useMemo(
    () =>
      data?.map((community, ind) => <Card key={ind} community={community} />),

    [data]
  );

  return (
    <section className="flex flex-wrap gap-4 justify-center lg:justify-start">
      {isLoading && (
        <>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </>
      )}
      {cards}
    </section>
  );
};

export default Cards;
