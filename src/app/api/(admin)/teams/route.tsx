import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/connectDB";
import { ITeam } from "@/types/admin/team-types";
import Team from "@/models/admin/team-model";

export async function GET() {
  await connectDB();
  try {
    const teams = await Team.find({});
    return NextResponse.json(teams, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const teamData: ITeam = await request.json();
    const team = new Team(teamData);
    await team.save();
    return NextResponse.json(team, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create team" },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  await connectDB();
  try {
    const { id, ...updateData } = await request.json();
    const team = await Team.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(team, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update team" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await connectDB();
  try {
    const { id } = await request.json();
    await Team.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Team deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to delete team" },
      { status: 400 }
    );
  }
}
