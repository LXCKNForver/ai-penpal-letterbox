import { Compass, Feather, Inbox, Pencil, UserRound } from "lucide-react";

export const bottomNavItems = [
  { type: "link" as const, href: "/inbox", label: "\u4fe1\u7bb1", icon: Inbox },
  { type: "link" as const, href: "/discover", label: "\u63a2\u7d22", icon: Compass },
  { type: "center" as const, label: "\u7fbd\u6bdb\u7b14", icon: Feather },
  { type: "link" as const, href: "/letters", label: "\u5199\u4fe1", icon: Pencil },
  { type: "link" as const, href: "/profile", label: "\u6211\u7684", icon: UserRound },
];
 