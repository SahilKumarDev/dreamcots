import { ITeacher } from "@/types/admin/teacher-types";

import axios from "axios";
import { useToast } from "../use-toast";

interface ITeacherActions {
  teacherId: string;
  refreshData?: () => void;
}

export const useTeacherActions = ({ refreshData }: ITeacherActions) => {
  const { toast } = useToast();

  // View Teacher Details
  const handleViewTeacher = async (id: string) => {
    try {
      const response = await axios.get(`/api/teachers/${id}`);
      toast({
        title: "Success",
        description: "Teacher details",
      });
      return response.data;
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch teacher details",
      });
    }
  };

  // Edit Teacher
  const handleEditTeacher = async (id: string, data: ITeacher) => {
    try {
      const response = await axios.put(`/api/teachers/${id}`, data);
      toast({
        title: "Success",
        description: "Teacher has been updated",
      });
      refreshData?.();
      return response.data;
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch teacher details",
      });
    }
  };

  // Delete Teacher
  const handleDeleteTeacher = async (id: string) => {
    try {
      await axios.delete(`/api/teachers/${id}`);
      toast({
        title: "Success",
        description: "Teacher has been deleted",
      });
      refreshData?.();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete teacher details",
      });
    }
  };

  return {
    handleViewTeacher,
    handleEditTeacher,
    handleDeleteTeacher,
  };
};
