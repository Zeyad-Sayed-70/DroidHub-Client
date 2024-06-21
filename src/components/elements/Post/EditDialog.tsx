import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdatePostMutation } from "@/lib/features/posts/postsApiSlice";
import { PostType } from "@/types/post.type";

const EditDialog = ({
  open,
  post,
  setOpen,
  setPost,
}: {
  post: PostType;
  open: boolean;
  setOpen: (open: boolean) => void;
  setPost: (value: PostType) => void;
}) => {
  const [contentTerm, setContentTerm] = useState<string>("");
  const [updatePost, {}] = useUpdatePostMutation();

  const handleEditPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contentTerm || !post._id) return;
    updatePost({ newPost: { content: contentTerm }, postId: post._id });
    const updatedPost = { ...post, content: contentTerm };
    setPost(updatedPost);
    setOpen(false);
  };

  useEffect(() => {
    if (post.content) setContentTerm(post.content);
  }, [post.content]);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <form className="mt-4 flex items-center" onSubmit={handleEditPost}>
          <Input
            type="text"
            placeholder="Add a comment..."
            className="bg-background rounded-r-none"
            value={contentTerm}
            onChange={(e) => setContentTerm(e.target.value)}
          />
          <Button type="submit" className="rounded-l-none text-md">
            Edit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
