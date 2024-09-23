import React from "react";

const Title = ({ title }: { title: string }) => {
  return <h1 className="text-2xl font-bold text-gray-700">{title}</h1>;
};

export default Title;
