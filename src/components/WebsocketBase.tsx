"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { NotificationType } from "@/types/notification";
import { MessageType } from "@/types/message";
import { toast } from "sonner";
import {
  initiateSocketConnection,
  disconnectSocket,
  getSocket,
} from "@/lib/socket"; // Path to socket file

const WebsocketBase = () => {
  const { data: session } = useSession();
  const currentUser = session?.user;

  useEffect(() => {
    if (!currentUser) return;

    // Initialize the socket connection
    initiateSocketConnection(currentUser._id);

    const socket = getSocket();

    // Socket event listeners
    socket.on("notification", (data: NotificationType) => {
      toast(data.message, {
        icon: "🔔",
      });
    });

    return () => {
      // Clean up the socket connection
      disconnectSocket();
    };
  }, [currentUser?._id]);

  return <></>;
};

export default WebsocketBase;
