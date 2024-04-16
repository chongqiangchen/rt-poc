import connectDb from "@/lib/conncetDb";
import logger from "@/lib/logger";
import Session from "@/models/Session";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDb();

  const { id } = params;
  try {
    const { endTime } = (await request.json()) as { endTime: Date };

    const updatedSession = await Session.updateOne(
      { _id: id },
      { end_time: endTime, new: true }
    );

    if (updatedSession.matchedCount === 0) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }
    if (updatedSession.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Session modification failed" },
        { status: 400 }
      );
    }

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    logger.error(error, "Failed to update session:");
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
