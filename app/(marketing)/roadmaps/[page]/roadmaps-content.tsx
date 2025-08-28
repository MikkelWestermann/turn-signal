'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Calendar, ArrowRight } from 'lucide-react';
import { BackgroundGrid } from '@/components/marketing/background-grid';

interface Roadmap {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  createdAt: Date;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface RoadmapsContentProps {
  roadmaps: Roadmap[];
  pagination: PaginationInfo;
  page: number;
}

export function RoadmapsContent({
  roadmaps,
  pagination,
  page,
}: RoadmapsContentProps) {
  return (
    <div className="min-h-screen bg-background">
      <BackgroundGrid />

      <section className="relative overflow-hidden bg-background pt-16 pb-12">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground lg:text-5xl">
              Discover Roadmaps
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground lg:text-xl">
              Explore public roadmaps from teams using Turn Signal to manage
              their product development. See what others are building and get
              inspired for your own roadmap.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/login">
                <Button size="lg">
                  Create Your Roadmap
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-4 pb-16 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roadmaps.map((roadmap) => (
            <Card
              key={roadmap.id}
              className="border border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {roadmap.name}
                    </CardTitle>
                    {roadmap.description && (
                      <CardDescription className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {roadmap.description}
                      </CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {new Date(roadmap.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <Link href={`/roadmap/${roadmap.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border/50"
                    >
                      View Roadmap
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {pagination.totalPages > 1 && (
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                {pagination.hasPrev && (
                  <PaginationItem>
                    <PaginationPrevious href={`/roadmaps/${page - 1}`} />
                  </PaginationItem>
                )}

                {(() => {
                  const maxVisiblePages = 5;
                  const pages = [];

                  if (pagination.totalPages <= maxVisiblePages) {
                    for (let i = 1; i <= pagination.totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    pages.push(1);

                    if (page <= 3) {
                      for (
                        let i = 2;
                        i <=
                        Math.min(
                          maxVisiblePages - 1,
                          pagination.totalPages - 1,
                        );
                        i++
                      ) {
                        pages.push(i);
                      }
                    } else if (page >= pagination.totalPages - 2) {
                      for (
                        let i = Math.max(
                          2,
                          pagination.totalPages - maxVisiblePages + 2,
                        );
                        i < pagination.totalPages;
                        i++
                      ) {
                        pages.push(i);
                      }
                    } else {
                      for (
                        let i = Math.max(2, page - 1);
                        i <= Math.min(page + 1, pagination.totalPages - 1);
                        i++
                      ) {
                        pages.push(i);
                      }
                    }

                    if (!pages.includes(pagination.totalPages)) {
                      pages.push(pagination.totalPages);
                    }
                  }

                  const result = [];
                  for (let i = 0; i < pages.length; i++) {
                    const pageNum = pages[i];

                    if (i > 0 && pages[i - 1] !== pageNum - 1) {
                      result.push(
                        <PaginationItem key={`ellipsis-${pageNum}`}>
                          <PaginationEllipsis />
                        </PaginationItem>,
                      );
                    }

                    result.push(
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href={`/roadmaps/${pageNum}`}
                          isActive={pageNum === page}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>,
                    );
                  }

                  return result;
                })()}

                {pagination.hasNext && (
                  <PaginationItem>
                    <PaginationNext href={`/roadmaps/${page + 1}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              Page {page} of {pagination.totalPages} • {pagination.total}{' '}
              roadmaps total
            </div>
          </div>
        )}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `Roadmaps - Page ${page}`,
            description:
              'Discover public roadmaps from teams using Turn Signal to manage their product development.',
            url: `https://turn-signal.co/roadmaps/${page}`,
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: pagination.total,
              itemListElement: roadmaps.map((roadmap, index) => ({
                '@type': 'ListItem',
                position: (page - 1) * 12 + index + 1,
                item: {
                  '@type': 'SoftwareApplication',
                  name: roadmap.name,
                  description: roadmap.description,
                  url: `https://turn-signal.co/roadmap/${roadmap.slug}`,
                  dateCreated: roadmap.createdAt,
                },
              })),
            },
          }),
        }}
      />
    </div>
  );
}
