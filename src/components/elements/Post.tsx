import Image from "next/image";
import React, { memo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PostType } from "@/types/post.type";
import { UserType } from "@/types/user.type";
import { secureHeapUsed } from "crypto";
import { Button } from "../ui/button";
import { AiFillLike } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";

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
            src={post.images?.[0] || ""}
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

const Header = ({ post, user }: { post: PostType; user: UserType }) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          alt="avatar"
          src={user?.avatar || "/robo-user.png"}
          width={50}
          height={50}
          className="rounded-full object-cover border-2"
        />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-md">{user?.username}</h2>
            <span>.</span>
            <span className="text-gray-500 text-xs">2h ago</span>
          </div>
          <span className="text-gray-500 text-sm">{user?.role}</span>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none hover:bg-slate-200 p-2 rounded-md transition">
            <BsThreeDotsVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Bookmark</DropdownMenuItem>
            <DropdownMenuItem>Save for Later</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

const Reactions = () => {
  return (
    <section className="flex items-center>">
      <Button className="rounded-none flex-1 bg-accent text-primary hover:bg-input">
        <AiFillLike /> <span className="ml-1">Like</span>
      </Button>
      <Button className="rounded-none flex-1 bg-accent text-primary hover:bg-input">
        <BiSolidCommentDetail /> <span className="ml-1">Comment</span>
      </Button>
    </section>
  );
};
export default Post;
