import { Button } from "@/components/ui/button";
import { AiFillLike } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";

const Reactions = () => {
  return (
    <section className="flex items-center>">
      <Button className="rounded-none flex-1 bg-accent text-primary hover:bg-input">
        <AiFillLike /> <span className="ml-1">Like</span>
      </Button>
      <Button className="rounded-none flex-1 bg-accent text-primary hover:bg-input">
        <BiSolidCommentDetail /> <span className="ml-1">Comment</span>
      </Button>
    </section>
  );
};

export default Reactions;
