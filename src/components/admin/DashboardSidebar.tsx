"use client";

import * as React from "react";

import { NavUser } from "@/components/admin/_components/nav-user";
import { TeamSwitcher } from "@/components/admin/_components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useProfile } from "@/hooks/useProfile";
import AdminDashboardItem from "./AdminDashboardItem";

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { user } = useProfile();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <AdminDashboardItem />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
