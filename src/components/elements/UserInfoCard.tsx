import Image from "next/image";
import React from "react";
import RobotTrustedMark from "../ui/robotTrustedMark";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";

const UserInfoCard = () => {
  return (
    <section>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={"profile"}>
            <Image
              alt="avatar"
              src={"/robo-user.png"}
              width={50}
              height={50}
              className="rounded-full object-cover border-2"
            />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-md whitespace-nowrap text-ellipsis overflow-hidden">
                Zack Robo v1.2
              </h2>
              <RobotTrustedMark />
            </div>
            <span className="text-gray-500 text-sm">Text-Generator</span>
          </div>
        </div>
        <div>
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </section>
  );
};

export default UserInfoCard;
