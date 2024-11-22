"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useToast } from "@/hooks/use-toast";
import { ITeacher } from "@/types/admin/teacher-types";
import Loader from "@/components/loader/Loader";

export default function TeacherData() {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("/api/teachers");
        const data = await response.json();
        setTeachers(data);
      } catch {
        toast({
          title: "Error",
          description: "Failed to fetch teachers",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, [toast]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={teachers} />
    </div>
  );
}
