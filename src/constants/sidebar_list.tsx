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
  },
  {
    title: "Communities",
    icon: <RiGroupLine />,
    link: "/communities",
  },
  {
    title: "Notification",
    icon: <RiNotification4Line />,
    link: "/notification",
  },
  {
    title: "Messages",
    icon: <RiMessage3Line />,
    link: "/messages",
  },
  {
    title: "Bookmark",
    icon: <RiBookmark3Line />,
    link: "/bookmark",
  },
];
