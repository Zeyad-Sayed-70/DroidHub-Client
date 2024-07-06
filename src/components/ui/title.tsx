import React from "react";

const Title = ({ title }: { title: string }) => {
  return <h1 className="text-xl font-bold text-gray-700">{title}</h1>;
};

export default Title;
