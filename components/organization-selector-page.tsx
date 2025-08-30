'use client';

import { useState, useEffect } from 'react';
import { authClient } from '@/auth/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2,
  Plus,
  Building2,
  Check,
  Users,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function OrganizationSelectorPage() {
  const { data: organizations, isPending: isLoading } =
    authClient.useListOrganizations();
  const { data: activeOrganization, refetch: refetchActive } =
    authClient.useActiveOrganization();
  const [isCreating, setIsCreating] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgSlug, setNewOrgSlug] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Auto-populate slug from name
  useEffect(() => {
    if (newOrgName && !slugManuallyEdited) {
      const generatedSlug = newOrgName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
      setNewOrgSlug(generatedSlug);
    }
  }, [newOrgName, slugManuallyEdited]);

  const handleCreateOrganization = async () => {
    if (!newOrgName.trim() || !newOrgSlug.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsCreating(true);
    try {
      await authClient.organization.create({
        name: newOrgName,
        slug: newOrgSlug,
      });

      toast.success('Organization created successfully!');
      setNewOrgName('');
      setNewOrgSlug('');
      setSlugManuallyEdited(false);
      setShowCreateForm(false);
      window.location.reload();
    } catch (error) {
      console.error('Error creating organization:', error);
      toast.error('Failed to create organization');
    } finally {
      setIsCreating(false);
    }
  };

  const handleSetActiveOrganization = async (organizationId: string | null) => {
    try {
      await authClient.organization.setActive({
        organizationId,
      });
      await refetchActive();
      toast.success('Active organization updated');
    } catch (error) {
      console.error('Error setting active organization:', error);
      toast.error('Failed to update active organization');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Select Organization</h1>
          <p className="text-lg text-muted-foreground">
            You need to select or create an organization to access the admin
            panel.
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Admin pages are only accessible through an organization. Please
            select an existing organization or create a new one.
          </AlertDescription>
        </Alert>

        <Card>
          <CardContent className="space-y-6 p-6">
            {!showCreateForm ? (
              <>
                {organizations && organizations.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="mb-4 text-center text-lg font-bold text-black sm:text-xl dark:text-white">
                      YOUR ORGANIZATIONS
                    </h3>
                    {organizations.map((org) => (
                      <Button
                        key={org.id}
                        variant="outline"
                        className="h-12 w-full justify-between text-base font-semibold"
                        onClick={() => handleSetActiveOrganization(org.id)}
                      >
                        <div className="flex items-center">
                          <Building2 className="mr-3 h-4 w-4" />
                          <span>{org.name}</span>
                        </div>
                        {activeOrganization?.id === org.id ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <ArrowRight className="h-4 w-4" />
                        )}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <Building2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="text-lg font-semibold text-muted-foreground">
                      No organizations found
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Create your first organization to get started
                    </p>
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="h-12 w-full text-base font-semibold"
                    onClick={() => setShowCreateForm(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Organization
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="mb-2 text-xl font-bold">
                    Create Organization
                  </h3>
                  <p className="text-muted-foreground">
                    Set up a new organization for your team
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-semibold">
                      Organization Name
                    </Label>
                    <Input
                      id="name"
                      value={newOrgName}
                      onChange={(e) => {
                        setNewOrgName(e.target.value);
                        setSlugManuallyEdited(false); // Reset manual edit flag when name changes
                      }}
                      placeholder="Enter organization name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug" className="font-semibold">
                      Organization Slug
                    </Label>
                    <Input
                      id="slug"
                      value={newOrgSlug}
                      onChange={(e) => {
                        setSlugManuallyEdited(true);
                        setNewOrgSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, '-'),
                        );
                      }}
                      placeholder="enter-organization-slug"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleCreateOrganization}
                    disabled={
                      isCreating || !newOrgName.trim() || !newOrgSlug.trim()
                    }
                  >
                    {isCreating && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Create Organization
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
