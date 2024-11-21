import { NextRequest, NextResponse } from "next/server";
import { IStudent } from "@/types/admin/student-types";
import Student from "@/models/admin/student-model";
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
    const student = await Student.findById(params.id);

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const body: Partial<IStudent> = await request.json();

    if (body.email) {
      const orConditions: FilterQuery<IStudent>[] = [];

      if (body.email) {
        orConditions.push({ email: body.email });
      }

      const existingStudent = await Student.findOne({
        _id: { $ne: params.id },
        $or: orConditions,
      });

      if (existingStudent) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(updatedStudent, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const deletedStudent = await Student.findByIdAndDelete(params.id);

    if (!deletedStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Student deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}
