"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  // ClipboardCheck,
  // Eye,
  // Trash2,
  // Waypoints,
} from "lucide-react";
// import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { ITeacher } from "@/types/admin/teacher-types";
// import { redirect } from "next/navigation";
import TableAction from "../_components/TableAction";

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
    accessorKey: "phoneNumber",
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
    accessorKey: "language",
    header: "Language",
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
