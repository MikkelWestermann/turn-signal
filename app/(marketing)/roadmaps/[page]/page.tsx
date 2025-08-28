import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getQueryClient } from '@/components/get-query-client';
import { publicTrpc } from '@/lib/trpc-server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { RoadmapsContent } from './roadmaps-content';

interface RoadmapsPageProps {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({
  params,
}: RoadmapsPageProps): Promise<Metadata> {
  const { page } = await params;
  const pageNum = parseInt(page);

  return {
    title:
      pageNum > 1
        ? `Roadmaps - Page ${pageNum} | Turn Signal`
        : 'Roadmaps | Turn Signal',
    description:
      'Discover public roadmaps from teams using Turn Signal to manage their product development.',
    openGraph: {
      title:
        pageNum > 1
          ? `Roadmaps - Page ${pageNum} | Turn Signal`
          : 'Roadmaps | Turn Signal',
      description:
        'Discover public roadmaps from teams using Turn Signal to manage their product development.',
      type: 'website',
    },
    alternates: {
      canonical: pageNum === 1 ? '/roadmaps' : `/roadmaps/${pageNum}`,
    },
  };
}

export default async function RoadmapsPage({ params }: RoadmapsPageProps) {
  const { page } = await params;
  const pageNum = parseInt(page);

  if (pageNum < 1 || isNaN(pageNum) || pageNum > 1000) {
    notFound();
  }

  const queryClient = getQueryClient();

  try {
    // Fetch the roadmaps data on the server
    const roadmapsData = await queryClient.fetchQuery(
      publicTrpc.roadmap.getAllPublic.queryOptions({
        page: pageNum,
        limit: 12,
      }),
    );

    const { roadmaps, pagination } = roadmapsData;

    if (pageNum > pagination.totalPages && pagination.totalPages > 0) {
      notFound();
    }

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RoadmapsContent
          roadmaps={roadmaps}
          pagination={pagination}
          page={pageNum}
        />
      </HydrationBoundary>
    );
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Error loading roadmaps
          </h1>
          <p className="mb-6 text-muted-foreground">
            Something went wrong while loading the roadmaps. Please try again
            later.
          </p>
          <Link href="/roadmaps">
            <Button>Try Again</Button>
          </Link>
        </div>
      </div>
    );
  }
}
