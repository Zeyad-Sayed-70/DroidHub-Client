"use client";
import { useGetPostsQuery } from "@/lib/features/posts/postsApiSlice";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Post from "./Post/Post";
import Loader from "../ui/loader";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { PostType } from "@/types/post.type";
import { UserType } from "@/types/user.type";

const Posts = () => {
  const limit = 8;
  const [skip, setSkip] = useState(0);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const { data, isLoading, isFetching, isError, isSuccess, refetch } =
    useGetPostsQuery({ limit, skip });
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<{ [key: string]: UserType }>({});
  const targetRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(
    targetRef.current as HTMLDivElement
  );

  useEffect(() => {
    if (isIntersecting) {
      isFirstTime
        ? setSkip((prevSkip) => prevSkip)
        : setSkip((prevSkip) => prevSkip + limit);
      setIsFirstTime(false);
    }
  }, [isIntersecting]);

  useEffect(() => {
    if (skip > 0) {
      refetch();
    }
  }, [skip]);

  useEffect(() => {
    if (data && data.posts.length > 0) {
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);

      const newUsers = data.users;
      const hasNewUsers = Object.keys(newUsers).some(
        (key) => !users.hasOwnProperty(key)
      );

      if (hasNewUsers) {
        setUsers((prevUsers) => ({ ...prevUsers, ...newUsers }));
      }
    }
  }, [data]);

  const renderPost = useCallback(
    (post: PostType) => (
      <Post key={post._id} post={post} user={users[post.creatorId]} />
    ),
    [users]
  );

  const _posts = useMemo(() => {
    if (!users) return null;
    return posts.map((post) => renderPost(post));
  }, [posts, users]);

  return (
    <section className="flex items-center flex-col gap-6 pb-12 relative">
      {isLoading && <Loader />}
      {isSuccess && _posts}
      {posts.length === 0 && !isLoading && (
        <div className="text-center text-xl font-semibold text-secondary-foreground">
          No posts found
        </div>
      )}
      <div ref={targetRef} className="absolute bottom-80 -z-10"></div>
    </section>
  );
};

export default Posts;
