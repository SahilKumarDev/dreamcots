import { connectDB } from "@/database/connectDB";
import { PasswordService } from "@/lib/password";
import User from "@/models/user-model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
 
    const passwordValidation = 
      PasswordService.validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: "Invalid password", details: passwordValidation.errors },
        { status: 400 }
      );
    }

    await connectDB();
 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
 
    const hashedPassword = await PasswordService.hashPassword(password);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });
 
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
 
    const response = NextResponse.json(
      { 
        message: "User created successfully", 
        user: {
          _id: user._id,
          email: user.email,
          name: user.name
        }
      },
      { status: 201 }
    );
 
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, 
      path: "/"
    });

    return response;

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}