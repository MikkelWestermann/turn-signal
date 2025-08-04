import { getCloudflareContext } from '@opennextjs/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export async function getDb() {
  // Retrieves Cloudflare-specific context, including environment variables and bindings
  const { env } = await getCloudflareContext({ async: true });

  return drizzle(env.DB, {
    schema,
    logger: true,
  });
}
