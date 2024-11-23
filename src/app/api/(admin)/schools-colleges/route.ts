import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/database/connectDB";
import SchoolCollege from "@/models/admin/school-college-model";
import { IGender, ISchoolCollege } from "@/types/admin/school-college-types";

export async function GET() {
  try {
    await connectDB();
    const schoolCollege = await SchoolCollege.find({}).sort({ createdAt: -1 });
    return NextResponse.json(schoolCollege, { status: 200 });
  } catch (error) {
    console.log("====================================");
    console.log(
      "Internal server error from GET api of School College:- ",
      error
    );
    console.log("====================================");
    return NextResponse.json(
      { error: "Failed to fetch School College" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: ISchoolCollege = await request.json();

    if (body.gender && !Object.values(IGender).includes(body.gender)) {
      return NextResponse.json(
        { error: "Invalid gender value" },
        { status: 400 }
      );
    } 

    const existingSchoolCollege = await SchoolCollege.findOne({
      $or: [{ email: body.email }, { number: body.number }],
    });

    if (existingSchoolCollege) {
      return NextResponse.json(
        { error: "School College with this email or number already exists" },
        { status: 400 }
      );
    }

    const schoolCollege = await SchoolCollege.create(body);
    return NextResponse.json(schoolCollege, { status: 201 });
  } catch (error) {
    console.log("====================================");
    console.log(
      "Internal server error from POST api of School College:- ",
      error
    );
    console.log("====================================");
    return NextResponse.json(
      {
        error: "Failed to create School College",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
