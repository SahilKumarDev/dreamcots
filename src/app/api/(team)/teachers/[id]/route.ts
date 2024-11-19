import { NextRequest, NextResponse } from "next/server";
import { ITeacher } from "@/types/admin/teacher-types";
import Teacher from "@/models/admin/teacher-model";
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
    const teacher = await Teacher.findById(params.id);

    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    return NextResponse.json(teacher, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch teacher" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const body: Partial<ITeacher> = await request.json();

    if (body.email || body.uniqueName) {
      const orConditions: FilterQuery<ITeacher>[] = [];

      if (body.email) {
        orConditions.push({ email: body.email });
      }
      if (body.uniqueName) {
        orConditions.push({ uniqueName: body.uniqueName });
      }

      const existingTeacher = await Teacher.findOne({
        _id: { $ne: params.id },
        $or: orConditions,
      });

      if (existingTeacher) {
        return NextResponse.json(
          { error: "Email or unique name already in use" },
          { status: 400 }
        );
      }
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTeacher, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update teacher" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const deletedTeacher = await Teacher.findByIdAndDelete(params.id);

    if (!deletedTeacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Teacher deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete teacher" },
      { status: 500 }
    );
  }
}
