import { z } from "zod";

const sessionSchema = z.object({
  email: z.string().email(),
  startTime: z.string().datetime().optional(),
});

type SessionType = z.infer<typeof sessionSchema>;

export { type SessionType };
