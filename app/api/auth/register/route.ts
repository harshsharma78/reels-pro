import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json(
        { error: "Email and password are required!" },
        { status: 400 },
      );

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return NextResponse.json(
        { error: "Email is already registered!" },
        { status: 400 },
      );

    const user = await User.create({ email, password });

    return NextResponse.json(
      { data: user, message: "User created successfully!" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error, message: "Failed to register a user!" },
      { status: 500 },
    );
  }
}
