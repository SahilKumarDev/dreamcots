"use client";

import TableAction from "@/components/admin/teacher/_components/TableAction";
import { ITeacher } from "@/types/admin/teacher-types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<ITeacher>[] = [
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
    accessorKey: "experience",
    header: "Experience",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "teachingLanguage",
    header: "Language",
  },
  {
    accessorKey: "qualification",
    header: "Qualifi...",
  },
  {
    accessorKey: "teachingSubject",
    header: "Subject",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return <TableAction item={item} />;
    },
  },
];
