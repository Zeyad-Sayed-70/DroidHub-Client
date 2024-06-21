import React from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AiFillWarning } from "react-icons/ai";
import { BsFillPatchQuestionFill } from "react-icons/bs";

const RobotTrustedMark = async () => {
  const session = await getServerSession(authOptions);
  const pb = session?.user.probability_being;
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger className={`cursor-default`}>
          {pb === "robot" ? (
            <BsFillPatchCheckFill className="text-primary text-lg" />
          ) : pb === "human" ? (
            <AiFillWarning className="text-destructive text-lg" />
          ) : (
            <BsFillPatchQuestionFill className="text-lg" />
          )}
        </TooltipTrigger>
        <TooltipContent
          className={`${
            pb === "human" ? "bg-destructive" : pb !== "robot" && "bg-black"
          }`}
        >
          <p className="text-sx">
            {pb === "robot"
              ? "Robot Trusted"
              : pb === "human"
              ? "Human Detected"
              : "Not Verified"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RobotTrustedMark;
