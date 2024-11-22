import { NextRequest, NextResponse } from "next/server";
import { IRoom } from "@/types/admin/room-types";
import Room from "@/models/admin/room-model";
import { connectDB } from "@/database/connectDB";
import { FilterQuery } from "mongoose";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const room = await Room.findById(params.id);

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch room" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const body: Partial<IRoom> = await request.json();

    if (body.email) {
      const orConditions: FilterQuery<IRoom>[] = [];

      if (body.email) {
        orConditions.push({ email: body.email });
      }

      const existingRoom = await Room.findOne({
        _id: { $ne: params.id },
        $or: orConditions,
      });

      if (existingRoom) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedRoom) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(updatedRoom, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update room" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const deletedRoom = await Room.findByIdAndDelete(params.id);

    if (!deletedRoom) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Room deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to delete room" },
      { status: 500 }
    );
  }
}
