import {
  Home,
  LayoutDashboard,
  School,
  User2,
  UserCheck2,
  UserCheckIcon,
} from "lucide-react";

export const projects = [
  {
    id: 1,
    name: "Dashboard",
    icon: LayoutDashboard,
    isActive: true,
    url: "/admin",
  },
  {
    id: 2,
    name: "user",
    icon: User2,
    url: "/user",
  },
  {
    id: 3,
    name: "Student",
    icon: UserCheckIcon,
    url: "/student",
  },
  {
    id: 4,
    name: "Teacher",
    icon: UserCheck2,
    url: "/teacher",
  },
  {
    id: 5,
    name: "School-college",
    icon: School,
    url: "/school-college",
  },
  {
    id: 6,
    name: "Room",
    icon: Home,
    url: "/room",
  },
];
