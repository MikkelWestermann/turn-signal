"use client";

import { RepositoryIssues } from "@/components/repository-issues";
import { authClient } from "@/auth/client";
import { useParams } from "next/navigation";

export default function RepositoryIssuesPage() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const { owner, repo } = useParams();

  if (!activeOrganization) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Organization Required</h1>
          <p className="text-muted-foreground">
            Please select an organization to view repository issues.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <RepositoryIssues
        organizationId={activeOrganization.id}
        owner={owner as string}
        repo={repo as string}
      />
    </div>
  );
}
