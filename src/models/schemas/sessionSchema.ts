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

const ticketSchema = z.object({
    ticket_id: z.string(),
    start_time: z.string().datetime(),
    end_time: z.string().datetime().optional(),
    flag_poor_responses: z.array(flagSchema),
    events: z.array(eventSchema),
})

const surveySchema = z.object({
    easy_of_use: z.number(),
    usability: z.number(),
    enjoyment_of_use: z.number(),
    additional_comments: z.string().optional(),
})

const sessionSchema = z.object({
    email: z.string().email(),
    startTime: z.string().datetime().optional(),
    end_time: z.string().datetime().optional(),
    survey: surveySchema,
    related_tickets: z.array(ticketSchema),
});

type SessionType = z.infer<typeof sessionSchema>;
type SurveyType = z.infer<typeof surveySchema>;
type RelatedTicketType = z.infer<typeof ticketSchema>;
type TicketEventType = z.infer<typeof eventSchema>;
type TicketFlagType = z.infer<typeof flagSchema>;

export {
    type SessionType,
    type RelatedTicketType,
    type SurveyType,
    type TicketEventType,
    type TicketFlagType
};
