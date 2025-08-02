"use client";

import { useState } from "react";
import { authClient } from "@/auth/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Building2,
  Edit,
  Trash2,
  Crown,
  Shield,
  User,
} from "lucide-react";
import { toast } from "sonner";

export default function OrganizationPage() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const { data: session } = authClient.useSession();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");

  const handleUpdateOrganization = async () => {
    if (!editName.trim() || !editSlug.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!activeOrganization) {
      toast.error("No active organization");
      return;
    }

    setIsUpdating(true);
    try {
      await authClient.organization.update({
        organizationId: activeOrganization.id,
        data: {
          name: editName,
          slug: editSlug,
        },
      });

      toast.success("Organization updated successfully!");
      setEditName("");
      setEditSlug("");
      // Refresh the page to get updated data
      window.location.reload();
    } catch (error) {
      console.error("Error updating organization:", error);
      toast.error("Failed to update organization");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteOrganization = async () => {
    if (!activeOrganization) return;

    setIsDeleting(true);
    try {
      await authClient.organization.delete({
        organizationId: activeOrganization.id,
      });

      toast.success("Organization deleted successfully!");
      // Redirect to organization selector
      window.location.href = "/admin";
    } catch (error) {
      console.error("Error deleting organization:", error);
      toast.error("Failed to delete organization");
    } finally {
      setIsDeleting(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="h-4 w-4" />;
      case "admin":
        return <Shield className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "admin":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  if (!activeOrganization) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              No Active Organization
            </CardTitle>
            <CardDescription className="text-center">
              Please select an organization to view settings.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Get current user's role
  const currentUserRole =
    activeOrganization.members?.find(
      (member) => member.user?.id === session?.user?.id
    )?.role || "member";

  const canEdit = currentUserRole === "owner" || currentUserRole === "admin";
  const canDelete = currentUserRole === "owner";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organization Settings</h1>
          <p className="text-muted-foreground">
            Manage {activeOrganization.name} settings
          </p>
        </div>
      </div>

      {/* Organization Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Organization Details
          </CardTitle>
          <CardDescription>
            Basic information about your organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">
                Organization Name
              </Label>
              <p className="text-sm font-semibold">{activeOrganization.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">
                Organization Slug
              </Label>
              <p className="text-sm font-mono">{activeOrganization.slug}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">
                Created
              </Label>
              <p className="text-sm">
                {activeOrganization.createdAt
                  ? new Date(activeOrganization.createdAt).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">
                Your Role
              </Label>
              <Badge className={getRoleColor(currentUserRole)}>
                <span className="mr-1">{getRoleIcon(currentUserRole)}</span>
                {currentUserRole}
              </Badge>
            </div>
          </div>

          {canEdit && (
            <div className="flex gap-2 pt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Organization
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Organization</DialogTitle>
                    <DialogDescription>
                      Update your organization's basic information.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Organization Name</Label>
                      <Input
                        id="name"
                        value={editName || activeOrganization.name}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Enter organization name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="slug">Organization Slug</Label>
                      <Input
                        id="slug"
                        value={editSlug || activeOrganization.slug}
                        onChange={(e) =>
                          setEditSlug(
                            e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9-]/g, "-")
                          )
                        }
                        placeholder="enter-organization-slug"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleUpdateOrganization}
                      disabled={
                        isUpdating || (!editName.trim() && !editSlug.trim())
                      }
                    >
                      {isUpdating && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Update Organization
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {canDelete && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Organization
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Organization</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "
                        {activeOrganization.name}"? This action cannot be undone
                        and will remove all members, invitations, and
                        organization data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteOrganization}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {isDeleting && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Delete Organization
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Organization Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeOrganization.members?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Invitations
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeOrganization.invitations?.filter(
                (inv) => inv.status === "pending"
              ).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Organization Age
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeOrganization.createdAt
                ? Math.floor(
                    (Date.now() -
                      new Date(activeOrganization.createdAt).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">Days old</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
