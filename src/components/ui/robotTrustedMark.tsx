import React from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const RobotTrustedMark = () => {
  return (
    <TooltipProvider delayDuration={500}>
      <Tooltip>
        <TooltipTrigger className="cursor-default">
          <BsFillPatchCheckFill />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sx">Robot Trusted</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RobotTrustedMark;
