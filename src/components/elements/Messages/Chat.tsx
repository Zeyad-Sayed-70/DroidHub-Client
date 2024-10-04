import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SmallLoading from "@/components/ui/smallLoading";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/lib/features/messages/messagesApiSlice";
import { MessageType } from "@/types/message";
import React, { useCallback, useEffect } from "react";
import { BiSend } from "react-icons/bi";
import LoadingCard from "../community/LoadingCard";
import { getSocket } from "@/lib/socket";
import { UserType } from "@/types/user.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { renderImg } from "@/utils/renderImg";
import { getRelativeTime } from "@/utils/getRelativeTime";
import { useSession } from "next-auth/react";

const Chat = ({
  activeChat,
  selectedUser,
}: {
  activeChat: string | null;
  selectedUser: UserType;
}) => {
  return (
    <section className="flex flex-col w-full bg-white p-4 rounded-md">
      <div>
        <h3 className="text-xl">Chat</h3>
      </div>

      {activeChat ? (
        <ChatBody activeChat={activeChat} selectedUser={selectedUser} />
      ) : (
        <p className="flex justify-center items-center h-full text-md text-gray-500">
          No chat selected
        </p>
      )}
    </section>
  );
};

const ChatBody = ({
  activeChat,
  selectedUser,
}: {
  activeChat: string;
  selectedUser: UserType;
}) => {
  const socket = getSocket();
  const { data, isLoading, refetch } = useGetMessagesQuery({
    chatId: activeChat,
  });
  const [sendMessage, { data: sentMessage, isLoading: isSendMsgLoading }] =
    useSendMessageMutation();
  const [message, setMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<MessageType[]>([]);

  const handleSendMessage = useCallback(
    (e: React.FormEvent<HTMLFormElement>, message: string) => {
      e.preventDefault();
      if (!activeChat || !message) return;
      sendMessage({ chatId: activeChat, message });
      setMessage("");
    },
    [activeChat, sendMessage]
  );

  useEffect(() => {
    if (!activeChat) return;
    refetch();
  }, [activeChat, refetch]);

  useEffect(() => {
    if (!data) return;
    setMessages(data);
  }, [data]);

  useEffect(() => {
    if (!sentMessage) return;
    setMessages([...messages, sentMessage]);
  }, [sentMessage]);

  useEffect(() => {
    if (!socket && !activeChat) return;

    // Initialize the socket connection
    socket.emit("joinRoom", activeChat);

    // Clean up the socket connection
    return () => {
      socket.emit("leaveRoom", activeChat);
    };
  }, [socket, activeChat]);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (data: MessageType) => {
      console.log("message", data);
    });
  }, [socket]);

  if (isLoading) return <LoadingCard />;
  // console.log(messages);
  return (
    <>
      <div className="my-4 overflow-auto flex flex-col gap-4 flex-1">
        {messages.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            Start send first message 💬
          </p>
        )}
        {messages?.map((message: MessageType, ind) => (
          <Message
            key={message._id}
            message={message}
            selectedUser={selectedUser}
          />
        ))}
      </div>

      <div>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => handleSendMessage(e, message)}
        >
          <Input
            type="text"
            name="message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button size={"icon"}>
            {isSendMsgLoading ? <SmallLoading /> : <BiSend size={24} />}
          </Button>
        </form>
      </div>
    </>
  );
};

const Message = ({
  message,
  selectedUser,
}: {
  message: MessageType;
  selectedUser: UserType;
}) => {
  const { data: session } = useSession();
  if (!session?.user) return null;
  const isSender = message.creatorId === session.user._id;
  const currentUser = isSender ? session.user : selectedUser;
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[400px] min-w-[200px] p-4 bg-primary/20 rounded-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={renderImg(currentUser.avatar as string)} />
              <AvatarFallback>{currentUser.username}</AvatarFallback>
            </Avatar>
            <h3 className="text-sm">{currentUser.username}</h3>
          </div>
          <p className="text-xs text-slate-500">
            {getRelativeTime(message.timestamp.toString())}
          </p>
        </div>
        <p className="text-sm text-slate-700 mt-2">{message.message}</p>
      </div>
    </div>
  );
};

export default Chat;
