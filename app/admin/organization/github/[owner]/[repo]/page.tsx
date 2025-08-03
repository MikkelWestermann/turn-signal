'use client';

import { RepositoryIssues } from '@/components/repository-issues';
import { useParams } from 'next/navigation';

export default function RepositoryIssuesPage() {
  const { owner, repo } = useParams();

  return (
    <div className="container mx-auto py-8">
      <RepositoryIssues owner={owner as string} repo={repo as string} />
    </div>
  );
}
