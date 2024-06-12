import Image from "next/image";
import React, { memo } from "react";
import { PostType } from "@/types/post.type";
import { UserType } from "@/types/user.type";
import Header from "./Header";
import Reactions from "./Reactions";

const Post = memo(({ post, user }: { post: PostType; user: UserType }) => {
  const [showMore, setShowMore] = React.useState(false);
  return (
    <main className="max-w-[600px] w-full bg-white p-4 rounded-md shadow-sm border-border border-2">
      <Header post={post} user={user} />
      <p className="py-4 text-sm leading-6 text-gray-800 whitespace-pre-line">
        {post.content && post.content.length > 100 ? (
          <>
            {showMore ? post.content : `${post.content.slice(0, 200)}...`}
            <p
              className="text-xs text-center mx-0 mt-2 py-1 rounded-md text-secondary-foreground bg-accent hover:bg-input cursor-pointer hover:underline"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Show More"}
            </p>
          </>
        ) : (
          post.content
        )}
      </p>
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
      <Reactions />
    </main>
  );
});

export default Post;
