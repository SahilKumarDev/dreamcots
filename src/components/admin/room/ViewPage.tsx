"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoomActions } from "@/hooks/admin/useRoomAction";
import Heading from "@/components/admin/_components/Heading";
import { IRoom } from "@/types/admin/room-types";
import { Separator } from "@/components/ui/separator";
import { ADMIN_ROOM_EDIT } from "@/utils/routes";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader/Loader";
import { useRouter } from "next/navigation";
import { Waypoints } from "lucide-react";
import Image from "next/image";

const RoomViewPage = ({ slugId }: { slugId: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState<IRoom | null>(null);

  const { handleViewRoom } = useRoomActions({
    roomId: slugId,
  });

  const router = useRouter();
  const roomEdit = `${ADMIN_ROOM_EDIT}${slugId}`;

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setIsLoading(true);
        const data = await handleViewRoom(slugId);

        setRoom(data);
      } catch (error) {
        console.error("View error:", error);
        setRoom(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomData();
  }, [slugId]);

  const onEdit = async () => {
    try {
      setIsLoading(true);
      await handleViewRoom(slugId);
      router.push(roomEdit);
    } catch (error) {
      console.error("Edit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!room) {
    return (
      <div className="h-full w-full flex-center">
        <p className="text-lg text-gray-500">
          No Record found for this ID:- {slugId}
        </p>
      </div>
    );
  }

  return (
    <Card className="px-2 py-2 ">
      <CardHeader className="text-center text-2xl ">
        <CardTitle className="font-normal">
          Profile of <span className="underline">{room.name}</span>
        </CardTitle>
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className=" ">
        <div className="flex-between h-fit">
          <div className="flex-center gap-2">
            <Image
              src={room.profilePicture}
              alt="profile"
              width={100}
              height={100}
              className="h-20 w-20 rounded-full "
            />
            <div>
              <h2 className="text-lg font-semibold">Name:- {room.name}</h2>
              <small className="text-sm font-medium leading-none">
                Email:- {room.email}
              </small>
            </div>
          </div>

          <Button onClick={onEdit} disabled={isLoading}>
            <Waypoints className="h-4 w-4" />
            <span>Update</span>
          </Button>
        </div>

        <Separator className="my-8" />

        <div className="grid-layout">
          <Heading text={`Number:- ${room.number}`} />
          <Heading text={`Date of Birth:- ${room.dob}`} />
          <Heading text={`Status:- ${room.status}`} />
          <Heading text={`Address:- ${room.address}`} />
          <Heading text={`Room Member:- ${room.roomMember}`} />
          <Heading text={`Gender:- ${room.gender}`} />
          <Heading text={`Profession:- ${room.profession}`} />
          <Heading text={`Room Type:- ${room.roomType}`} />
          <Heading text={`Room Price:- ${room.roomPrice}`} />
          <Heading text={`Who is using:- ${room.whoIsUsing}`} />
          <Image
            src={room.roomImage}
            alt={"Room image "}
            height={300}
            width={300}
            className=" rounded-lg mt-8"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomViewPage;
