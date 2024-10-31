import { z } from "zod";

export const getUserLimitRequestSchema = z.object({
  userId: z.string().min(1),
  file: z
    .custom<Express.Multer.File>(
      (val) => {
        return (
          typeof val === "object" &&
          val !== null &&
          "fieldname" in val &&
          "originalname" in val &&
          "encoding" in val &&
          "mimetype" in val &&
          "size" in val &&
          "stream" in val &&
          "destination" in val &&
          "filename" in val &&
          "path" in val &&
          "buffer" in val
        );
      },
      {
        message: "The file parameter must be a valid Multer file object.",
      },
    )
    .optional(),
});

export const getUserLimitResponseSchema = z.object({
  totalSize: z.number().min(1),
});

export type TGetUserLimitRequest = z.infer<typeof getUserLimitRequestSchema>;
export type TGetUserLimitResponse = z.infer<typeof getUserLimitResponseSchema>;
