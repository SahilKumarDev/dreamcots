"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ClipboardCheck,
  Eye,
  Trash2,
  Waypoints,
} from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  name: string;
  index: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "No.",
  },
  {
    accessorKey: "username",
    header: "Username",
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
    accessorKey: "phone",
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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-center">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:!text-blue-400 text-center cursor-pointer">
              <Eye />
              View
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:!text-yellow-400 text-center cursor-pointer">
              <Waypoints />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-center hover:!text-green-400 cursor-pointer"
              onClick={() => navigator.clipboard.writeText(item.id)}
            >
              <ClipboardCheck />
              Copy Id
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:!text-red-400 cursor-pointer text-center">
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
