"use client";

import { useState } from "react";
import { useTRPC } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ExternalLink, User, Calendar, RefreshCw } from "lucide-react";

interface RepositoryIssuesProps {
  organizationId: string;
  owner: string;
  repo: string;
}

export function RepositoryIssues({
  organizationId,
  owner,
  repo,
}: RepositoryIssuesProps) {
  const [state, setState] = useState<"open" | "closed" | "all">("open");
  const [page, setPage] = useState(1);
  const trpc = useTRPC();

  const {
    data: issues,
    isLoading,
    refetch,
  } = useQuery(
    trpc.github.getIssues.queryOptions({
      organizationId,
      owner,
      repo,
      state,
      page,
      perPage: 20,
    })
  );

  const handleStateChange = (newState: "open" | "closed" | "all") => {
    setState(newState);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {owner}/{repo}
          </h2>
          <p className="text-muted-foreground">Live Issues from GitHub</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={state} onValueChange={handleStateChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">
            Loading fresh issues from GitHub...
          </div>
        </div>
      ) : issues && issues.data.length > 0 ? (
        <div className="space-y-3">
          {issues.data.map((issue) => (
            <Card key={issue.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg truncate">
                        #{issue.number} {issue.title}
                      </CardTitle>
                      <Badge
                        variant={
                          issue.state === "open" ? "default" : "secondary"
                        }
                      >
                        {issue.state}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{issue.assignees?.[0]?.login}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(issue.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {issue.assignees && issue.assignees.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <span>Assigned to {issue.assignees[0].login}</span>
                          {issue.assignees.length > 1 && issue.assignees && (
                            <span>+{issue.assignees.length - 1}</span>
                          )}
                        </div>
                      )}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              {issue.body && (
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {issue.body}
                  </p>
                </CardContent>
              )}
              {issue.labels.length > 0 && (
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1">
                    {issue.labels.map((label) => {
                      if (typeof label === "string") {
                        return null;
                      }
                      return (
                        <Badge
                          key={label.id || label.name}
                          variant="outline"
                          className="text-xs"
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
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              No {state} issues found in this repository.
            </p>
          </CardContent>
        </Card>
      )}

      {issues && issues.data.length === 20 && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setPage(page + 1)}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
