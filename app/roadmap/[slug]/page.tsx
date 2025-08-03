'use client';

import { useParams } from 'next/navigation';
import { useTRPC } from '@/lib/client';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { KanbanBoard } from '@/components/kanban-board';

export default function RoadmapPage() {
  const params = useParams();
  const slug = params.slug as string;

  const trpc = useTRPC();

  const {
    data: roadmap,
    isLoading,
    error,
    refetch,
  } = useQuery(trpc.roadmap.getRoadmap.queryOptions({ slug }));

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading roadmap...</p>
        </div>
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Roadmap Not Found</h1>
          <p className="mb-6 text-muted-foreground">
            The roadmap you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const totalIssues = roadmap.issues?.flat().length || 0;

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold">{roadmap.name}</h1>
                {roadmap.description && (
                  <p className="mt-2 text-xl text-muted-foreground">
                    {roadmap.description}
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => refetch()}
                disabled={isLoading}
              >
                <RefreshCw
                  className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
                />
                Refresh
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Label: {roadmap.tag}</Badge>
              <Badge variant="outline">Planned: {roadmap.plannedTag}</Badge>
              <Badge variant="outline">
                In Progress: {roadmap.inProgressTag}
              </Badge>
              <Badge variant="outline">Done: {roadmap.doneTag}</Badge>
              {totalIssues > 0 && (
                <Badge variant="default">{totalIssues} issues</Badge>
              )}
            </div>
          </div>
        </div>

        {roadmap.issues && roadmap.issues.length > 0 ? (
          <KanbanBoard roadmap={roadmap} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Issues Found</CardTitle>
              <CardDescription>
                GitHub issues with the "{roadmap.tag}" label will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-12 text-center">
                <div className="space-y-4">
                  <div className="text-6xl">🚀</div>
                  <h3 className="text-lg font-semibold">Coming Soon</h3>
                  <p className="mx-auto max-w-md text-muted-foreground">
                    This roadmap will display GitHub issues automatically. Add
                    the "{roadmap.tag}" label to your GitHub issues to see them
                    here.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="https://github.com" target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
