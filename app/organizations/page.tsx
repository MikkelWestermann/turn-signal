"use client";

import { useSearchParams } from "next/navigation";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, XCircle, AlertCircle, Building2, LogIn } from "lucide-react";
import { toast } from "sonner";

type InvitationStatus =
  | "loading"
  | "error"
  | "not-found"
  | "expired"
  | "not-authenticated";

export default function OrganizationsPage() {
  const searchParams = useSearchParams();
  const inviteId = searchParams.get("invite");
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();

  const {
    data: invitationData,
    isLoading: isInvitationLoading,
    error: invitationError,
  } = useQuery({
    queryKey: ["invitation", inviteId],
    queryFn: async () => {
      if (!inviteId) throw new Error("No invitation ID");
      return authClient.organization.getInvitation({
        query: {
          id: inviteId,
        },
      });
    },
    enabled: !!inviteId && !!session?.user && !isSessionLoading,
    retry: false,
  });

  const acceptInvitationMutation = useMutation({
    mutationFn: async () => {
      if (!inviteId) throw new Error("No invitation ID");
      return authClient.organization.acceptInvitation({
        invitationId: inviteId,
      });
    },
    onSuccess: () => {
      toast.success("Invitation accepted successfully!");
      window.location.href = "/admin";
    },
    onError: (error) => {
      console.error("Error accepting invitation:", error);
      toast.error("Failed to accept invitation");
    },
  });

  const rejectInvitationMutation = useMutation({
    mutationFn: async () => {
      if (!inviteId) throw new Error("No invitation ID");
      return authClient.organization.rejectInvitation({
        invitationId: inviteId,
      });
    },
    onSuccess: () => {
      toast.success("Invitation rejected");
    },
    onError: (error) => {
      console.error("Error rejecting invitation:", error);
      toast.error("Failed to reject invitation");
    },
  });

  let status: InvitationStatus | null = null;

  if (!inviteId) {
    status = "not-found";
  } else if (!session?.user) {
    status = "not-authenticated";
  } else if (isInvitationLoading) {
    status = "loading";
  } else if (invitationError) {
    status = "error";
  } else if (!invitationData || invitationData.error) {
    status = "not-found";
  } else if (invitationData.data) {
    const now = new Date();
    const expiresAt = new Date(invitationData.data.expiresAt);

    if (now > expiresAt) {
      status = "expired";
    }
  }

  const handleAcceptInvitation = () => {
    acceptInvitationMutation.mutate();
  };

  const handleRejectInvitation = () => {
    rejectInvitationMutation.mutate();
  };

  if (status === "loading" || isSessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading invitation...</span>
        </div>
      </div>
    );
  }

  if (status === "not-authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <LogIn className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              You need to sign in to accept this invitation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please sign in with the email address that received this
                invitation.
              </AlertDescription>
            </Alert>
            <Button
              className="w-full"
              onClick={() =>
                (window.location.href = `/login?redirect=${encodeURIComponent(window.location.href)}`)
              }
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "not-found") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Invitation Not Found</CardTitle>
            <CardDescription>
              This invitation link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              onClick={() => (window.location.href = "/admin")}
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <CardTitle>Invitation Expired</CardTitle>
            <CardDescription>
              This invitation has expired. Please contact the organization
              administrator for a new invitation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              onClick={() => (window.location.href = "/admin")}
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Error</CardTitle>
            <CardDescription>
              An error occurred while processing your invitation. Please try
              again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!invitationData?.data) {
    return null;
  }

  const invitation = invitationData.data;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
          <CardTitle>Organization Invitation</CardTitle>
          <CardDescription>
            You've been invited to join an organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Organization:</span>
              <span>{invitation.organizationName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Role:</span>
              <span className="capitalize">{invitation.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Invited by:</span>
              <span>{invitation.inviterEmail}</span>
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              By accepting this invitation, you'll be added to the organization
              and gain access to their projects and resources.
            </AlertDescription>
          </Alert>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleRejectInvitation}
            >
              Decline
            </Button>
            <Button
              className="flex-1"
              onClick={handleAcceptInvitation}
              disabled={acceptInvitationMutation.isPending}
            >
              {acceptInvitationMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Accepting...
                </>
              ) : (
                "Accept Invitation"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
