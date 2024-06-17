import React from "react";
import InputComment from "./InputComment";

const SheetContent = ({
  comments,
  handleSendComment,
}: {
  comments: any;
  handleSendComment: (
    e: React.FormEvent<HTMLFormElement>,
    comment: string,
    setComment: (value: string) => void
  ) => void;
}) => {
  const commentsRef = React.useRef<HTMLUListElement>(null);
  React.useEffect(() => {
    if (!commentsRef.current) return;
    // Scroll down in comments
    commentsRef.current?.scrollBy({ behavior: "smooth", top: 999999 });
  }, [comments]);

  return (
    <div className="flex flex-col justify-between max-h-[97%] min-h-[97%]">
      <ul
        ref={commentsRef}
        className="mt-4 flex flex-col justify-between gap-4 overflow-auto"
      >
        {comments}
      </ul>
      <InputComment handleSendComment={handleSendComment} />
    </div>
  );
};

export default SheetContent;
