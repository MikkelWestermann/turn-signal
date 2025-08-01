import { router } from "./trpc";
import { demoRouter } from "./routers/demo";

export const appRouter = router({
  demo: demoRouter,
});

export type AppRouter = typeof appRouter;
