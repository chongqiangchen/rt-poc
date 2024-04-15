import { z } from "zod";

const relatedKnowledgeSchema = z.object({
  id: z.number(),
  title: z.string(),
  link: z.string(),
  content: z.string(),
  source: z.string(),
});

const generatedResponseSchema = z.object({
  id: z.number(),
  content: z.string(),
});

const ticketSchema = z.object({
  id: z.number().nonnegative(),
  title: z.string(),
  content: z.string(),
  relatedKnowledge: z.array(relatedKnowledgeSchema),
  generatedResponses: z.array(generatedResponseSchema),
});

type TicketType = z.infer<typeof ticketSchema>;

export { type TicketType };
