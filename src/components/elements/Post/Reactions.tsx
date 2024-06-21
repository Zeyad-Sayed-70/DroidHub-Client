import { Button } from "@/components/ui/button";
import { useToggleReactionMutation } from "@/lib/features/posts/postsApiSlice";
import { PostType } from "@/types/post.type";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SmallLoading from "@/components/ui/smallLoading";

const Reactions = ({
  post,
  commentsShow,
  setCommentsShow,
}: {
  post: PostType;
  commentsShow: boolean;
  setCommentsShow: (value: boolean) => void;
}) => {
  const session = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [toggleReaction, { data, isLoading, isSuccess, isError }] =
    useToggleReactionMutation();

  const handleToggleReaction = async () => {
    const userId = session.data?.user._id;
    if (!post._id || !userId) return;

    try {
      console.log("Toggling reaction...");
      await toggleReaction({ postId: post._id, userId });
    } catch (error) {
      console.error("Failed to toggle reaction:", error);
    }
  };

  useEffect(() => {
    const currLikeStatus = post.reactions.like.some(
      (userId: string) => userId === session.data?.user._id
    );
    setIsLiked(currLikeStatus);
  }, [post]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      const newLikeStatus = data?.post.reactions.like.some(
        (userId: string) => userId === session.data?.user._id
      );
      setIsLiked(newLikeStatus);
    }
  }, [isLoading, isSuccess, data?.post]);

  const likesCount =
    data?.post.reactions.like.length || post.reactions.like.length;

  return (
    <section className="flex items-center>">
      <Button
        onClick={handleToggleReaction}
        className={`${
          isLiked ? "text-primary" : "text-slate-500"
        } rounded-none flex-1 bg-accent hover:bg-input`}
      >
        {isLoading ? <SmallLoading /> : <AiFillLike />}
        <span className="ml-1">
          {isLiked ? "Liked" : "Like"} {likesCount}
        </span>
      </Button>
      <Button
        onClick={() => setCommentsShow(!commentsShow)}
        className={`${
          commentsShow ? "text-primary" : "text-slate-500"
        } rounded-none flex-1 bg-accent  hover:bg-input`}
      >
        <BiSolidCommentDetail />{" "}
        <span className="ml-1">Comment {post.comments.length}</span>
      </Button>
    </section>
  );
};

export default Reactions;
