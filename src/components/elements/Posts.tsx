"use client";
import { useGetPostsQuery } from "@/lib/features/posts/postsApiSlice";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Post from "./Post";
import Loader from "../ui/loader";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { PostType } from "@/types/post.type";
import { UserType } from "@/types/user.type";

const Posts = () => {
  const limit = 8;
  const [skip, setSkip] = useState(0);
  const [fisrtTime, setFirstTime] = useState(true);
  const { data, isLoading, isFetching, isError, isSuccess, refetch } =
    useGetPostsQuery({ limit, skip });
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<{ [key: string]: UserType }>();
  const targetRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(
    targetRef.current as HTMLDivElement
  );

  useEffect(() => {
    if (isIntersecting) {
      if (!fisrtTime) setSkip(skip + limit);
      else setFirstTime(false);
    }
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting) {
      refetch();
    }
  }, [skip]);

  useEffect(() => {
    if (data && data.posts.length > 0) {
      setPosts([...posts, ...data.posts]);
      setUsers({ ...users, ...data.users });
    }
  }, [data]);

  const _posts = useMemo(() => {
    if (!users) return <></>;
    return posts.map((post) => (
      <Post key={post._id} post={post} user={users[post.creatorId]} />
    ));
  }, [posts, users]);

  return (
    <section className="flex items-center flex-col gap-6 pb-12 relative">
      {isLoading && <Loader />}
      {isSuccess && _posts}

      <div ref={targetRef} className="absolute bottom-52 -z-10"></div>
    </section>
  );
};

export default Posts;
