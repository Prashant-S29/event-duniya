import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_NEXTAUTH_SECRET: z.string().min(1),
  NEXT_PUBLIC_TEMPLATE_ID: z.string().min(1),
  NEXT_PUBLIC_SERVICE_ID: z.string().min(1),
  NEXT_PUBLIC_PUBLIC_KEY: z.string().min(1),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  NEXT_PUBLIC_TEMPLATE_ID: process.env.NEXT_PUBLIC_TEMPLATE_ID,
  NEXT_PUBLIC_SERVICE_ID: process.env.NEXT_PUBLIC_SERVICE_ID,
  NEXT_PUBLIC_PUBLIC_KEY: process.env.NEXT_PUBLIC_PUBLIC_KEY,
});
