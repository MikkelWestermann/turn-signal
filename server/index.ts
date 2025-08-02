import { router } from "./trpc";
import { demoRouter } from "./routers/demo";
import { githubRouter } from "./routers/github";

export const appRouter = router({
  demo: demoRouter,
  github: githubRouter,
});

export type AppRouter = typeof appRouter;
