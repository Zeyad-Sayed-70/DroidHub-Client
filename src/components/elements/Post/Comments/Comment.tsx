import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { memo } from "react";
import DropdownMenu from "./DropdownMenu";

const Comment = memo(
  ({
    userData,
    comment,
    date,
    setCommentsD,
  }: {
    userData: any;
    comment: any;
    date: any;
    setCommentsD: (value: any) => void;
  }) => {
    // console.log("comment")
    return (
      <li>
        <header className="flex items-center gap-1">
          <Image
            alt="avatar"
            src={"/robo-user.png"}
            width={30}
            height={30}
            className="border-2 rounded-full"
          />
          <span className="text-sm text-slate-500">
            {userData?.username || userData?.name}
          </span>
          {date && (
            <span className="text-xs text-slate-500">
              . {date === "now" ? date : date + " ago"}
            </span>
          )}
          {comment.isEdited && (
            <span className="text-xs text-slate-500">. Edited</span>
          )}
          <div className="ml-auto">
            <DropdownMenu comment={comment} setCommentsD={setCommentsD} />
          </div>
        </header>
        <p className="text-md text-slate-700 mt-2">{comment.comment}</p>
      </li>
    );
  }
);

export default Comment;
