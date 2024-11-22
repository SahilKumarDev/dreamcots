import { IRoom } from "@/types/admin/room-types";

import axios from "axios";
import { useToast } from "../use-toast";

interface IRoomActions {
  roomId: string;
  refreshData?: () => void;
}

export const useRoomActions = ({ refreshData }: IRoomActions) => {
  const { toast } = useToast();

  // View Room Details
  const handleViewRoom = async (id: string) => {
    try {
      const response = await axios.get(`/api/rooms/${id}`);
      toast({
        title: "Success",
        description: "Room details",
      });
      return response.data;
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch room details",
      });
    }
  };

  // Edit Room
  const handleEditRoom = async (id: string, data: IRoom) => {
    try {
      const response = await axios.put(`/api/rooms/${id}`, data);
      toast({
        title: "Success",
        description: "Room has been updated",
      });
      refreshData?.();
      return response.data;
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch room details",
      });
    }
  };

  // Delete Room
  const handleDeleteRoom = async (id: string) => {
    try {
      await axios.delete(`/api/rooms/${id}`);
      toast({
        title: "Success",
        description: "Room has been deleted",
      });
      refreshData?.();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete room details",
      });
    }
  };

  return {
    handleViewRoom,
    handleEditRoom,
    handleDeleteRoom,
  };
};
