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
    const { endTime, newTicket, currentTicket } = (await request.json()) as {
      endTime: Date;
      newTicket: { ticket_id: string; start_time: Date };
      currentTicket: { ticket_id: string; end_time: Date };
    };

    console.log("endTime", endTime)
    console.log("newTicket", newTicket)
    console.log("currentTicket", currentTicket)

    // update exited flag-poor-response end_time
    if (currentTicket) {
      await Session.updateOne(
        { _id: id, "related_tickets._id": currentTicket.ticket_id },
        {
          $set: { "related_tickets.$.end_time": currentTicket.end_time },
        }
      );
    }

    // update session or create a flag-poor-response with start time
    const updatedSession = await Session.updateOne(
      { _id: id },
      {
        ...(endTime && { $set: { end_time: endTime } }),
        ...(newTicket && { $push: { related_tickets: newTicket } }),
      },
      { new: true }
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

    // flag-poor-response with newly created flag-poor-response id, then we could use this id to update the corresponding flag-poor-response
    const session = await Session.findById(id);
    if (session) {
      const newlyAddedTicket =
          session.related_tickets ? session.related_tickets[session.related_tickets.length - 1] : [];

      if (newlyAddedTicket && newlyAddedTicket._id) {
        return new Response(
          JSON.stringify({ relatedTicketId: newlyAddedTicket._id }),
          {
            status: 200,
          }
        );
      }
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

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    await connectDb();

    const { id } = params;
    try {
        const session = await Session.findById(id);
        if (!session) {
            return NextResponse.json({ message: "Session not found" }, { status: 404 });
        }

        return NextResponse.json(session, { status: 200 });
    } catch (error) {
        logger.error(error, "Failed to fetch session:");
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
