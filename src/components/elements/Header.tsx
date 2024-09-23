import React from "react";

const Header = ({ title }: { title: string }) => {
  return (
    <header className="p-4 px-6 bg-white mb-4 rounded-md">
      <h1 className="text-lg font-bold">{title}</h1>
    </header>
  );
};

export default Header;
