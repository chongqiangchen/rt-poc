import connectDb from "@/lib/conncetDb";
import logger from "@/lib/logger";
import Session from "@/models/Session";
import {NextRequest, NextResponse} from "next/server";
import {SurveyType} from "@/models/schemas/sessionSchema";

export async function POST(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
    await connectDb();

    const sessionId = params.id;

    try {
        const res = (await request.json()) as SurveyType;

        const session = await Session.findById(sessionId);

        if (!session) {
            return NextResponse.json(
                {message: "Session not found"},
                {status: 404}
            );
        }

        const updatedSession = await Session.updateOne(
            {_id: sessionId},
            {
                $set: {
                    survey: res
                }
            }
        )

        return NextResponse.json(
            {message: "Survey submitted"},
            {status: 200}
        );
    } catch (error) {
        logger.error(error, "Failed to create session:");
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        );
    }
}
