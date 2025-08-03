"use client";

import { RepositoryIssues } from "@/components/repository-issues";
import { authClient } from "@/auth/client";
import { useParams } from "next/navigation";

export default function RepositoryIssuesPage() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const { owner, repo } = useParams();

  return (
    <div className="container mx-auto py-8">
      <RepositoryIssues
        organizationId={activeOrganization!.id}
        owner={owner as string}
        repo={repo as string}
      />
    </div>
  );
}
