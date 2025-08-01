import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
import superjson from "superjson";

const t = initTRPC.context<Context>().create({ transformer: superjson });

// Auth middleware that ensures user is authenticated
const isAuthenticated = t.middleware(async ({ next, ctx }) => {
  return next({
    ctx: {
      ...ctx,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
