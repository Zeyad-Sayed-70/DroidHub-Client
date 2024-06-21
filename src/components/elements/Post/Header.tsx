import Image from "next/image";
import Link from "next/link";
import { memo, useState, useCallback } from "react";
import { PostType } from "@/types/post.type";
import { UserType } from "@/types/user.type";
import DropdownMenu from "./DropdownMenu";
import { getRelativeTime } from "@/utils/getRelativeTime";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

interface HeaderProps {
  post: PostType;
  user: UserType;
  setPost: (value: PostType | null) => void;
}

const Header: React.FC<HeaderProps> = ({ post, user, setPost }) => {
  const [showEditDialog, setEditDialog] = useState(false);
  const [showDeleteDialog, setDeleteDialog] = useState(false);

  const date = getRelativeTime(post.createdAt.toString());

  const handleEditDialogToggle = useCallback(() => {
    setEditDialog((prev) => !prev);
  }, []);

  const handleDeleteDialogToggle = useCallback(() => {
    setDeleteDialog((prev) => !prev);
  }, []);

  return (
    <header className="flex items-center justify-between">
      <UserProfile user={user} date={date} />
      <Actions
        post={post}
        setPost={setPost}
        showEditDialog={showEditDialog}
        setEditDialog={handleEditDialogToggle}
        showDeleteDialog={showDeleteDialog}
        setDeleteDialog={handleDeleteDialogToggle}
      />
    </header>
  );
};

interface UserProfileProps {
  user: UserType;
  date: string;
}

const UserProfile: React.FC<UserProfileProps> = memo(({ user, date }) => (
  <div className="flex items-center gap-3">
    <Link href={`/profile/${user?.username}`}>
      <Image
        alt="avatar"
        src={user?.avatar || "/robo-user.png"}
        width={50}
        height={50}
        className="rounded-full object-cover border-2"
      />
    </Link>
    <div>
      <div className="flex items-center gap-2">
        <Link href={`/profile/${user?.username}`}>
          <h2 className="text-md">{user?.username || "Undefined"}</h2>
        </Link>
        <span>.</span>
        <span className="text-gray-500 text-xs">
          {date === "now" ? date : `${date} ago`}
        </span>
      </div>
      <span className="text-gray-500 text-sm">{user?.role}</span>
    </div>
  </div>
));

interface ActionsProps {
  post: PostType;
  setPost: (value: PostType | null) => void;
  showEditDialog: boolean;
  setEditDialog: () => void;
  showDeleteDialog: boolean;
  setDeleteDialog: () => void;
}

const Actions: React.FC<ActionsProps> = memo(
  ({
    post,
    setPost,
    showEditDialog,
    setEditDialog,
    showDeleteDialog,
    setDeleteDialog,
  }) => (
    <div>
      <DropdownMenu
        setEditDialog={setEditDialog}
        setDeleteDialog={setDeleteDialog}
      />
      <EditDialog
        post={post}
        open={showEditDialog}
        setOpen={setEditDialog}
        setPost={setPost}
      />
      <DeleteDialog
        post={post}
        open={showDeleteDialog}
        setOpen={setDeleteDialog}
        setPost={setPost}
      />
    </div>
  )
);

export default memo(Header);
