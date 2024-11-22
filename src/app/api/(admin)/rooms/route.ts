import { NextRequest, NextResponse } from "next/server";
import { IRoom, IGender } from "@/types/admin/room-types";
import Room from "@/models/admin/room-model";
import { connectDB } from "@/database/connectDB";

export async function GET() {
  try {
    await connectDB();
    const rooms = await Room.find({}).sort({ createdAt: -1 });
    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    console.log("====================================");
    console.log("Internal server error from GET api of Rooms:- ", error);
    console.log("====================================");
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: IRoom = await request.json();

    // Validate enum values
    if (body.gender && !Object.values(IGender).includes(body.gender)) {
      return NextResponse.json(
        { error: "Invalid gender value" },
        { status: 400 }
      );
    }

    // if (body.coaching && !Object.values(ICoaching).includes(body.coaching)) {
    //   return NextResponse.json(
    //     { error: "Invalid coaching value" },
    //     { status: 400 }
    //   );
    // }

    const existingRoom = await Room.findOne({
      $or: [{ email: body.email }, { number: body.number }],
    });

    if (existingRoom) {
      return NextResponse.json(
        { error: "Room with this email or number already exists" },
        { status: 400 }
      );
    }

    const room = await Room.create(body);
    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.log("====================================");
    console.log("Internal server error from POST api of Rooms:- ", error);
    console.log("====================================");
    return NextResponse.json(
      {
        error: "Failed to create room",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
