import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SmallLoading from "@/components/ui/smallLoading";
import { useGetUsersByIdMutation } from "@/lib/features/users/usersSlice";
import { UserType } from "@/types/user.type";
import { renderImg } from "@/utils/renderImg";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const UsersList = ({
  activeChat,
  setActiveChat,
  setSelectedUser,
}: {
  activeChat: string | null;
  setActiveChat: (ind: string) => void;
  setSelectedUser: (val: UserType) => void;
}) => {
  const { data: session } = useSession();
  const [getUsersByFollowingsIds, { data: users, isLoading }] =
    useGetUsersByIdMutation();

  useEffect(() => {
    if (!session?.user?.following) return;

    getUsersByFollowingsIds({
      usersIds: session?.user?.following,
      withUsersInChats: true,
    });
  }, [session]);

  useEffect(() => {
    if (!activeChat || !users) return;
    setSelectedUser(
      users.find((user) => user._id == activeChat.split(",")[1]) as UserType
    );
  }, [activeChat, users, setSelectedUser]);

  if (isLoading) return <SmallLoading />;

  if (users?.length === 0)
    return <p className="text-center my-6 text-gray-500">No users found</p>;

  return (
    <div className="mt-4">
      <ul className="flex flex-col gap-2">
        {users?.map((user, ind) => (
          <li
            key={user._id}
            onClick={() =>
              setActiveChat(`${session?.user._id},${user._id as string}`)
            }
          >
            <User user={user} active={activeChat?.split(",")[1] == user._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const User = ({ user, active }: { user: UserType; active: boolean }) => {
  return (
    <div
      className={`flex items-center justify-between hover:bg-gray-50 p-4 rounded-r-md border-l-2 ${
        active ? "border-l-primary" : ""
      } cursor-pointer`}
    >
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={renderImg(user.avatar)} />
          <AvatarFallback>{user.username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-md">{user.username}</h3>
          {/* <p className="text-sm text-slate-500">{user.message}</p> */}
        </div>
      </div>

      <div>
        <Button size={"icon"} variant="ghost" className="text-gray-500">
          <DotsVerticalIcon />
        </Button>
      </div>
    </div>
  );
};

export default UsersList;
