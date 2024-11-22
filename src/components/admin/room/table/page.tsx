"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useToast } from "@/hooks/use-toast";
import { IRoom } from "@/types/admin/room-types";
import Loader from "@/components/loader/Loader";

export default function RoomData() {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms");
        const data = await response.json();
        setRooms(data);
      } catch {
        toast({
          title: "Error",
          description: "Failed to fetch rooms",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [toast]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={rooms} />
    </div>
  );
}
