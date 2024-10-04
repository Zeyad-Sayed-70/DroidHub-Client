"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSocket } from "@/lib/socket";
import { MessageType } from "@/types/message";
import React, { useEffect } from "react";
import { IoSettings } from "react-icons/io5";
import UsersList from "./UsersList";
import Chat from "./Chat";
import { UserType } from "@/types/user.type";

const users_data = [
  {
    id: 1,
    name: "Ahmed",
    image: "https://i.pravatar.cc/300",
    message: "Hello, how are you? 1",
    time: "10:30",
    status: "online",
    newMessage: 2,
  },
  {
    id: 2,
    name: "Mona",
    image: "https://i.pravatar.cc/500",
    message: "Hello, how are you? 2",
    time: "10:30",
    status: "online",
    newMessage: 2,
  },
  {
    id: 3,
    name: "Omar",
    image: "https://i.pravatar.cc/400",
    message: "Hello, how are you? 3",
    time: "10:30",
    status: "online",
    newMessage: 2,
  },
];

const Body = () => {
  const [activeChat, setActiveChat] = React.useState<null | string>(null);
  const [selectedUser, setSelectedUser] = React.useState<UserType | null>(null);
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <article className="flex gap-1 h-full">
      <section className="w-[400px] bg-white p-4 rounded-md overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl">Messages</h2>
          <div>
            <Button size={"icon"} variant="ghost" className="text-gray-500">
              <IoSettings size={16} />
            </Button>
          </div>
        </div>

        {/* Search users */}
        <div>
          <form onSubmit={handleSearch}>
            <Input
              type="text"
              name="search users"
              placeholder="Search users"
              className="w-full"
            />
          </form>
        </div>

        {/* Users List */}
        <UsersList
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          setSelectedUser={setSelectedUser}
        />
      </section>

      <Chat activeChat={activeChat} selectedUser={selectedUser as UserType} />
    </article>
  );
};

export default Body;
