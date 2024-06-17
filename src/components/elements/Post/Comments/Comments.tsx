import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AiOutlineSend } from "react-icons/ai";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AiOutlineMenuFold } from "react-icons/ai";
import { TooltipUi } from "@/components/ui/tooltip";
import { TbRefresh } from "react-icons/tb";
import {
  useCreateCommentMutation,
  useGetPostCommentsMutation,
} from "@/lib/features/posts/postsApiSlice";
import { PostType } from "@/types/post.type";
import { useSession } from "next-auth/react";
import { getRelativeTime, testGetRelativeTime } from "@/utils/getRelativeTime";
import Comment from "./Comment";
import InputComment from "./InputComment";

const SheetCommentsContent = lazy(() => import("./SheetContent"));

const Comments = ({ post }: { post: PostType }) => {
  const { data: session } = useSession();
  const [commentsD, setCommentsD] = useState<any[]>([]);
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const commentsRef = useRef<HTMLDivElement>(null);

  const [getComments, { data: commentsData, isLoading: isGetLoading }] =
    useGetPostCommentsMutation();
  const [createComment, { data: newComment, isLoading: isCreateLoading }] =
    useCreateCommentMutation();

  // Fetch comments on post change
  useEffect(() => {
    if (post._id) {
      getComments({ postId: post._id });
    }
  }, [post, getComments]);

  // Update comments when new data arrives
  useEffect(() => {
    if (commentsData?.comments) {
      setCommentsD(commentsData.comments);
    }
  }, [commentsData]);

  // Add new comment to the list
  useEffect(() => {
    if (post._id && (newComment as any)?._id) {
      setCommentsD((prevComments) => [...prevComments, newComment]);
    }
  }, [newComment]);

  // Handle sending a new comment
  const handleSendComment = useCallback(
    (
      e: React.FormEvent<HTMLFormElement>,
      comment: string,
      setComment: (value: string) => void
    ) => {
      e.preventDefault();
      if (!post._id || !session?.user._id || !comment) return;
      createComment({
        postId: post._id.toString(),
        userId: session.user._id,
        comment: comment,
      });
      setComment("");
    },
    [post, session, createComment]
  );

  // Memoize comments rendering to avoid unnecessary renders
  const comments = useMemo(() => {
    return commentsD.map((comment: any) => {
      const userData = commentsData?.usersHash[comment.userId] || session?.user;
      const date = comment?.createdAt
        ? getRelativeTime(comment.createdAt.toString())
        : "";
      return (
        <Comment
          key={comment._id}
          comment={comment}
          date={date}
          userData={userData}
          setCommentsD={setCommentsD}
        />
      );
    });
  }, [commentsD, commentsData, session]);

  // Scroll down to the latest comment
  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.scrollBy({ behavior: "smooth", top: 999999 });
    }
  }, [comments]);

  return (
    <>
      <section className="p-2 py-3 bg-secondary mt-2 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Comments ({comments.length})</h2>
          <div>
            <TooltipUi
              title="Refresh comments"
              trigger={
                <div
                  className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer rounded-md hover:bg-background transition"
                  onClick={() => {
                    if (post._id) {
                      setCommentsD([]);
                      getComments({ postId: post._id });
                    }
                  }}
                >
                  <TbRefresh />
                </div>
              }
            />
            <TooltipUi
              title="Open Comments In Sidebar"
              trigger={
                <Sheet
                  open={openSheet}
                  onOpenChange={(open) => setOpenSheet(open)}
                >
                  <div
                    className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer rounded-md hover:bg-background transition"
                    onClick={() => setOpenSheet(true)}
                  >
                    <AiOutlineMenuFold className="text-lg" />
                  </div>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Comments ({comments.length})</SheetTitle>
                    </SheetHeader>
                    <Suspense fallback={"loading..."}>
                      <SheetCommentsContent
                        comments={comments}
                        handleSendComment={handleSendComment}
                      />
                    </Suspense>
                  </SheetContent>
                </Sheet>
              }
              delayDuration={300}
            />
          </div>
        </div>
        <div
          ref={commentsRef}
          className="bg-background p-4 rounded-md max-h-[200px] overflow-auto"
        >
          <ul className="flex flex-col gap-4">
            {comments.length === 0 && isGetLoading && "Loading..."}
            {comments.length === 0 &&
              !isGetLoading &&
              !isCreateLoading &&
              "Not found comments"}
            {comments}
            {isCreateLoading && "Loading..."}
          </ul>
        </div>
        <InputComment handleSendComment={handleSendComment} />
      </section>
    </>
  );
};

export default React.memo(Comments);
