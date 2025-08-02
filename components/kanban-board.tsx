"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, User, Calendar, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Issue {
  id: number;
  number: number;
  title: string;
  body?: string | null;
  state: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  assignees?: Array<{ login: string; avatar_url: string }> | null;
  labels: Array<string | { name?: string; color?: string | null; id?: number }>;
  comments?: number;
  [key: string]: any; // Allow additional GitHub API fields
}

interface KanbanBoardProps {
  issues: Issue[][];
  roadmap: {
    tag: string;
    plannedTag: string | null;
    inProgressTag: string | null;
    doneTag: string | null;
  };
}

function categorizeIssues(
  issues: Issue[][],
  roadmap: KanbanBoardProps["roadmap"]
) {
  const planned: Issue[] = [];
  const inProgress: Issue[] = [];
  const done: Issue[] = [];

  // Flatten the issues array from multiple repositories
  const allIssues = issues.flat();

  allIssues.forEach((issue) => {
    const labelNames = issue.labels.map((label) =>
      typeof label === "string" ? label : label.name
    );

    if (roadmap.doneTag && labelNames.includes(roadmap.doneTag)) {
      done.push(issue);
    } else if (
      roadmap.inProgressTag &&
      labelNames.includes(roadmap.inProgressTag)
    ) {
      inProgress.push(issue);
    } else if (
      (roadmap.plannedTag && labelNames.includes(roadmap.plannedTag)) ||
      labelNames.includes(roadmap.tag)
    ) {
      planned.push(issue);
    } else {
      // If no specific status label, put in planned
      planned.push(issue);
    }
  });

  return { planned, inProgress, done };
}

function IssueCard({ issue }: { issue: Issue }) {
  return (
    <Card className="mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm leading-tight line-clamp-2">
                #{issue.number} {issue.title}
              </h4>
            </div>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="flex-shrink-0 ml-2"
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
          </div>

          {issue.body && (
            <p className="text-xs text-muted-foreground line-clamp-2">
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
                if (typeof label === "string") return null;
                return (
                  <Badge
                    key={label.id || label.name}
                    variant="outline"
                    className="text-xs px-1 py-0"
                    style={{
                      borderColor: `#${label.color}`,
                      color: `#${label.color}`,
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

export function KanbanBoard({ issues, roadmap }: KanbanBoardProps) {
  const { planned, inProgress, done } = categorizeIssues(issues, roadmap);

  const columns = [
    {
      title: "Planned",
      issues: planned,
      color: "border-blue-200 bg-blue-50",
      count: planned.length,
    },
    {
      title: "In Progress",
      issues: inProgress,
      color: "border-yellow-200 bg-yellow-50",
      count: inProgress.length,
    },
    {
      title: "Done",
      issues: done,
      color: "border-green-200 bg-green-50",
      count: done.length,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => (
        <div key={column.title} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{column.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {column.count}
            </Badge>
          </div>
          <div
            className={cn(
              "min-h-[400px] p-4 rounded-lg border-2 border-dashed",
              column.color
            )}
          >
            {column.issues.length > 0 ? (
              <div className="space-y-0">
                {column.issues.map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-muted-foreground text-center">
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
