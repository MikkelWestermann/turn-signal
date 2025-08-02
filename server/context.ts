import * as trpcFetch from "@trpc/server/adapters/fetch";
import { auth } from "../auth";

export async function createContext(
  opts: trpcFetch.FetchCreateContextFnOptions
) {
  const session = await auth.api.getSession(opts.req);

  return {
    session,
    user: session?.user || null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
