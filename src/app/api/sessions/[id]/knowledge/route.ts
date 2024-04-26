import connectDb from "@/lib/conncetDb";
import logger from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import {KnowledgeType, RelatedTicketType} from "@/models/schemas/sessionSchema";
import Session from "@/models/Session";

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    await connectDb();

    const sessionId = params.id;

    try {
        const res = (await request.json()) as KnowledgeType & {
            related_ticket_id: string // 非ticket data中的Id，而是ticket数据表自动生成的_id
        };

        const {
            rank,
            related_knowledge_id,
            thumbs_type,
            related_ticket_id
        } = res;

        const session = await Session.findById(sessionId);

        if (!session) {
            return NextResponse.json(
                { message: "Session not found" },
                { status: 404 }
            );
        }

        // 查找相关的ticket
        const ticket = session.related_tickets.find((item: RelatedTicketType & {_id: string}) => {
            console.log(item._id, related_ticket_id);
            return item._id.toString() === related_ticket_id;
        });
        if (!ticket) throw new Error('Ticket not found');

        const knowledgeIndex = ticket.knowledge.findIndex((k: KnowledgeType) => k.related_knowledge_id.toString() === related_knowledge_id);

        if (knowledgeIndex > -1) {
            ticket.knowledge[knowledgeIndex] = {
                rank,
                related_knowledge_id,
                thumbs_type
            };
        } else {
            ticket.knowledge.push({
                rank,
                related_knowledge_id,
                thumbs_type
            });
        }

        await session.save();

        return NextResponse.json(
            { message: "Successful" },
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
