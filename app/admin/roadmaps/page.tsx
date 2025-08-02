"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/lib/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { authClient } from "@/auth/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { useConfirm } from "@/components/confirm-dialog";
import { toast } from "sonner";

export default function RoadmapsPage() {
  const { data: organization } = authClient.useActiveOrganization();
  const router = useRouter();
  const trpc = useTRPC();
  const confirm = useConfirm();

  const { data: roadmaps, refetch } = useQuery(
    trpc.roadmap.getAll.queryOptions({
      organizationId: organization?.id || "",
    })
  );

  const deleteRoadmap = useMutation(
    trpc.roadmap.delete.mutationOptions({
      onSuccess: () => {
        toast.success("Roadmap deleted successfully");
        refetch();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete roadmap");
      },
    })
  );

  const handleDelete = async (id: string) => {
    if (!organization?.id) return;
    if (
      !(await confirm({
        title: "Delete Roadmap",
        description:
          "Are you sure you want to delete this roadmap? This action cannot be undone.",
      }))
    )
      return;
    deleteRoadmap.mutate({ id, organizationId: organization.id });
  };

  const handleCreate = () => {
    router.push("/admin/roadmaps/new");
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/roadmaps/${id}/edit`);
  };

  const handleView = (slug: string) => {
    router.push(`/roadmap/${slug}`);
  };

  if (!organization) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">No organization selected</h1>
          <p className="text-muted-foreground">
            Please select an organization to manage roadmaps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Roadmaps</h1>
          <p className="text-muted-foreground">
            Manage roadmaps for {organization.name}
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Create Roadmap
        </Button>
      </div>

      {roadmaps?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">No roadmaps yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first roadmap to start organizing your project
                features.
              </p>
              <Button onClick={handleCreate}>
                <Plus className="w-4 h-4 mr-2" />
                Create Roadmap
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roadmaps?.map((roadmap) => (
            <Card
              key={roadmap.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{roadmap.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {roadmap.description || "No description"}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleView(roadmap.slug)}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(roadmap.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(roadmap.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Tag:</span>
                    <Badge variant="secondary">{roadmap.tag}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Slug:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {roadmap.slug}
                    </code>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created {new Date(roadmap.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
