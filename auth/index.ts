import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { authConfig } from "./config";
import { getDb } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(await getDb(), {
    provider: "sqlite",
    usePlural: true,
  }),
  ...authConfig,
});
