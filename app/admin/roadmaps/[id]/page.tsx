"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useTRPC } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/auth/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ExternalLink,
  RefreshCw,
  Edit,
  Eye,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { KanbanBoard } from "@/components/kanban-board";
import { toast } from "sonner";

export default function RoadmapAdminPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: organization } = authClient.useActiveOrganization();
  const trpc = useTRPC();

  const [showAllIssues, setShowAllIssues] = useState(false);

  const {
    data: roadmap,
    isLoading,
    error,
    refetch,
  } = useQuery(
    trpc.roadmap.getById.queryOptions({
      id,
      organizationId: organization?.id || "",
    })
  );

  const {
    data: roadmapWithIssues,
    isLoading: isLoadingIssues,
    refetch: refetchIssues,
  } = useQuery(
    trpc.roadmap.getRoadmap.queryOptions({
      slug: roadmap?.slug || "",
    })
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading roadmap...</p>
        </div>
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Roadmap Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The roadmap you're looking for doesn't exist or you don't have
            access to it.
          </p>
          <Button asChild>
            <Link href="/admin/roadmaps">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Roadmaps
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const totalIssues = roadmapWithIssues?.issues?.length || 0;
  const plannedIssues =
    roadmapWithIssues?.issues?.filter((issue) =>
      issue.labels.some((label) =>
        typeof label === "string"
          ? label === roadmap.plannedTag
          : label.name === roadmap.plannedTag
      )
    ).length || 0;
  const inProgressIssues =
    roadmapWithIssues?.issues?.filter((issue) =>
      issue.labels.some((label) =>
        typeof label === "string"
          ? label === roadmap.inProgressTag
          : label.name === roadmap.inProgressTag
      )
    ).length || 0;
  const doneIssues =
    roadmapWithIssues?.issues?.filter((issue) =>
      issue.labels.some((label) =>
        typeof label === "string"
          ? label === roadmap.doneTag
          : label.name === roadmap.doneTag
      )
    ).length || 0;

  const totalVotes =
    roadmapWithIssues?.issues?.reduce(
      (sum, issue) => sum + (issue.voteCount || 0),
      0
    ) || 0;
  const averageVotes =
    totalIssues > 0 ? Math.round((totalVotes / totalIssues) * 10) / 10 : 0;
  const mostVotedIssue = roadmapWithIssues?.issues?.reduce((max, issue) =>
    (issue.voteCount || 0) > (max?.voteCount || 0) ? issue : max
  );

  const handleRefresh = () => {
    refetch();
    refetchIssues();
    toast.success("Roadmap data refreshed");
  };

  const handleEdit = () => {
    router.push(`/admin/roadmaps/${id}/edit`);
  };

  const handleViewPublic = () => {
    router.push(`/roadmap/${roadmap.slug}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/admin/roadmaps">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Roadmaps
            </Link>
          </Button>

          <div className="flex items-start justify-between space-y-2">
            <div>
              <h1 className="text-3xl font-bold">{roadmap.name}</h1>
              {roadmap.description && (
                <p className="text-muted-foreground mt-1">
                  {roadmap.description}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isLoading || isLoadingIssues}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${
                    isLoading || isLoadingIssues ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </Button>
              <Button variant="outline" onClick={handleViewPublic}>
                <Eye className="w-4 h-4 mr-2" />
                View Public
              </Button>
              <Button onClick={handleEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{totalIssues} total issues</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{plannedIssues} planned</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{inProgressIssues} in progress</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{doneIssues} completed</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">{totalVotes} total votes</Badge>
              </div>
            </div>
          </div>
        </div>

        {roadmapWithIssues &&
          roadmapWithIssues.issues &&
          roadmapWithIssues.issues.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Most Voted Issues</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Total votes: {totalVotes}</span>
                  <span>Avg per issue: {averageVotes}</span>
                  {mostVotedIssue && (
                    <span>
                      Top issue: {mostVotedIssue.voteCount || 0} votes
                    </span>
                  )}
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {roadmapWithIssues.issues
                      .sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
                      .slice(0, showAllIssues ? undefined : 3)
                      .map((issue, index) => (
                        <div
                          key={issue.id}
                          className="p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge
                                  variant="secondary"
                                  className="flex-shrink-0"
                                >
                                  #{index + 1}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="flex-shrink-0"
                                >
                                  {issue.voteCount || 0} votes
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  #{issue.number} • {issue.state}
                                </span>
                              </div>
                              <h3 className="font-medium text-sm mb-2 line-clamp-2">
                                {issue.title}
                              </h3>
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="w-fit"
                              >
                                <Link href={issue.html_url} target="_blank">
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  View on GitHub
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {roadmapWithIssues.issues.length > 3 && (
                    <div className="p-4 border-t">
                      <Button
                        variant="outline"
                        onClick={() => setShowAllIssues(!showAllIssues)}
                        className="w-full"
                      >
                        {showAllIssues
                          ? "Show Less"
                          : `Show ${
                              roadmapWithIssues.issues.length - 3
                            } More Issues`}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Roadmap Configuration
              </CardTitle>
              <CardDescription>
                Current settings and configuration for this roadmap
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Primary Label
                  </label>
                  <p className="text-sm">{roadmap.tag}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Slug
                  </label>
                  <p className="text-sm">{roadmap.slug}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Planned Label
                  </label>
                  <p className="text-sm">{roadmap.plannedTag || "Not set"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    In Progress Label
                  </label>
                  <p className="text-sm">
                    {roadmap.inProgressTag || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Done Label
                  </label>
                  <p className="text-sm">{roadmap.doneTag || "Not set"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Created
                  </label>
                  <p className="text-sm">
                    {new Date(roadmap.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Kanban Board Preview</h2>
            <p className="text-sm text-muted-foreground">
              Live preview of how your roadmap appears to users
            </p>
          </div>

          {roadmapWithIssues &&
          roadmapWithIssues.issues &&
          roadmapWithIssues.issues.length > 0 ? (
            <div className="border rounded-lg p-4 bg-muted/20">
              <KanbanBoard roadmap={roadmapWithIssues} />
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Issues Found</CardTitle>
                <CardDescription>
                  GitHub issues with the "{roadmap.tag}" label will appear here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="space-y-4">
                    <div className="text-6xl">🚀</div>
                    <h3 className="text-lg font-semibold">Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      This roadmap will display GitHub issues automatically. Add
                      the "{roadmap.tag}" label to your GitHub issues to see
                      them here.
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="https://github.com" target="_blank">
                        <ExternalLink className="w-4 h-4 mr-2" />
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
    </div>
  );
}
