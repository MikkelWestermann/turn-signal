import 'server-only';

import { appRouter } from '@/server';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { getQueryClient } from '@/components/get-query-client';

export const publicTrpc = createTRPCOptionsProxy({
  ctx: {
    session: null,
    user: null,
    activeOrganizationId: null,
  },
  router: appRouter,
  queryClient: getQueryClient,
});
