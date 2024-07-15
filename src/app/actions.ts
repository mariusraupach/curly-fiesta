"use server";

import { z } from "zod";

import { userSchema } from "./schema";

export async function onSubmit(value: z.infer<typeof userSchema>) {
  const parsed = userSchema.safeParse(value);

  if (!parsed) return;

  console.log(value);
}
