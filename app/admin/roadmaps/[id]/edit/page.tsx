'use client';

import React from 'react';
import { RoadmapForm } from '../../_components/roadmap-form';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/lib/client';
import { Loader2 } from 'lucide-react';

interface EditRoadmapPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditRoadmapPage({ params }: EditRoadmapPageProps) {
  const { id } = React.use(params);
  const trpc = useTRPC();

  const { data: roadmap, isLoading } = useQuery(
    trpc.roadmap.getById.queryOptions({
      id,
    }),
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="mx-auto max-w-2xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="container mx-auto py-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center text-muted-foreground">
            Roadmap not found
          </div>
        </div>
      </div>
    );
  }

  return <RoadmapForm mode="edit" roadmap={roadmap} />;
}
