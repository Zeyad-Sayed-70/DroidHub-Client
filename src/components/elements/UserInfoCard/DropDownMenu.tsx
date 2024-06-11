"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { signOut } from "next-auth/react";

const DropDownMenu = () => {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none hover:bg-slate-200 p-2 rounded-md transition">
        <BsThreeDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href="profile">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link href="settings">
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;
