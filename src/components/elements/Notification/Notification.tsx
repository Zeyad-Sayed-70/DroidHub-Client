import { NotificationType } from "@/types/notification";
import { getRelativeTime } from "@/utils/getRelativeTime";
import React, { memo } from "react";
import NotificationOptions from "./ProfileOptions";

interface NotificationProps {
  notification: NotificationType;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const { message, timestamp, seen } = notification;
  const [archived, setArchived] = React.useState(false);

  if (archived) return null;

  return (
    <div className="flex items-center justify-between gap-3 p-4 rounded-md bg-slate-100 hover:bg-slate-200 cursor-pointer mb-1">
      <span>🔔</span>
      <p>{message}</p>
      <small className="ml-auto">
        {getRelativeTime(timestamp)}{" "}
        {!seen && <span className="text-xs ml-1">🔴</span>}
      </small>
      <NotificationOptions
        notification={notification}
        setArchived={setArchived}
      />
    </div>
  );
};

export default memo(Notification);
