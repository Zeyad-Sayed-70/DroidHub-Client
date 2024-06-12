import {
  RiNotification4Line,
  RiMessage3Line,
  RiGroupLine,
  RiBookmark3Line,
  RiHomeSmileLine,
} from "react-icons/ri";

export const sidebar_list = [
  {
    title: "Home",
    icon: <RiHomeSmileLine />,
    link: "/",
    requireAuth: false,
  },
  {
    title: "Communities",
    icon: <RiGroupLine />,
    link: "/communities",
    requireAuth: false,
  },
  {
    title: "Notification",
    icon: <RiNotification4Line />,
    link: "/notification",
    requireAuth: true,
  },
  {
    title: "Messages",
    icon: <RiMessage3Line />,
    link: "/messages",
    requireAuth: true,
  },
  {
    title: "Bookmark",
    icon: <RiBookmark3Line />,
    link: "/bookmark",
    requireAuth: true,
  },
];
