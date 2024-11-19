import { NextRequest, NextResponse } from "next/server";
import { ITeacher } from "@/types/admin/teacher-types";
import Teacher from "@/models/admin/teacher-model";
import { connectDB } from "@/database/connectDB";

export async function GET() {
  try {
    await connectDB();
    const teachers = await Teacher.find({}).sort({ createdAt: -1 });
    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    console.log('====================================');
    console.log("Internal server error from GET api of Teachers:- ", error);
    console.log('====================================');
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

    const existingTeacher = await Teacher.findOne({
      $or: [{ email: body.email }, { uniqueName: body.uniqueName }],
    });

    if (existingTeacher) {
      return NextResponse.json(
        { error: "Teacher with this email or unique name already exists" },
        { status: 400 }
      );
    }

    const teacher = await Teacher.create(body);
    return NextResponse.json(teacher, { status: 201 });
  } catch (error) {
    console.log('====================================');
    console.log("Internal server error from POST api of Teachers:- ", error);
    console.log('====================================');
    return NextResponse.json(
      { error: "Failed to create teacher" },
      { status: 500 }
    );
  }
}
