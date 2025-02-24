import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(_: unknown, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });

    await connectToDatabase();

    const { id } = params;
    const video = await Video.findOne({ _id: id });

    if (!video)
      return NextResponse.json(
        { message: "Video not found!" },
        { status: 404 },
      );

    return NextResponse.json(
      { video, message: "Successfully fetched the video!" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error, "Failed to fetch the video!");

    return NextResponse.json(
      { error, message: "Failed to fetch the video!" },
      { status: 500 },
    );
  }
}
