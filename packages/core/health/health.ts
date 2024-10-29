import { z } from "zod";

export const healthRequestSchema = z.object({
  ping: z.string().min(1),
});

export const healthResponseSchema = z.object({
  pong: z.string().min(1),
});

export type THealthRequest = z.infer<typeof healthRequestSchema>;
export type THealthResponse = z.infer<typeof healthResponseSchema>;
