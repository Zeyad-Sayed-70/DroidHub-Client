import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PostType } from "@/types/post.type";
import { Button } from "@/components/ui/button";
import { useDeletePostMutation } from "@/lib/features/posts/postsApiSlice";

const DeleteDialog = ({
  open,
  post,
  setOpen,
  setPost,
}: {
  post: PostType;
  open: boolean;
  setOpen: (open: boolean) => void;
  setPost: (value: PostType | null) => void;
}) => {
  const [deletePost, {}] = useDeletePostMutation();

  const handleDeletePost = () => {
    if (!post._id) return;

    deletePost(post._id);
    setPost(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure nigga?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your post
            and remove your post data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"ghost"} onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button variant={"destructive"} onClick={handleDeletePost}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
