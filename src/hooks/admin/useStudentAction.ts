import { IStudent } from "@/types/admin/student-types";

import axios from "axios";
import { useToast } from "../use-toast";

interface IStudentActions {
  studentId: string;
  refreshData?: () => void;
}

export const useStudentActions = ({ refreshData }: IStudentActions) => {
  const { toast } = useToast();

  // View Student Details
  const handleViewStudent = async (id: string) => {
    try {
      const response = await axios.get(`/api/students/${id}`);


      toast({
        title: "Success",
        description: "Student details",
      });
      return response.data;
    } catch (error) {
      console.log('====================================');
      console.log("Internal server error from Students:- ", error);
      console.log('====================================');
      toast({
        title: "Error",
        description: "Failed to fetch student details",
      });

    }
  };

  // Edit Student
  const handleEditStudent = async (id: string, data: IStudent) => {
    try {
      const response = await axios.put(`/api/students/${id}`, data);
      toast({
        title: "Success",
        description: "Student has been updated",
      });
      refreshData?.();
      return response.data;
    } catch (error){
      console.log('====================================');
      console.log("Internal server error from Students:- ", error);
      console.log('====================================');
      toast({
        title: "Error",
        description: "Failed to fetch student details",
      });
    }
  };

  // Delete Student
  const handleDeleteStudent = async (id: string) => {
    try {
      await axios.delete(`/api/students/${id}`);
      toast({
        title: "Success",
        description: "Student has been deleted",
      });
      refreshData?.();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete student details",
      });
    }
  };

  return {
    handleViewStudent,
    handleEditStudent,
    handleDeleteStudent,
  };
};
