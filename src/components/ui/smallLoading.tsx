import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SmallLoading = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <AiOutlineLoading3Quarters className={`animate-spin ${className} mr-1`} />
  );
};

export default SmallLoading;
