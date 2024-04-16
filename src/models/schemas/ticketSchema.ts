import { z } from "zod";

const responseZodSchema = z.object({
  _id: z.string(),
  answer: z.string(),
});

const knowledgeZodSchema = z.object({
  _id: z.string(),
  rank: z.number(),
  source: z.string(),
  content: z.string(),
  metadata: z
    .object({
      title: z.string().optional(),
      category: z.string().optional(),
      link: z.string().optional(),
    })
    .optional(),
});

const ticketSchema = z.object({
  _id: z.string(),
  ticket_id: z.string(),
  group: z.string(),
  ticket_content: z.object({
    ticket_title: z.string(),
    ticket_description: z.string(),
    previous_response: z.string().optional(),
  }),
  response: z.array(responseZodSchema),
  related_knowledge: z.array(knowledgeZodSchema),
});

type TicketType = z.infer<typeof ticketSchema>;

export { type TicketType };
