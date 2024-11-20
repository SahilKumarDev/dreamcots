"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

// Define the Teacher interface
interface ITeacher {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  yearsOfExperience: number;
  teachingSubjects: string[];
  highestQualification: string;
}

// Dummy data
const dummyData: ITeacher[] = [
  {
    id: "t1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    phoneNumber: "(555) 123-4567",
    yearsOfExperience: 12,
    teachingSubjects: ["Physics", "Mathematics"],
    highestQualification: "Ph.D. Physics"
  },
  {
    id: "t2",
    name: "Prof. Michael Chen",
    email: "m.chen@school.edu",
    phoneNumber: "(555) 234-5678",
    yearsOfExperience: 8,
    teachingSubjects: ["Chemistry", "Biology"],
    highestQualification: "M.Sc. Chemistry"
  },
  {
    id: "t3",
    name: "Mrs. Emily Davis",
    email: "emily.d@school.edu",
    phoneNumber: "(555) 345-6789",
    yearsOfExperience: 15,
    teachingSubjects: ["English Literature", "Creative Writing"],
    highestQualification: "M.A. English"
  },
  {
    id: "t4",
    name: "Mr. Robert Wilson",
    email: "r.wilson@school.edu",
    phoneNumber: "(555) 456-7890",
    yearsOfExperience: 6,
    teachingSubjects: ["History", "Social Studies"],
    highestQualification: "B.A. History"
  },
  {
    id: "t5",
    name: "Ms. Maria Garcia",
    email: "m.garcia@school.edu",
    phoneNumber: "(555) 567-8901",
    yearsOfExperience: 10,
    teachingSubjects: ["Spanish", "French"],
    highestQualification: "M.A. Languages"
  },
  {
    id: "t6",
    name: "Dr. James Thompson",
    email: "j.thompson@school.edu",
    phoneNumber: "(555) 678-9012",
    yearsOfExperience: 20,
    teachingSubjects: ["Computer Science", "Mathematics"],
    highestQualification: "Ph.D. Computer Science"
  },
  {
    id: "t7",
    name: "Mrs. Lisa Brown",
    email: "l.brown@school.edu",
    phoneNumber: "(555) 789-0123",
    yearsOfExperience: 9,
    teachingSubjects: ["Art", "Design"],
    highestQualification: "B.F.A. Fine Arts"
  },
  {
    id: "t8",
    name: "Mr. David Kim",
    email: "d.kim@school.edu",
    phoneNumber: "(555) 890-1234",
    yearsOfExperience: 7,
    teachingSubjects: ["Music", "Drama"],
    highestQualification: "M.Mus. Performance"
  },
  {
    id: "t9",
    name: "Dr. Rachel Green",
    email: "r.green@school.edu",
    phoneNumber: "(555) 901-2345",
    yearsOfExperience: 11,
    teachingSubjects: ["Biology", "Environmental Science"],
    highestQualification: "Ph.D. Biology"
  },
  {
    id: "t10",
    name: "Prof. Thomas Anderson",
    email: "t.anderson@school.edu",
    phoneNumber: "(555) 012-3456",
    yearsOfExperience: 14,
    teachingSubjects: ["Physics", "Astronomy"],
    highestQualification: "Ph.D. Astrophysics"
  }
];

const TeacherTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Define columns with sorting capability
  const columns: ColumnDef<ITeacher>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-white hover:text-white hover:bg-green-600"
          >
            Name
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-white hover:text-white hover:bg-green-600"
          >
            Email
          </Button>
        );
      },
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
    },
    {
      accessorKey: "yearsOfExperience",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-white hover:text-white hover:bg-green-600"
          >
            Experience
          </Button>
        );
      },
    },
    {
      accessorKey: "teachingSubjects",
      header: "Subjects",
      cell: ({ row }) => (
        <div className="max-w-[200px]">
          {row.original.teachingSubjects.join(", ")}
        </div>
      ),
    },
    {
      accessorKey: "highestQualification",
      header: "Qualification",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleUpdate(row.original)}
              className="h-8 w-8 p-0 text-white hover:bg-gray-800"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(row.original.id)}
              className="h-8 w-8 p-0 text-white hover:bg-gray-800"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  // Handler functions
  const handleUpdate = (teacher: ITeacher) => {
    console.log("Update teacher:", teacher);
    // Add your update logic here
  };

  const handleDelete = (id: string) => {
    console.log("Delete teacher:", id);
    // Add your delete logic here
  };

  // Initialize table with sorting and pagination
  const table = useReactTable({
    data: dummyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 5, // Show 5 records per page
      },
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border border-gray-800">
        <Table>
          <TableHeader className="bg-red-500 flex ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-green-700 hover:bg-green-700 flex"
              >
                {headerGroup.headers.map((header) => (
                  <TableHeader
                    key={header.id}
                    className="text-white font-medium h-12"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="bg-black hover:bg-gray-900"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-white">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-white"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-white">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="text-white border-white hover:bg-gray-800"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="text-white border-white hover:bg-gray-800"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TeacherTable;