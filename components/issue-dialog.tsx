'use client';

import { useTRPC } from '@/lib/client';
import { useQuery } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, User, Calendar, MessageSquare } from 'lucide-react';

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
  repository: {
    owner: string;
    name: string;
  };
}

interface SanitizedComment {
  id: number;
  body: string;
  created_at: string;
  updated_at: string;
}

interface IssueDialogProps {
  issue: Issue | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roadmapId: string;
  organizationId: string;
  roadmapSlug: string;
}

export function IssueDialog({
  issue,
  open,
  onOpenChange,
  roadmapId,
  organizationId,
  roadmapSlug,
}: IssueDialogProps) {
  const trpc = useTRPC();

  const getRepoInfo = (issue: Issue) => {
    if (issue.repository) {
      return {
        owner: issue.repository.owner,
        repo: issue.repository.name,
      };
    }
    if (issue.html_url) {
      const match = issue.html_url.match(
        /github\.com\/([^/]+)\/([^/]+)\/issues/,
      );
      if (match) {
        return { owner: match[1], repo: match[2] };
      }
    }
    return null;
  };

  const repoInfo = issue ? getRepoInfo(issue) : null;

  const { data: comments, isLoading: commentsLoading } = useQuery(
    trpc.github.getComments.queryOptions({
      owner: repoInfo?.owner || '',
      repo: repoInfo?.repo || '',
      issueNumber: issue?.number || 0,
      roadmapSlug: roadmapSlug,
    }),
  );

  if (!issue) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  #{issue.number}
                </Badge>
                <Badge
                  variant={issue.state === 'open' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {issue.state}
                </Badge>
              </div>
              <h2 className="text-xl leading-tight font-semibold">
                {issue.title}
              </h2>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2">
              {issue.html_url && (
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              {issue.assignees && issue.assignees.length > 0 && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{issue.assignees[0].login}</span>
                  {issue.assignees.length > 1 && (
                    <span>+{issue.assignees.length - 1}</span>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Created {new Date(issue.created_at).toLocaleDateString()}
                </span>
              </div>
              {issue.updated_at !== issue.created_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Updated {new Date(issue.updated_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
            {issue.comments !== undefined && issue.comments > 0 && (
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{issue.comments} comments</span>
              </div>
            )}
          </div>

          {issue.labels.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {issue.labels.map((label) => {
                if (typeof label === 'string') return null;
                const labelColor = label.color ? `#${label.color}` : undefined;

                return (
                  <Badge
                    key={label.id || label.name}
                    variant="outline"
                    className="px-2 py-1 text-xs"
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

          {issue.body && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Description</h3>
              <div className="prose prose-sm max-w-none">
                <div
                  className="text-sm whitespace-pre-wrap text-foreground"
                  dangerouslySetInnerHTML={{
                    __html: issue.body.replace(/\n/g, '<br />'),
                  }}
                />
              </div>
            </div>
          )}

          {issue.comments !== undefined && issue.comments > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Comments</h3>

              {!repoInfo ? (
                <p className="text-sm text-muted-foreground">
                  Comments are not available for this issue.
                </p>
              ) : (
                <div className="space-y-4">
                  {commentsLoading ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  ) : comments?.data ? (
                    <div className="space-y-4">
                      {comments.data.map((comment: SanitizedComment) => (
                        <div key={comment.id} className="space-y-3">
                          <Separator />
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-muted-foreground">
                                  Anonymous User
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(
                                    comment.created_at,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div
                                className="prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{
                                  __html: comment.body.replace(/\n/g, '<br />'),
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No comments found.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {!issue.body && issue.comments === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No description or comments available for this issue.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
