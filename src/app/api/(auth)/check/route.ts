import { TokenService } from "@/lib/token-service";
import { connectDB } from "@/database/connectDB";
import { NextResponse } from "next/server";
import User from "@/models/user-model";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json({
        isAuthenticated: false,
        user: null,
      });
    }

    const payload = TokenService.verifyToken(token);
    if (!payload || TokenService.isTokenExpired(token)) {
      return NextResponse.json({
        isAuthenticated: false,
        user: null,
      });
    }

    await connectDB();
    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
      return NextResponse.json({
        isAuthenticated: false,
        user: null,
      });
    }

    return NextResponse.json({
      isAuthenticated: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
