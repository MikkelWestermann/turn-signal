import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { authConfig } from "./config";

export const auth = betterAuth({
  database: drizzleAdapter(process.env.DATABASE as any, {
    provider: "sqlite",
    usePlural: true,
    debugLogs: true,
  }),
  ...authConfig,
});
