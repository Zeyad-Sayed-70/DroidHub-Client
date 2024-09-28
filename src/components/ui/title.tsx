import React from "react";

const Title = ({
  title,
  size = "text-2xl",
}: {
  title: string;
  size?: string;
}) => {
  return <h1 className={`${size} font-bold text-gray-700`}>{title}</h1>;
};

export default Title;
