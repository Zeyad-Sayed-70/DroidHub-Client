"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { NotificationType } from "@/types/notification";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const NotificationBase = () => {
  const { data: sesstion } = useSession();
  const currentUser = sesstion?.user;

  useEffect(() => {
    if (!currentUser) return;
    const socket = io(process.env.NEXT_PUBLIC_BASE_SERVER_URL, {
      query: { userId: currentUser._id },
    }); // Pass the current user's ID

    socket.on("notification", (data: NotificationType) => {
      toast(data.message, {
        icon: "🔔",
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser?._id]);

  return <></>;
};

export default NotificationBase;
