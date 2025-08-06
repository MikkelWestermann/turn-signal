'use client';

import { authClient } from '@/auth/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Settings,
  LogOut,
  Loader2,
  Building2,
  Map,
  GitBranch,
  Plus,
  ExternalLink,
  TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
import { useTRPC } from '@/lib/client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { GitHubOnboarding } from '@/components/github-onboarding';

export default function AdminPage() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const { data: activeOrganization, isPending: isLoadingOrg } =
    authClient.useActiveOrganization();
  const trpc = useTRPC();

  const activeMember = activeOrganization?.members?.find(
    (member) => member.user?.id === session?.user?.id,
  );
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: roadmaps, isLoading: isLoadingRoadmaps } = useQuery(
    trpc.roadmap.getAll.queryOptions(),
  );

  const { data: githubInstallation, isLoading: isLoadingGithub } = useQuery(
    trpc.github.getInstallation.queryOptions(),
  );

  const { data: githubRepos, isLoading: isLoadingRepos } = useQuery(
    trpc.github.getRepositories.queryOptions(),
  );

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsSigningOut(false);
          refetch();
        },
        onError: () => {
          setIsSigningOut(false);
        },
      },
    });
  };

  if (isPending || isLoadingOrg) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Not Authenticated</CardTitle>
            <CardDescription className="text-center">
              You need to be signed in to access the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild>
              <a href="/login">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!activeOrganization) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              No Active Organization
            </CardTitle>
            <CardDescription className="text-center">
              Please select an organization to access the admin dashboard.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const totalRoadmaps = roadmaps?.length || 0;
  const totalRepos = githubRepos?.data?.total_count || 0;
  const connectedRepos =
    roadmaps?.reduce((acc: number, roadmap: any) => {
      return acc + (roadmap.repositories?.length || 0);
    }, 0) || 0;

  // Show onboarding if no GitHub installation
  if (!isLoadingGithub && !githubInstallation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {session.user.name || session.user.email}!
            </h1>
            <p className="text-muted-foreground">
              Managing {activeOrganization.name}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{activeMember?.role || 'Member'}</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              disabled={isSigningOut}
            >
              {isSigningOut && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <GitHubOnboarding />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {session.user.name || session.user.email}!
          </h1>
          <p className="text-muted-foreground">
            Managing {activeOrganization.name}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{activeMember?.role || 'Member'}</Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            {isSigningOut && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roadmaps</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRoadmaps}</div>
            <p className="text-xs text-muted-foreground">
              {isLoadingRoadmaps ? 'Loading...' : 'Active roadmaps'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GitHub Repos</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRepos}</div>
            <p className="text-xs text-muted-foreground">
              {isLoadingRepos ? 'Loading...' : 'Connected repositories'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedRepos}</div>
            <p className="text-xs text-muted-foreground">
              Repos linked to roadmaps
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Organization Members
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeOrganization.members?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  Roadmaps
                </CardTitle>
                <CardDescription>Manage your product roadmaps</CardDescription>
              </div>
              <Button asChild size="sm">
                <Link href="/admin/roadmaps/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Roadmap
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingRoadmaps ? (
              <div className="flex h-32 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : roadmaps && roadmaps.length > 0 ? (
              <div className="space-y-3">
                {roadmaps.slice(0, 5).map((roadmap) => (
                  <div
                    key={roadmap.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <h4 className="font-medium">{roadmap.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {roadmap.description || 'No description'}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {roadmap.tag}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/roadmaps/${roadmap.id}/edit`}>
                          <Settings className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/roadmap/${roadmap.slug}`}>
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
                {roadmaps.length > 5 && (
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/admin/roadmaps">
                      View all {roadmaps.length} roadmaps
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Map className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-medium">No roadmaps yet</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Create your first roadmap to start organizing your product
                  development.
                </p>
                <Button asChild>
                  <Link href="/admin/roadmaps/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Roadmap
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  GitHub Integration
                </CardTitle>
                <CardDescription>
                  Connected repositories and installations
                </CardDescription>
              </div>
              {!githubInstallation && (
                <Button asChild size="sm">
                  <Link href="/admin/organization/github">
                    <Plus className="mr-2 h-4 w-4" />
                    Connect GitHub
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingGithub ? (
              <div className="flex h-32 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : githubInstallation ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <h4 className="font-medium">GitHub App</h4>
                    <p className="text-sm text-muted-foreground">
                      Installation ID: {githubInstallation.installationId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Connected{' '}
                      {new Date(
                        githubInstallation.createdAt,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="secondary">Connected</Badge>
                </div>

                {isLoadingRepos ? (
                  <div className="flex h-16 items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : githubRepos && githubRepos.data.repositories.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Recent Repositories</h4>
                    {githubRepos.data.repositories.slice(0, 3).map((repo) => (
                      <div
                        key={repo.id}
                        className="flex items-center justify-between rounded border p-2 text-sm"
                      >
                        <div>
                          <span className="font-medium">{repo.full_name}</span>
                          <p className="text-xs text-muted-foreground">
                            {repo.private ? 'Private' : 'Public'}
                          </p>
                        </div>
                        <Button asChild variant="ghost" size="sm">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    ))}
                    {githubRepos.data.repositories.length > 3 && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Link href="/admin/organization/github">
                          View all {githubRepos.data.repositories.length}{' '}
                          repositories
                        </Link>
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="py-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      No repositories found in this installation.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center">
                <GitBranch className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-medium">GitHub not connected</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Connect your GitHub account to sync repositories and issues.
                </p>
                <Button asChild>
                  <Link href="/admin/organization/github">
                    <Plus className="mr-2 h-4 w-4" />
                    Connect GitHub
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Button asChild variant="outline" className="h-auto flex-col p-4">
              <Link href="/admin/roadmaps/new">
                <Map className="mb-2 h-6 w-6" />
                <span>Create Roadmap</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col p-4">
              <Link href="/admin/organization/github">
                <GitBranch className="mb-2 h-6 w-6" />
                <span>Manage GitHub</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col p-4">
              <Link href="/admin/members">
                <Users className="mb-2 h-6 w-6" />
                <span>Manage Members</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Organization Details
          </CardTitle>
          <CardDescription>
            Information about your current organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Organization Name
              </label>
              <p className="text-sm font-semibold">{activeOrganization.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Organization Slug
              </label>
              <p className="font-mono text-sm">{activeOrganization.slug}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Your Role
              </label>
              <p className="text-sm font-semibold capitalize">
                {activeMember?.role || 'Member'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Created
              </label>
              <p className="text-sm">
                {activeOrganization.createdAt
                  ? new Date(activeOrganization.createdAt).toLocaleDateString()
                  : 'Unknown'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
