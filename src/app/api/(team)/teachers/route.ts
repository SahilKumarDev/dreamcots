import { NextRequest, NextResponse } from "next/server";
import { ITeacher, IGender, ICoaching } from "@/types/admin/teacher-types";
import Teacher from "@/models/admin/teacher-model";
import { connectDB } from "@/database/connectDB";

export async function GET() {
  try {
    await connectDB();
    const teachers = await Teacher.find({}).sort({ createdAt: -1 });
    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    console.log("====================================");
    console.log("Internal server error from GET api of Teachers:- ", error);
    console.log("====================================");
    return NextResponse.json(
      { error: "Failed to fetch teachers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: ITeacher = await request.json();

    // Validate enum values
    if (body.gender && !Object.values(IGender).includes(body.gender)) {
      return NextResponse.json(
        { error: "Invalid gender value" },
        { status: 400 }
      );
    }

    if (body.coaching && !Object.values(ICoaching).includes(body.coaching)) {
      return NextResponse.json(
        { error: "Invalid coaching value" },
        { status: 400 }
      );
    }

    const existingTeacher = await Teacher.findOne({
      $or: [{ email: body.email }, { number: body.number }],
    });

    if (existingTeacher) {
      return NextResponse.json(
        { error: "Teacher with this email or number already exists" },
        { status: 400 }
      );
    }

    const teacher = await Teacher.create(body);
    return NextResponse.json(teacher, { status: 201 });
  } catch (error) {
    console.log("====================================");
    console.log("Internal server error from POST api of Teachers:- ", error);
    console.log("====================================");
    return NextResponse.json(
      {
        error: "Failed to create teacher",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
