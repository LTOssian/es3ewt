import { z } from "zod";

export const getFileByIdRequestSchema = z.object({
  fileId: z.string().min(1),
});

export const getFileByUserIdRequestSchema = z.object({
  userId: z.number(),
});

export const fileResponseSchema = z.object({
  id: z.string().min(1),
  path: z.string().min(1),
  name: z.string().min(1),
  user_id: z.string().min(1),
  size: z.number(),
  lastUpdate: z.date(),
});

export type TGetFileByIdRequest = z.infer<typeof getFileByIdRequestSchema>;
// export type TGetFileByIdResponse = z.infer<typeof getFileByIdResponseSchema>;
export type TFileResponse = z.infer<typeof fileResponseSchema>;