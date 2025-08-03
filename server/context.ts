import * as trpcFetch from '@trpc/server/adapters/fetch';
import { auth } from '../auth';

export async function createContext(
  opts: trpcFetch.FetchCreateContextFnOptions,
) {
  const session = await auth.api.getSession(opts.req);

  let activeOrganizationId = null;
  if (session) {
    // TODO: Fix this - the type is broken for some reason
    // @ts-expect-error
    activeOrganizationId = session.session.activeOrganizationId as
      | string
      | null;
  }

  return {
    session,
    user: session?.user || null,
    activeOrganizationId,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
