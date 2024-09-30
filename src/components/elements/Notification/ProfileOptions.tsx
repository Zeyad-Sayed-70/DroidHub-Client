import React from "react";
import { HiDotsVertical } from "react-icons/hi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationType } from "@/types/notification";
import { useArchiveNotificationMutation } from "@/lib/features/notifications/notificationsSlice";

const NotificationOptions = ({
  notification,
  setArchived,
}: {
  notification: NotificationType;
  setArchived: (value: boolean) => void;
}) => {
  const [archiveNotification] = useArchiveNotificationMutation();

  const handleArchive = async () => {
    await archiveNotification(notification._id);
    setArchived(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="text-xl   bg-red-300 ">
            <HiDotsVertical />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleArchive}>
            {notification.isArchived ? "Unarchive" : "Archive"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NotificationOptions;
