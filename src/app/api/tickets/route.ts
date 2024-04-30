import connectDb from "@/lib/conncetDb";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";
import ticketsData from "../../../data/ticket_results_v6.json";
import logger from "@/lib/logger";

export async function POST() {
  await connectDb();

  try {
    const existingCount = await Ticket.countDocuments();

    if (existingCount === 0) {
      const modifiedTicketsData = ticketsData.map((ticket) => ({
        ...ticket,
        _id: ticket.ticket_id,
      }));
      await Ticket.insertMany(modifiedTicketsData);
      logger.info("Tickets loaded into database");
      return NextResponse.json({ message: "Tickets loaded" }, { status: 200 });
    } else {
      logger.info("Tickets already loaded");
      return NextResponse.json(
        { message: "Tickets already loaded" },
        { status: 200 }
      );
    }
  } catch (error) {
    logger.error("Failed to load tickets", { error });
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDb();

  try {
    const tickets = await Ticket.find({});
    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    logger.error("Failed to fetch tickets", { error });
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
