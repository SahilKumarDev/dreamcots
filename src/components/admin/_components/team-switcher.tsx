"use client";

import * as React from "react";
import { ChevronsUpDown, Edit2, Plus, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Team } from "@/types/team-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function TeamSwitcher() {
  const { isMobile } = useSidebar(); 

  const { toast } = useToast();
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Partial<Team>>({});

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/teams");
        const data = await response.json();
        setTeams(data);
        if (data.length > 0) setActiveTeam(data[0]);
      } catch {
        toast({
          title: "Error",
          description: "Failed to fetch teams",
          variant: "destructive",
        });
      }
    };

    fetchTeams();
  }, [toast]);

  const handleAddTeam = async () => {
    // Validation
    if (!currentTeam.name || !currentTeam.logo) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentTeam),
      });
      const newTeam = await response.json();
      setTeams([...teams, newTeam]);
      setIsDialogOpen(false);
      setCurrentTeam({});

      toast({
        title: "Success",
        description: "Team added successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to add team",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTeam = async () => {
    // Validate required fields
    if (!currentTeam._id) {
      toast({
        title: "Validation Error",
        description: "Team ID is required for update",
        variant: "destructive",
      });
      return;
    }

    if (!currentTeam.name || !currentTeam.logo) {
      toast({
        title: "Validation Error",
        description: "Team name and logo are required",
        variant: "destructive",
      });
      return;
    }

    try {
      // Prepare update payload
      const updatePayload = {
        id: currentTeam._id,
        name: currentTeam.name,
        logo: currentTeam.logo,
        plan: currentTeam.plan || "Free", // Default plan if not provided
      };

      const response = await fetch("/api/teams", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });

      // Check if response is successful
      if (!response.ok) {
        throw new Error("Update failed");
      }

      const updatedTeam = await response.json();

      // Update teams state
      setTeams(
        teams.map((team) => (team._id === updatedTeam._id ? updatedTeam : team))
      );

      // Reset dialog and current team
      setIsDialogOpen(false);
      setCurrentTeam({});

      // Show success toast
      toast({
        title: "Success",
        description: "Team updated successfully",
      });
    } catch (error) {
      // More detailed error handling
      console.error("Update error:", error);
      toast({
        title: "Error",
        description: "Failed to update team. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTeam = async (teamId: string) => {
    try {
      await fetch("/api/teams", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: teamId }),
      });
      setTeams(teams.filter((team) => team._id !== teamId));
      if (activeTeam?._id === teamId) {
        setActiveTeam(teams.length > 0 ? teams[0] : null);
      }

      toast({
        title: "Success",
        description: "Team deleted successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete team",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (team: Team) => {
    setCurrentTeam(team);
    setIsDialogOpen(true);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {activeTeam?.logo}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam ? activeTeam.name : "Select Team"}
                </span>
                <span className="truncate text-xs">{activeTeam?.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="flex items-center justify-between p-2 "
              >
                <div className="flex gap-2">
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    {team.logo}
                  </div>
                  <h1 className="max-w-24 line-clamp-1">{team.name}</h1>
                </div>
                <div className="flex gap-2.5">
                  <DropdownMenuShortcut
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditDialog(team);
                    }}
                    className="text-muted-foreground hover:text-green-500 hover:cursor-pointer"
                  >
                    <Edit2 size={14} />
                  </DropdownMenuShortcut>
                  <DropdownMenuShortcut
                    className="text-muted-foreground hover:text-red-500 hover:cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTeam(team._id!);
                    }}
                  >
                    <Trash2 size={14} />
                  </DropdownMenuShortcut>
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </div>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => {
                setCurrentTeam({});
                setIsDialogOpen(true);
              }}
              className="gap-2 p-2 flex items-center justify-center hover:cursor-pointer"
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {currentTeam._id ? "Edit Team" : "Add Team"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Team Name"
                value={currentTeam.name || ""}
                onChange={(e) =>
                  setCurrentTeam({ ...currentTeam, name: e.target.value })
                }
              />
              <Input
                placeholder="Select Emoji"
                value={currentTeam.logo || ""}
                onChange={(e) =>
                  setCurrentTeam({ ...currentTeam, logo: e.target.value })
                }
              />
              <Input
                placeholder="Plan"
                value={currentTeam.plan || ""}
                onChange={(e) =>
                  setCurrentTeam({ ...currentTeam, plan: e.target.value })
                }
              />
              <Button
                onClick={currentTeam._id ? handleUpdateTeam : handleAddTeam}
                className="w-full"
              >
                {currentTeam._id ? "Update Team" : "Add Team"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
