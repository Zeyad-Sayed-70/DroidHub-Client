import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

const InputComment = ({
  handleSendComment,
}: {
  handleSendComment: (
    e: React.FormEvent<HTMLFormElement>,
    comment: string,
    setComment: (value: string) => void
  ) => void;
}) => {
  const [comment, setComment] = useState<string>("");

  return (
    <form
      className="mt-4 flex items-center"
      onSubmit={(e) => handleSendComment(e, comment, setComment)}
    >
      <Input
        type="text"
        placeholder="Add a comment..."
        className="bg-background rounded-r-none"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button type="submit" className="rounded-l-none text-lg">
        <AiOutlineSend />
      </Button>
    </form>
  );
};

export default InputComment;
