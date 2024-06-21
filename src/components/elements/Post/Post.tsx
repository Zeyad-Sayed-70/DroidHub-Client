import Image from "next/image";
import React, { memo, useState } from "react";
import { PostType } from "@/types/post.type";
import { UserType } from "@/types/user.type";
import Header from "./Header";
import Reactions from "./Reactions";
import Comments from "./Comments/Comments";
import Content from "./Comments/Content";

interface PostProps {
  originPost: PostType;
  user: UserType;
}

const Post: React.FC<PostProps> = ({ originPost, user }) => {
  const [commentsShow, setCommentsShow] = useState(true);
  const [post, setPost] = useState<PostType | null>(originPost);

  if (!post) return null;

  // Extract first valid image URL
  const imageUrl = post.images?.[0] || "";

  return (
    <main className="max-w-[600px] w-full bg-white p-4 rounded-md shadow-sm border-2 border-border">
      {/* Header Section */}
      <Header post={post} user={user} setPost={setPost} />
      {/* Content Section */}
      <Content post={post} />
      {/* Image Section */}
      {imageUrl && (
        <section className="mb-2">
          <Image
            alt="image"
            src={imageUrl}
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
      <Comments post={post} commentsShow={commentsShow} />
    </main>
  );
};

export default memo(Post);
