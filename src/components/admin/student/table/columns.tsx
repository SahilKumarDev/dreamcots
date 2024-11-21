"use client";

import TableAction from "@/components/admin/student/_components/TableAction";
import { IStudent } from "@/types/admin/student-types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<IStudent>[] = [
  {
    accessorKey: "profilePicture",
    header: "Image",
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
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "qualification",
    header: "Qualifi...",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return <TableAction item={item} />;
    },
  },
];
