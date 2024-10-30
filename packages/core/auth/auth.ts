import { z } from "zod";

export const authRequestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(7),
});

export type TAuthRequest = z.infer<typeof authRequestSchema>;
