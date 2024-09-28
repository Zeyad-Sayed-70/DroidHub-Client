"use client";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import {
  useGetPostsByTagsQuery,
  useGetPostsByUserQuery,
} from "@/lib/features/posts/postsApiSlice";
import { CommunityType } from "@/types/community";
import { UserType } from "@/types/user.type";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PostSkeleton from "../Post/PostSkeleton";
import { PostType } from "@/types/post.type";
import Post from "../Post/Post";

const Posts = ({
  profile,
}: {
  profile: UserType;
  isLoading?: boolean;
  refetch?: () => void;
}) => {
  const limit = 2;
  const [skip, setSkip] = useState(0);

  const { data, refetch, isLoading, isSuccess } = useGetPostsByUserQuery({
    userId: profile?._id || "",
    skip,
    limit,
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
    if (!posts?.length) {
      return (
        <div className="text-center text-xl font-semibold text-secondary-foreground">
          No posts found
        </div>
      );
    }
    return posts.map(renderPost);
  }, [posts, renderPost]);

  return (
    <section className="flex items-center flex-col gap-6 pb-12 relative my-8">
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
