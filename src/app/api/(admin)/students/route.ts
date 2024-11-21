import { NextRequest, NextResponse } from "next/server";
import { IStudent, IGender } from "@/types/admin/student-types";
import Student from "@/models/admin/student-model";
import { connectDB } from "@/database/connectDB";

export async function GET() {
  try {
    await connectDB();
    const students = await Student.find({}).sort({ createdAt: -1 });
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.log("====================================");
    console.log("Internal server error from GET api of Students:- ", error);
    console.log("====================================");
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: IStudent = await request.json();
 
    if (body.gender && !Object.values(IGender).includes(body.gender)) {
      return NextResponse.json(
        { error: "Invalid gender value" },
        { status: 400 }
      );
    }
 
    const existingStudent = await Student.findOne({
      $or: [{ email: body.email }, { number: body.number }],
    });

    if (existingStudent) {
      return NextResponse.json(
        { error: "Student with this email or number already exists" },
        { status: 400 }
      );
    }

    const student = await Student.create(body);
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.log("====================================");
    console.log("Internal server error from POST api of Students:- ", error);
    console.log("====================================");
    return NextResponse.json(
      {
        error: "Failed to create student",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
