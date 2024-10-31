import { z } from "zod";

export const fileIdRequestSchema = z.object({
  fileId: z.string().uuid(),
});

export const getFileByUserIdRequestSchema = z.object({
  userId: z.string().uuid(),
});

export const fileResponseSchema = z.object({
  id: z.string().uuid(),
  path: z.string().min(1),
  name: z.string().min(1),
  user_id: z.string().min(1),
  size: z.number(),
  lastUpdate: z.date(),
});

export const updateFileSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).optional(),
});

export const deleteFileSchema = z.object({
  id: z.string().uuid(),
});

export type TGetFileByIdRequest = z.infer<typeof fileIdRequestSchema>;
export type TGetFileByUserIdRequest = z.infer<
  typeof getFileByUserIdRequestSchema
>;
// export type TGetFileByIdResponse = z.infer<typeof getFileByIdResponseSchema>;
export type TFileResponse = z.infer<typeof fileResponseSchema>;

export type TUpdateFile = z.infer<typeof updateFileSchema>;
export type TDeleteFile = z.infer<typeof deleteFileSchema>;
