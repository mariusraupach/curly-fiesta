import { z } from "zod";

export type User = {
  email: string;
};

export const userSchema = z.object({
  email: z.string().email(),
});
