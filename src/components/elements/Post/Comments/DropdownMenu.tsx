import React from "react";
import {
  DropdownMenu as DropdownMenuUi,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useDeleteCommentMutation } from "@/lib/features/posts/postsApiSlice";
import EditCommentDialog from "./EditCommentDialog";

const DropdownMenu = ({
  comment,
  setCommentsD,
}: {
  comment: any;
  setCommentsD: (value: any) => void;
}) => {
  const [deleteComment, {}] = useDeleteCommentMutation();
  const { data: session } = useSession();
  const isMe = session?.user._id === comment?.userId;

  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const handleDelete = () => {
    deleteComment({ commentId: comment?._id });
    setCommentsD((prevComments: any[]) =>
      prevComments.filter((c) => c._id !== comment?._id)
    );
  };

  return (
    <>
      <DropdownMenuUi>
        <DropdownMenuTrigger className="outline-none hover:bg-slate-200 p-2 rounded-md transition">
          <BsThreeDotsVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {isMe && (
            <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
              Edit
            </DropdownMenuItem>
          )}
          {isMe && (
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive hover:!text-destructive"
            >
              Delete
            </DropdownMenuItem>
          )}
          {!isMe && <DropdownMenuItem>Report</DropdownMenuItem>}
        </DropdownMenuContent>
      </DropdownMenuUi>
      <EditCommentDialog
        comment={comment}
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        setCommentsD={setCommentsD}
      />
    </>
  );
};

export default DropdownMenu;
