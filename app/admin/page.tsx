"use client";

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
import {
  Users,
  Settings,
  BarChart3,
  Shield,
  User,
  LogOut,
  Loader2,
  Building2,
} from "lucide-react";
import { useState } from "react";

export default function AdminPage() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const { data: activeOrganization, isPending: isLoadingOrg } =
    authClient.useActiveOrganization();
  // Get active member from the active organization data
  const activeMember = activeOrganization?.members?.find(
    (member) => member.user?.id === session?.user?.id
  );
  const [isSigningOut, setIsSigningOut] = useState(false);

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
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center h-64">
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
      <div className="flex items-center justify-center h-64">
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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
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
          <Badge variant="secondary">{activeMember?.role || "Member"}</Badge>
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

      {/* Organization Info */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <p className="text-sm font-mono">{activeOrganization.slug}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Your Role
              </label>
              <p className="text-sm font-semibold capitalize">
                {activeMember?.role || "Member"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Created
              </label>
              <p className="text-sm">
                {activeOrganization.createdAt
                  ? new Date(activeOrganization.createdAt).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Invitations
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Healthy</div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* User Session Info */}
      <Card>
        <CardHeader>
          <CardTitle>Current Session</CardTitle>
          <CardDescription>
            Your authentication details and session information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                User ID
              </label>
              <p className="text-sm font-mono">{session.user.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-sm">{session.user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-sm">{session.user.name || "Not provided"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Session Expires
              </label>
              <p className="text-sm">
                {session.session.expiresAt
                  ? new Date(session.session.expiresAt).toLocaleString()
                  : "Unknown"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
