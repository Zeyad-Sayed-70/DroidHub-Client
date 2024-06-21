"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useGetPostsQuery } from "@/lib/features/posts/postsApiSlice";
import Post from "./Post/Post";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { PostType } from "@/types/post.type";
import { UserType } from "@/types/user.type";
import PostSkeleton from "./Post/PostSkeleton";

const Posts: React.FC = () => {
  const limit = 2;
  const [skip, setSkip] = useState(0);
  const { data, isLoading, isError, isSuccess, refetch } = useGetPostsQuery({
    limit,
    skip,
  });

  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<{ [key: string]: UserType }>({});
  const targetRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(
    targetRef.current as HTMLDivElement
  );

  // Fetch more posts when intersection observer detects entry
  useEffect(() => {
    if (isIntersecting) {
      setSkip((prevSkip) => prevSkip + limit);
    }
  }, [isIntersecting]);

  // Refetch posts when skip changes
  useEffect(() => {
    if (skip > 0) {
      refetch();
    }
  }, [skip, refetch]);

  // Update posts and users when data is fetched
  useEffect(() => {
    if (data) {
      const { posts: newPosts, users: newUsers } = data;

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setUsers((prevUsers) => ({ ...prevUsers, ...newUsers }));
    }
  }, [data]);

  const renderPost = useCallback(
    (post: PostType) => {
      const user = users[post.creatorId];
      return <Post key={post._id} originPost={post} user={user} />;
    },
    [users]
  );

  const postElements = useMemo(() => {
    if (!posts.length) {
      return (
        <div className="text-center text-xl font-semibold text-secondary-foreground">
          No posts found
        </div>
      );
    }
    return posts.map(renderPost);
  }, [posts, renderPost]);

  return (
    <section className="flex items-center flex-col gap-6 pb-12 relative">
      {isLoading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}
      {isSuccess && postElements}
      <div ref={targetRef} className="absolute bottom-80 -z-10"></div>
    </section>
  );
};

export default Posts;
