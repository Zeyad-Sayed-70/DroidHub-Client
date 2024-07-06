import React from "react";

const Paragraph = ({ content }: { content: string }) => {
  return <p className="text-gray-500 text-md font-semibold">{content}</p>;
};

export default Paragraph;
