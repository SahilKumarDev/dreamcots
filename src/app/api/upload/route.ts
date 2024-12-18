import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/database/connectDB";
import Image from "@/models/image-model";

interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
  format: string;
  bytes?: number;
  created_at?: string;
  resource_type?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cloudinaryResponse = (await uploadToCloudinary(
      buffer
    )) as CloudinaryResponse;

    if (
      !cloudinaryResponse ||
      !cloudinaryResponse.public_id ||
      !cloudinaryResponse.secure_url
    ) {
      throw new Error("Invalid Cloudinary response");
    }

    await connectDB();
    await Image.create({
      publicId: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
      format: cloudinaryResponse.format,
    });

    return NextResponse.json({
      message: "Upload successful",
      url: cloudinaryResponse.secure_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
