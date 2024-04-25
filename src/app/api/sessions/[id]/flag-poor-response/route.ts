import connectDb from "@/lib/conncetDb";
import logger from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import {TicketFlagType} from "@/models/schemas/sessionSchema";
import Session from "@/models/Session";

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    await connectDb();

    const sessionId = params.id;

    try {
        const res = (await request.json()) as TicketFlagType & {
            related_ticket_id: string // 非ticket data中的Id，而是ticket数据表自动生成的_id
        };

        const {
            response_id,
            reasons,
            additional_comments,
            otherReason,
            related_ticket_id
        } = res;

        const session = await Session.findById(sessionId);

        if (!session) {
            return NextResponse.json(
                { message: "Session not found" },
                { status: 404 }
            );
        }

        const newFlagPoorResponse = {
            response_id,
            reasons,
            otherReason,
            additional_comments,
        }

        await Session.updateOne(
            { _id: sessionId, "related_tickets._id": related_ticket_id },
            {
                $push: { "related_tickets.$.flag_poor_responses": newFlagPoorResponse }
            }
        )

        return NextResponse.json(
            { message: "Flag-poor-response submitted" },
            { status: 200 }
        )
    } catch (error) {
        logger.error(error, "Failed to create session:");
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
