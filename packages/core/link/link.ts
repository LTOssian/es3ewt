import { z } from "zod";

export const linkIdRequestSchema = z.object({
  linkId: z.string().uuid(),
});
