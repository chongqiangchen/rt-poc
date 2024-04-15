import connectDb from "@/lib/conncetDb";
import logger from "@/lib/logger";
import Session from "@/models/Session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDb();

  try {
    const res = (await request.json()) as { email: string };
    const { email } = res;

    const session = new Session({ email });
    await session.save();

    return NextResponse.json({ sessionId: session._id }, { status: 201 });
  } catch (error) {
    logger.error(error, "Failed to create session:");
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
