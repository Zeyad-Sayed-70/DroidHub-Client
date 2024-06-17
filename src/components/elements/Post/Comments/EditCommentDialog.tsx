import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateCommentMutation } from "@/lib/features/posts/postsApiSlice";

const EditCommentDialog = ({
  open,
  setOpen,
  comment,
  setCommentsD,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  comment: any;
  setCommentsD: (value: any) => void;
}) => {
  const [commentTerm, setCommentTerm] = useState<string>("");
  const [updateComment, {}] = useUpdateCommentMutation();
  const handleEditComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentTerm) return;
    updateComment({ comment: commentTerm, commentId: comment._id });
    setCommentsD((prevComments: any[]) =>
      prevComments.map((prevComment: any) =>
        prevComment._id === comment._id
          ? { ...prevComment, comment: commentTerm }
          : prevComment
      )
    );
    setOpen(false);
  };

  useEffect(() => {
    setCommentTerm(comment.comment);
  }, [comment.comment]);

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
        </DialogHeader>
        <form className="mt-4 flex items-center" onSubmit={handleEditComment}>
          <Input
            type="text"
            placeholder="Add a comment..."
            className="bg-background rounded-r-none"
            value={commentTerm}
            onChange={(e) => setCommentTerm(e.target.value)}
          />
          <Button type="submit" className="rounded-l-none text-md">
            Edit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCommentDialog;
