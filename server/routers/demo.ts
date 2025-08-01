import { router, protectedProcedure } from "../trpc";

export const demoRouter = router({
  demo: protectedProcedure.query(async () => {
    return {
      message: "Hello, world!",
    };
  }),
});
