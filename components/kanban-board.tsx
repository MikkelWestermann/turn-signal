'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  User,
  Calendar,
  MessageSquare,
  ThumbsUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useVotes, type Vote } from '@/hooks/use-votes';
import { useTRPC } from '@/lib/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface Issue {
  id: number;
  number: number;
  title: string;
  body?: string | null;
  state: string;
  html_url?: string;
  created_at: string;
  updated_at: string;
  assignees?: Array<{ login: string; avatar_url: string }> | null;
  labels: Array<string | { name?: string; color?: string | null; id?: number }>;
  comments?: number;
  voteCount?: number;
  [key: string]: any; // Allow additional GitHub API fields
}

interface KanbanBoardProps {
  roadmap: {
    id: string;
    organizationId: string;
    plannedTag: string | null;
    inProgressTag: string | null;
    doneTag: string | null;
    timestamp: number;
    issues: Issue[];
  };
}

function categorizeIssues(
  issues: Issue[],
  roadmap: KanbanBoardProps['roadmap'],
) {
  const planned: Issue[] = [];
  const inProgress: Issue[] = [];
  const done: Issue[] = [];

  issues.forEach((issue) => {
    const labelNames = issue.labels.map((label) =>
      typeof label === 'string' ? label : label.name,
    );

    if (roadmap.doneTag && labelNames.includes(roadmap.doneTag)) {
      done.push(issue);
    } else if (
      roadmap.inProgressTag &&
      labelNames.includes(roadmap.inProgressTag)
    ) {
      inProgress.push(issue);
    } else if (roadmap.plannedTag && labelNames.includes(roadmap.plannedTag)) {
      planned.push(issue);
    } else {
      // If no specific status label, put in planned
      planned.push(issue);
    }
  });

  return { planned, inProgress, done };
}

function IssueCard({
  issue,
  roadmapId,
  organizationId,
  vote,
  addVote,
  removeVote,
  timestamp,
}: {
  issue: Issue;
  roadmapId: string;
  organizationId: string;
  vote: Vote | null;
  addVote: (issueId: string, voteId: string) => void;
  removeVote: (issueId: string) => void;
  timestamp: number;
}) {
  const trpc = useTRPC();

  const createVoteMutation = useMutation(
    trpc.roadmap.createVote.mutationOptions({
      onSuccess: (data) => {
        addVote(issue.id.toString(), data.id);
        toast.success('Vote recorded!');
      },
      onError: (error) => {
        toast.error('Failed to record vote. Please try again.');
        console.error('Vote error:', error);
      },
    }),
  );

  const deleteVoteMutation = useMutation(
    trpc.roadmap.deleteVote.mutationOptions({
      onSuccess: () => {
        removeVote(issue.id.toString());
        toast.success('Vote removed!');
      },
      onError: (error) => {
        toast.error('Failed to remove vote. Please try again.');
        console.error('Vote error:', error);
        // Remove the vote from the cache
        removeVote(issue.id.toString());
      },
    }),
  );

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    const issueId = issue.id.toString();

    if (vote) {
      deleteVoteMutation.mutate({
        voteId: vote.id,
      });
    } else {
      createVoteMutation.mutate({
        roadmapId,
        issueId,
        organizationId,
      });
    }
  };

  const userHasVoted = !!vote;
  const isLoading =
    createVoteMutation.isPending || deleteVoteMutation.isPending;

  const voteCount =
    (issue.voteCount || 0) + (vote && vote.timestamp > timestamp ? 1 : 0);

  return (
    <Card className="mb-3 cursor-pointer border-border transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h4 className="line-clamp-2 text-sm leading-tight font-medium text-foreground">
                #{issue.number} {issue.title}
              </h4>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant={userHasVoted ? 'default' : 'ghost'}
                size="sm"
                onClick={handleVote}
                disabled={isLoading}
                className="flex-shrink-0"
              >
                <ThumbsUp className="h-3 w-3" />
                {voteCount > 0 && (
                  <span className="ml-1 text-xs">{voteCount}</span>
                )}
              </Button>
              {issue.html_url && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="flex-shrink-0"
                >
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {issue.body && (
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {issue.body}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-3">
              {issue.assignees && issue.assignees.length > 0 && (
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{issue.assignees[0].login}</span>
                  {issue.assignees.length > 1 && (
                    <span>+{issue.assignees.length - 1}</span>
                  )}
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(issue.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            {issue.comments !== undefined && issue.comments > 0 && (
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-3 w-3" />
                <span>{issue.comments}</span>
              </div>
            )}
          </div>

          {issue.labels.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {issue.labels.map((label) => {
                if (typeof label === 'string') return null;
                const labelColor = label.color ? `#${label.color}` : undefined;

                return (
                  <Badge
                    key={label.id || label.name}
                    variant="outline"
                    className="px-1 py-0 text-xs"
                    style={{
                      borderColor: labelColor,
                      color: labelColor,
                      backgroundColor: labelColor
                        ? `${labelColor}20`
                        : undefined,
                    }}
                  >
                    {label.name}
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function KanbanBoard({ roadmap }: KanbanBoardProps) {
  const { planned, inProgress, done } = categorizeIssues(
    roadmap.issues,
    roadmap,
  );
  const { getVote, addVote, removeVote } = useVotes();

  const columns = [
    {
      title: 'Planned',
      issues: planned,
      color:
        'border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/30',
      count: planned.length,
    },
    {
      title: 'In Progress',
      issues: inProgress,
      color:
        'border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-950/30',
      count: inProgress.length,
    },
    {
      title: 'Done',
      issues: done,
      color:
        'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30',
      count: done.length,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {columns.map((column) => (
        <div key={column.title} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              {column.title}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {column.count}
            </Badge>
          </div>
          <div
            className={cn(
              'min-h-[400px] rounded-lg border-2 border-dashed p-4',
              column.color,
            )}
          >
            {column.issues.length > 0 ? (
              <div className="space-y-0">
                {column.issues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    roadmapId={roadmap.id}
                    organizationId={roadmap.organizationId}
                    vote={getVote(issue.id.toString())}
                    addVote={addVote}
                    removeVote={removeVote}
                    timestamp={roadmap.timestamp}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-sm text-muted-foreground">
                  No issues in {column.title.toLowerCase()}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
