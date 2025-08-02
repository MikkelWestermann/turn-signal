"use client";

import { useState } from "react";
import { useTRPC } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, RefreshCw } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/auth/client";

export default function GitHubOverviewPage() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const trpc = useTRPC();

  // Get repositories for selected organization
  const {
    data: repositories,
    isLoading: repositoriesLoading,
    refetch: refetchRepositories,
  } = useQuery(
    trpc.github.getRepositories.queryOptions({
      organizationId: activeOrganization!.id,
    })
  );

  const { data: installation } = useQuery(
    trpc.github.getInstallation.queryOptions({
      organizationId: activeOrganization!.id,
    })
  );

  const { data: installationUrl } = useQuery(
    trpc.github.getInstallationUrl.queryOptions(
      {
        organizationId: activeOrganization!.id,
      },
      {
        enabled: !installation,
      }
    )
  );

  if (!activeOrganization) {
    return (
      <div className="container mx-auto py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">GitHub Integration</h1>
            <p className="text-muted-foreground">
              Select an organization to view its GitHub repositories and issues.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Select Organization</CardTitle>
              <CardDescription>
                Choose an organization to view its GitHub integration status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Organization selection component will be implemented here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">GitHub Integration</h1>
          <p className="text-muted-foreground">
            View repositories and issues for your organization.
          </p>
        </div>

        {!installation ? (
          <Card>
            <CardHeader>
              <CardTitle>Connect GitHub</CardTitle>
              <CardDescription>
                Connect your organization to GitHub to access repositories and
                issues in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="text-sm text-muted-foreground">
                  <h4 className="font-medium mb-2">What you'll get:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Real-time access to repository issues</li>
                    <li>Always up-to-date repository lists</li>
                    <li>Fine-grained repository permissions</li>
                    <li>Secure token-based authentication</li>
                  </ul>
                </div>
                <Button
                  onClick={() => {
                    if (!installationUrl) return;
                    setIsConnecting(true);
                    window.location.href = installationUrl;
                  }}
                  disabled={isConnecting || !installationUrl}
                  className="w-fit"
                >
                  {isConnecting ? "Connecting..." : "Connect GitHub App"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Github className="h-5 w-5 text-green-500" />
                    <CardTitle>GitHub Connected</CardTitle>
                  </div>
                  <Badge variant="secondary">
                    Installation ID: {installation.installationId}
                  </Badge>
                </div>
                <CardDescription>
                  Connected on{" "}
                  {new Date(installation.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Connected Repositories</CardTitle>
                    <CardDescription>
                      Always shows the latest repositories from GitHub
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => refetchRepositories()}
                    disabled={repositoriesLoading}
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${
                        repositoriesLoading ? "animate-spin" : ""
                      }`}
                    />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {repositoriesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-muted-foreground">
                      Loading repositories...
                    </div>
                  </div>
                ) : repositories &&
                  repositories.data.repositories.length > 0 ? (
                  <div className="space-y-2">
                    {repositories.data.repositories.map((repo) => (
                      <div
                        key={repo.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div>
                            <h4 className="font-medium">{repo.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {repo.full_name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {repo.private && (
                            <Badge variant="secondary" className="text-xs">
                              Private
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {repo.open_issues_count} issues
                          </Badge>
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              href={`/admin/organization/github/${repo.full_name.split("/")[0]}/${
                                repo.name
                              }`}
                            >
                              View Issues
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No repositories available. Make sure to grant repository
                    access during installation.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
