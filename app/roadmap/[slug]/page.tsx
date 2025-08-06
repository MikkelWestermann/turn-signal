import { publicTrpc } from '@/lib/trpc-server';
import { getQueryClient } from '@/components/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ClientRoadmap } from './client-roadmap';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const queryClient = getQueryClient();

  try {
    // Fetch the roadmap data for metadata
    const roadmap = await queryClient.fetchQuery(
      publicTrpc.roadmap.getRoadmap.queryOptions({ slug }),
    );

    const title = `${roadmap.name} - Roadmap`;
    const description =
      roadmap.description || `View the roadmap for ${roadmap.name}`;
    const organizationName = roadmap.organization?.name || 'Organization';

    return {
      title,
      description,
      keywords: [
        'roadmap',
        'product roadmap',
        'feature roadmap',
        roadmap.name.toLowerCase(),
        organizationName.toLowerCase(),
        'turn signal',
        'project management',
        'feature planning',
      ],
      openGraph: {
        title,
        description,
        type: 'website',
        siteName: 'Turn Signal',
        url: `/roadmap/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  } catch (error) {
    // Fallback metadata if roadmap not found
    return {
      title: 'Roadmap Not Found',
      description: 'The requested roadmap could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const queryClient = getQueryClient();

  // Prefetch the roadmap data on the server
  await queryClient.prefetchQuery(
    publicTrpc.roadmap.getRoadmap.queryOptions({ slug }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientRoadmap />
    </HydrationBoundary>
  );
}
