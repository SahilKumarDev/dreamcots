 
import axios from "axios";
import { useToast } from "../use-toast";
import { ISchoolCollege } from "@/types/admin/school-college-types";

interface ISchoolCollegeActions {
  schoolCollegeId: string;
  refreshData?: () => void;
}

export const useSchoolCollegeActions = ({ refreshData }: ISchoolCollegeActions) => {
  const { toast } = useToast();

  // View School College Details
  const handleViewSchoolCollege = async (id: string) => {
    try {
      const response = await axios.get(`/api/schools-colleges/${id}`);
      toast({
        title: "Success",
        description: "School College details",
      });
      return response.data;
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch school college details",
      });
    }
  };

  // Edit School College
  const handleEditSchoolCollege = async (id: string, data: ISchoolCollege) => {
    try {
      const response = await axios.put(`/api/schools-colleges/${id}`, data);
      toast({
        title: "Success",
        description: "School College has been updated",
      });
      refreshData?.();
      return response.data;
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch school college details",
      });
    }
  };

  // Delete School College
  const handleDeleteSchoolCollege = async (id: string) => {
    try {
      await axios.delete(`/api/schools-colleges/${id}`);
      toast({
        title: "Success",
        description: "School College has been deleted",
      });
      refreshData?.();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete school college details",
      });
    }
  };

  return {
    handleViewSchoolCollege,
    handleEditSchoolCollege,
    handleDeleteSchoolCollege,
  };
};
