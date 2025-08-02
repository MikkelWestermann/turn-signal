import { router } from "./trpc";
import { demoRouter } from "./routers/demo";
import { githubRouter } from "./routers/github";
import { roadmapRouter } from "./routers/roadmap";

export const appRouter = router({
  demo: demoRouter,
  github: githubRouter,
  roadmap: roadmapRouter,
});

export type AppRouter = typeof appRouter;
