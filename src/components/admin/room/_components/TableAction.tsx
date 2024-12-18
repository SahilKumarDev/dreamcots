import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Trash2, Waypoints, MoreHorizontal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { IRoom } from "@/types/admin/room-types";
import { useRoomActions } from "@/hooks/admin/useRoomAction";
import { ADMIN_ROOM_EDIT, ADMIN_ROOM_VIEW } from "@/utils/routes";

interface TableActionsProps {
  item: IRoom;
  refreshData?: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({ item, refreshData }) => {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleViewRoom, handleDeleteRoom } = useRoomActions({
    roomId: item._id,
    refreshData,
  });

  const roomView = `${ADMIN_ROOM_VIEW}${item._id}`;
  const roomEdit = `${ADMIN_ROOM_EDIT}${item._id}`;

  const onView = async () => {
    try {
      setIsLoading(true);
      await handleViewRoom(item._id);
      router.push(roomView);
    } catch (error) {
      console.error("View error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onEdit = async () => {
    try {
      setIsLoading(true);
      await handleViewRoom(item._id);
      router.push(roomEdit);
    } catch (error) {
      console.error("Edit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await handleDeleteRoom(item._id);
      setIsDeleteDialogOpen(false);
      location.reload();
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onView}
            className="flex items-center gap-2 hover:!text-blue-400 text-center cursor-pointer"
            disabled={isLoading}
          >
            <Eye className="h-4 w-4" />
            <span>View</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onEdit}
            className="flex items-center gap-2 hover:!text-yellow-400 text-center cursor-pointer"
            disabled={isLoading}
          >
            <Waypoints className="h-4 w-4" />
            <span>Update</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="flex items-center gap-2 hover:!text-red-400 text-center cursor-pointer"
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              room
              {item.name && ` "${item.name}"`} and remove their data from the
              system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600"
              disabled={isLoading}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TableActions;
