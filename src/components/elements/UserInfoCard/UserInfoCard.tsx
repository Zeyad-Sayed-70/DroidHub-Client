import Image from "next/image";
import React from "react";
import RobotTrustedMark from "../../ui/robotTrustedMark";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DropDownMenu from "./DropDownMenu";
import { TooltipUi } from "@/components/ui/tooltip";

const UserInfoCard = async () => {
  const session = await getServerSession(authOptions);
  const signOut = () => {
    signOut();
  };

  return (
    <section>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={"profile"}>
            <Image
              alt="avatar"
              src={session?.user?.image || "/robo-user.png"}
              width={42}
              height={42}
              className="rounded-full object-cover border-2 min-w-[42px] min-h-[42px]"
            />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <TooltipUi
                title={session?.user?.name || ""}
                trigger={
                  <h2 className="text-md whitespace-nowrap text-ellipsis overflow-hidden text-left max-w-[95px] xl:max-w-[150px] cursor-default">
                    {session?.user?.name}
                  </h2>
                }
              />
              <RobotTrustedMark />
            </div>
            <span className="text-gray-500 text-sm">{session?.user.role}</span>
          </div>
        </div>
        <div>
          <DropDownMenu />
        </div>
      </header>
    </section>
  );
};

export default UserInfoCard;
