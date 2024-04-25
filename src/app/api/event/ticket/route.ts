
import connectDb from "@/lib/conncetDb";
import {NextRequest, NextResponse} from "next/server";
import logger from "@/lib/logger";
import {TicketEventType} from "@/models/schemas/sessionSchema";
import Session from "@/models/Session";

export async function POST(
    request: NextRequest,
) {
    await connectDb();

    try {
        const res = (await request.json()) as TicketEventType & {
            session_id: string;
            related_ticket_id: string;
        };

        const session = await Session.findById(res.session_id);

        if (!session) {
            return NextResponse.json(
                {message: "Session not found"},
                {status: 404}
            )
        }

        const newEvent: TicketEventType = {
            name: res.name,
            action: res.action,
            time: Date.now().toString(),
            data: res.data
        }

        await Session.updateOne(
            { _id: res.session_id, "related_tickets._id": res.related_ticket_id },
            {
                $push: { "related_tickets.$.events": newEvent }
            }
        )

        return NextResponse.json(
            { message: "Flag-poor-response submitted" },
            { status: 200 }
        )

    } catch (error) {
        logger.error("Failed to load tickets", { error });
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
