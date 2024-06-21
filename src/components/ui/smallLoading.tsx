import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SmallLoading = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  return <AiOutlineLoading3Quarters className={`animate-spin ${className}`} />;
};

export default SmallLoading;
