import React from "react";
import {
  DropdownMenu as DropdownMenuUi,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useUpdatePostMutation } from "@/lib/features/posts/postsApiSlice";

const DropdownMenu = () => {
  return (
    <DropdownMenuUi>
      <DropdownMenuTrigger className="outline-none hover:bg-slate-200 p-2 rounded-md transition">
        <BsThreeDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Follow</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
        <DropdownMenuItem>Bookmark</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuUi>
  );
};

export default DropdownMenu;
