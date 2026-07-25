import { z } from "zod";

const booleanString = z
  .string()
  .optional()
  .transform((value) => value === "true");

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  ALLOWED_ORIGINS: z.string().default("http://localhost:3000"),
  ADMIN_API_KEY: z.string().min(16),
  CONTACT_WEBHOOK_URL: z.string().url().optional().or(z.literal("")),
  TRUST_PROXY: booleanString,
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment configuration");
}

export const env = {
  ...parsed.data,
  allowedOrigins: parsed.data.ALLOWED_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};
