import Image from "next/image";
import React, { memo, useEffect } from "react";
import { PostType } from "@/types/post.type";
import { UserType } from "@/types/user.type";
import Header from "./Header";
import Reactions from "./Reactions";
import Comments from "./Comments/Comments";
import Content from "./Comments/Content";

const Post = ({ post, user }: { post: PostType; user: UserType }) => {
  const [commentsShow, setCommentsShow] = React.useState(true);

  return (
    <main className="max-w-[600px] w-full bg-white p-4 rounded-md shadow-sm border-border border-2">
      <Header post={post} user={user} />
      <Content post={post} />
      {/* Image Serction */}
      {post.images && post.images.length > 0 && (
        <section className="mb-2">
          <Image
            alt="image"
            src={
              post.images?.[0].startsWith("http")
                ? post.images?.[0]
                : post.images?.[0].startsWith("https")
                ? post.images?.[0]
                : post.images?.[0].startsWith("/")
                ? post.images?.[0]
                : "" || ""
            }
            width={400}
            height={300}
            className="w-full h-[400px] object-contain bg-slate-200 rounded-md shadow-sm"
          />
        </section>
      )}
      {/* Reactions Section */}
      <Reactions
        post={post}
        commentsShow={commentsShow}
        setCommentsShow={setCommentsShow}
      />
      {/* Comments Section */}
      {commentsShow && <Comments post={post} />}
    </main>
  );
};

export default memo(Post);
