"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useToast } from "@/hooks/use-toast";
import { IStudent } from "@/types/admin/student-types";
import Loader from "@/components/loader/Loader";

export default function StudentData() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/students");
        const data = await response.json();
        setStudents(data);
      } catch {
        toast({
          title: "Error",
          description: "Failed to fetch students",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [toast]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mxs-auto">
      <DataTable columns={columns} data={students} />
    </div>
  );
}
