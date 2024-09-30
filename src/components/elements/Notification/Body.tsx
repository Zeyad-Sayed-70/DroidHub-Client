"use client";
import { useGetNotificationsByUserMutation } from "@/lib/features/notifications/notificationsSlice";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import Notification from "./Notification";
import Loader from "@/components/ui/loader";
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Body = () => {
  const { data: session } = useSession();
  // read the tab query
  const param = useSearchParams();
  const tab = param.get("tab");
  const [getNotifications, { isLoading, data: notifications }] =
    useGetNotificationsByUserMutation();
  const userId = session?.user?._id;

  useEffect(() => {
    if (!userId) return;

    switch (tab) {
      case "new":
        getNotifications({ userId, tab });
        break;
      case "archive":
        getNotifications({ userId, tab });
        break;
      default:
        getNotifications({ userId, tab: "seen" });
    }
  }, [tab]);

  const notificationsList = useMemo(
    () =>
      notifications?.map((notification) => (
        <Notification key={notification._id} notification={notification} />
      )),
    [notifications]
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {notifications?.length === 0 && (
        <p className="text-center text-md text-gray-500 mt-8">
          No notifications
        </p>
      )}
      {notificationsList}
    </div>
  );
};

export default Body;
