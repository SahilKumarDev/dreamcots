import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Team } from "@/types/admin/team-types";

export const useTeam = () => {
  const { toast } = useToast();
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Partial<Team>>({});

  useEffect(() => {
    fetchTeams();
  });

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

  return {
    teams,
    activeTeam,
    setActiveTeam,
    handleAddTeam,
    handleUpdateTeam,
    handleDeleteTeam,
    openEditDialog,
    isDialogOpen,
  };
};
