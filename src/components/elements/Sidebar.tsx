import Link from "next/link";
import React from "react";
import UserInfoCard from "./UserInfoCard";
import { sidebar_list } from "@/constants/sidebar_list";

const Sidebar = () => {
  return (
    <section>
      <UserInfoCard />
      <ul className="mt-4 my-2">
        {sidebar_list.map((item, ind) => (
          <li key={ind}>
            <Link
              className="flex items-center gap-2 py-2 px-4 rounded-md text-slate-500 hover:bg-slate-100 transition"
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
