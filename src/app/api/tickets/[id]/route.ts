import connectDb from "@/lib/conncetDb";
import logger from "@/lib/logger";
import Ticket from "@/models/Ticket";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDb();

  const { id } = params;
  try {
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    logger.error(error, "Failed to retrieve ticket:");
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
