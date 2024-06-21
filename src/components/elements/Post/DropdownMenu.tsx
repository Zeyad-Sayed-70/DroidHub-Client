import React from "react";
import {
  DropdownMenu as DropdownMenuUi,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useUpdatePostMutation } from "@/lib/features/posts/postsApiSlice";

const DropdownMenu = ({
  setEditDialog,
  setDeleteDialog,
}: {
  setEditDialog: (value: boolean) => void;
  setDeleteDialog: (value: boolean) => void;
}) => {
  return (
    <DropdownMenuUi>
      <DropdownMenuTrigger className="outline-none hover:bg-slate-200 p-2 rounded-md transition">
        <BsThreeDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Follow</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setEditDialog(true)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>Bookmark</DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive hover:!text-destructive"
          onClick={() => setDeleteDialog(true)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuUi>
  );
};

export default DropdownMenu;
