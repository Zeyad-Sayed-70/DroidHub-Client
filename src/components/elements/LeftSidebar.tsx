import Link from "next/link";
import React from "react";
import UserInfoCard from "./UserInfoCard/UserInfoCard";
import { sidebar_list } from "@/constants/sidebar_list";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginCard from "./LoginCard";

const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <section>
      {session ? <UserInfoCard /> : <LoginCard />}
      <ul className="mt-4 my-2">
        {sidebar_list.map((item, ind) => (
          <li
            key={ind}
            className={`${
              item.requireAuth && !session && "pointer-events-none select-none"
            } `}
          >
            <Link
              className={`flex items-center gap-2 py-2 px-4 rounded-md text-slate-500 hover:bg-input transition ${
                item.requireAuth && !session && "text-gray-400"
              }`}
              href={`${item.link}`}
            >
              <span>{item.icon}</span> <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
