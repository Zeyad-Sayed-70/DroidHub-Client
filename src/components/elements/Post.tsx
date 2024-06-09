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

const Post = memo(({ post, user }: { post: PostType; user: UserType }) => {
  const [showMore, setShowMore] = React.useState(false);
  return (
    <main className="max-w-[600px] w-full bg-gray-100 p-4 rounded-md shadow-sm">
      <Header post={post} user={user} />
      <p className="p-4 text-sm leading-6 text-gray-800 whitespace-pre-line">
        {post.content && post.content.length > 100 ? (
          <>
            {showMore ? post.content : `${post.content.slice(0, 100)}...`}
            <span
              className="text-sm text-blue-700 cursor-pointer hover:underline ml-2"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Show More"}
            </span>
          </>
        ) : (
          post.content
        )}
      </p>
      {/* Image Serction */}
      {post.images && post.images.length > 0 && (
        <section>
          <Image
            alt="image"
            src={post.images?.[0] || ""}
            width={400}
            height={300}
            className="w-full h-[400px] object-contain bg-slate-200 rounded-md shadow-sm"
          />
        </section>
      )}
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

export default Post;
