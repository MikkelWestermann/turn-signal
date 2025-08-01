import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query';
import { TRPCClientError } from '@trpc/client';

const retry = (failureCount: number, error: unknown) => {
  if (!(error instanceof TRPCClientError)) {
    return false;
  }

  const retryableCodes = new Set([
    'BAD_REQUEST',
    'TIMEOUT',
    'INTERNAL_SERVER_ERROR',
    'TOO_MANY_REQUESTS',
  ]);

  if (!retryableCodes.has(error.data.code)) {
    return false;
  }

  return failureCount < 3;
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
