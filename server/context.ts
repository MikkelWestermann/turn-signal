import * as trpcFetch from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

export async function createContext(
  opts: trpcFetch.FetchCreateContextFnOptions
) {
  // TODO: Add session
  return {};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
