import { router } from "./trpc";
import { githubRouter } from "./routers/github";
import { roadmapRouter } from "./routers/roadmap";

export const appRouter = router({
  github: githubRouter,
  roadmap: roadmapRouter,
});

export type AppRouter = typeof appRouter;
