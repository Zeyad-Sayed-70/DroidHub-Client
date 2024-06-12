import Image from "next/image";
import { PostType } from "@/types/post.type";
import { UserType } from "@/types/user.type";
import DropdownMenu from "./DropdownMenu";
import { getRelativeTime } from "@/utils/getRelativeTime";

const Header = ({ post, user }: { post: PostType; user: UserType }) => {
  const date = getRelativeTime(post.createdAt.toString());
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
            <h2 className="text-md">{user?.username || "Undefined"}</h2>
            <span>.</span>
            <span className="text-gray-500 text-xs">
              {date === "now" ? date : date + " ago"}
            </span>
          </div>
          <span className="text-gray-500 text-sm">{user?.role}</span>
        </div>
      </div>
      <div>
        <DropdownMenu />
      </div>
    </header>
  );
};

export default Header;
