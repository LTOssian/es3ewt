import { z } from "zod";

export const authRequestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(7),
});

export const loginResponseSchema = z.object({
  token: z.string().length(32),
  message: z.string(),
});

export type TAuthRequest = z.infer<typeof authRequestSchema>;
export type TLoginResponse = z.infer<typeof loginResponseSchema>;
