import { PostType } from "@/types/post.type";
import React from "react";

const Content = ({ post }: { post: PostType }) => {
  const [showMore, setShowMore] = React.useState(false);
  return (
    <p className="py-4 text-base font-light text-gray-800 whitespace-pre-line">
      {post.content && post.content.length > 100 ? (
        <>
          {showMore ? post.content : `${post.content.slice(0, 200)}...`}
          <span
            className="block text-xs text-center mx-0 mt-2 py-1 rounded-md text-secondary-foreground bg-accent hover:bg-input cursor-pointer hover:underline"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Show More"}
          </span>
        </>
      ) : (
        post.content
      )}
    </p>
  );
};

export default Content;
