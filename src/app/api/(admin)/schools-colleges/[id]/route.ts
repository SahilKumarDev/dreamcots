import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/database/connectDB";
import { FilterQuery } from "mongoose";
import SchoolCollege from "@/models/admin/school-college-model";
import { ISchoolCollege } from "@/types/admin/school-college-types";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const schoolCollege = await SchoolCollege.findById(params.id);

    if (!schoolCollege) {
      return NextResponse.json(
        { error: "School College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(schoolCollege, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch School College" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const body: Partial<ISchoolCollege> = await request.json();

    if (body.email) {
      const orConditions: FilterQuery<ISchoolCollege>[] = [];

      if (body.email) {
        orConditions.push({ email: body.email });
      }

      const existingSchoolCollege = await SchoolCollege.findOne({
        _id: { $ne: params.id },
        $or: orConditions,
      });

      if (existingSchoolCollege) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }
    }

    const updatedSchoolCollege = await SchoolCollege.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedSchoolCollege) {
      return NextResponse.json(
        { error: "School College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedSchoolCollege, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update School College" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const deletedSchoolCollege = await SchoolCollege.findByIdAndDelete(
      params.id
    );

    if (!deletedSchoolCollege) {
      return NextResponse.json(
        { error: "School College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "School College deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to delete School College" },
      { status: 500 }
    );
  }
}
