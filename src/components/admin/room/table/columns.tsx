"use client";

import TableAction from "@/components/admin/room/_components/TableAction";
import { IRoom } from "@/types/admin/room-types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<IRoom>[] = [
  {
    accessorKey: "roomImage",
    header: "Room Image",
    cell: ({ row }) => {
      const imageUrl = row.original.roomImage;

      return (
        <>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full object-cover w-9 h-9"
            />
          ) : (
            <h1>Upload image</h1>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "profilePicture",
    header: "Profile Image",
    cell: ({ row }) => {
      const imageUrl = row.original.profilePicture;

      return (
        <>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full object-cover w-9 h-9"
            />
          ) : (
            <h1>Upload image</h1>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "number",
    header: "Phone",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "roomMember",
    header: "Room Member",
  },
  {
    accessorKey: "roomPrice",
    header: "Room price",
  },
  {
    accessorKey: "whoIsUsing",
    header: "Who",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return <TableAction item={item} />;
    },
  },
];
