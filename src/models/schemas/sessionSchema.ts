import {z} from "zod";

const flagSchema = z.object({
    response_id: z.string(),
    reasons: z.array(z.string()),
    additional_comments: z.string().optional(),
    otherReason: z.string().optional(),
})

const eventSchema = z.object({
    name: z.string(),
    action: z.string(),
    time: z.string().datetime().optional(),
    data: z.object({}).optional(),
})

const knowledgeSchema = z.object({
    rank: z.number(),
    related_knowledge_id: z.string(),
    thumbs_type: z.enum(["good", "bad"]).optional(),
})

const ticketSchema = z.object({
    _id: z.string().optional(),
    ticket_id: z.string(),
    start_time: z.string().datetime(),
    end_time: z.string().datetime().optional(),
    flag_poor_responses: z.array(flagSchema),
    events: z.array(eventSchema),
    knowledge: z.array(knowledgeSchema)
})

const surveySchema = z.object({
    effectiveness: z.number(),
    efficiency: z.number(),
    satisfaction: z.number(),
    time: z.number(),
    additional_comments: z.string().optional(),
})

const sessionSchema = z.object({
    email: z.string().email(),
    startTime: z.string().datetime().optional(),
    end_time: z.string().datetime().optional(),
    survey: surveySchema.optional(),
    related_tickets: z.array(ticketSchema).optional(),
});

type SessionType = z.infer<typeof sessionSchema>;
type SurveyType = z.infer<typeof surveySchema>;
type RelatedTicketType = z.infer<typeof ticketSchema>;
type TicketEventType = z.infer<typeof eventSchema>;
type TicketFlagType = z.infer<typeof flagSchema>;
type KnowledgeType = z.infer<typeof knowledgeSchema>;

export {
    type SessionType,
    type RelatedTicketType,
    type SurveyType,
    type TicketEventType,
    type TicketFlagType,
    type KnowledgeType
};
