"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useToast } from "@/hooks/use-toast";
import { ISchoolCollege } from "@/types/admin/school-college-types";
import Loader from "@/components/loader/Loader";

export default function SchoolCollegeData() {
  const [schoolColleges, setSchoolColleges] = useState<ISchoolCollege[]>([]);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    const fetchSchoolColleges = async () => {
      try {
        const response = await fetch("/api/schools-colleges");
        const data = await response.json();
        setSchoolColleges(data);
      } catch {
        toast({
          title: "Error",
          description: "Failed to fetch schools colleges",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSchoolColleges();
  }, [toast]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={schoolColleges} />
    </div>
  );
}
