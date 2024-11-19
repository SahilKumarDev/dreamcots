"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";

export function NavMain() {
  const NAV_MAIN = [
    {
      title: "Student",
      url: "/admin/student",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Recent Students",
          url: "/admin/student",
        },
        {
          title: "All Students",
          url: "/admin/all-students",
        },
      ],
    },
    {
      title: "Teachers",
      url: "/admin/teachers",
      icon: Bot,
      items: [
        {
          title: "Recent Teachers",
          url: "/admin/teachers",
        },
        {
          title: "All Teachers",
          url: "/admin/all-teachers",
        },
      ],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Activity</SidebarGroupLabel>
      <SidebarMenu>
        {NAV_MAIN.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
