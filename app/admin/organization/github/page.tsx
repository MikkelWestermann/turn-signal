'use client';

import { useState, Suspense } from 'react';
import { useTRPC } from '@/lib/client';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ExternalLink,
  Github,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

function GitHubOverviewPage() {
  const [isConnecting, setIsConnecting] = useState(false);

  const trpc = useTRPC();
  const searchParams = useSearchParams();

  const githubSetup = searchParams.get('github_setup');
  let setupMessage: any = null;
  if (githubSetup === 'success') {
    setupMessage = {
      type: 'success',
      message:
        'GitHub App successfully installed! Your repositories are now connected.',
    };
  } else if (githubSetup === 'complete') {
    setupMessage = {
      type: 'success',
      message: 'GitHub setup completed successfully.',
    };
  } else if (githubSetup === 'error') {
    setupMessage = {
      type: 'error',
      message:
        'Failed to complete GitHub setup. Please try again or contact support.',
    };
  }

  const {
    data: repositories,
    isLoading: repositoriesLoading,
    refetch: refetchRepositories,
  } = useQuery(trpc.github.getRepositories.queryOptions());

  const { data: installation } = useQuery(
    trpc.github.getInstallation.queryOptions(),
  );

  const { data: installationUrl } = useQuery(
    trpc.github.getInstallationUrl.queryOptions(),
  );

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">GitHub Integration</h1>
          <p className="text-muted-foreground">
            View repositories and issues for your organization.
          </p>
        </div>

        {setupMessage?.type && (
          <Alert
            variant={setupMessage.type === 'error' ? 'destructive' : 'default'}
          >
            {setupMessage.type === 'error' ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertDescription>{setupMessage.message}</AlertDescription>
          </Alert>
        )}

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
                  <h4 className="mb-2 font-medium">What you'll get:</h4>
                  <ul className="list-inside list-disc space-y-1">
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
                  {isConnecting ? 'Connecting...' : 'Connect GitHub App'}
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
                  Connected on{' '}
                  {new Date(installation.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <Link href={installationUrl || ''}>Manage GitHub App</Link>
                </Button>
              </CardContent>
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
                      className={`mr-2 h-4 w-4 ${
                        repositoriesLoading ? 'animate-spin' : ''
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
                        className="flex items-center justify-between rounded-lg border p-3"
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
                              href={`/admin/organization/github/${repo.full_name.split('/')[0]}/${
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
                  <p className="py-8 text-center text-muted-foreground">
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

export default function GitHubOverviewPageWrapper() {
  return (
    <Suspense fallback={null}>
      <GitHubOverviewPage />
    </Suspense>
  );
}
