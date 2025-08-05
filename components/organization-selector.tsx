'use client';

import { useState } from 'react';
import { authClient } from '@/auth/client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, Building2, Check } from 'lucide-react';
import { toast } from 'sonner';

export function OrganizationSelector() {
  const { data: organizations, isPending: isLoading } =
    authClient.useListOrganizations();
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const [isCreating, setIsCreating] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgSlug, setNewOrgSlug] = useState('');

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
      // Refresh the organizations list
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
      window.location.reload();
      toast.success('Active organization updated');
    } catch (error) {
      console.error('Error setting active organization:', error);
      toast.error('Failed to update active organization');
    }
  };

  if (isLoading) {
    return (
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center">
            <Building2 className="mr-2 h-4 w-4" />
            <span className="truncate">
              {activeOrganization?.name || 'Select Organization'}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {organizations?.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => handleSetActiveOrganization(org.id)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <Building2 className="mr-2 h-4 w-4" />
              <span className="truncate">{org.name}</span>
            </div>
            {activeOrganization?.id === org.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}

        {organizations && organizations.length > 0 && <DropdownMenuSeparator />}

        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Plus className="mr-2 h-4 w-4" />
              Create Organization
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Organization</DialogTitle>
              <DialogDescription>
                Create a new organization to manage your team and projects.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Organization Name</Label>
                <Input
                  id="name"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  placeholder="Enter organization name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Organization Slug</Label>
                <Input
                  id="slug"
                  value={newOrgSlug}
                  onChange={(e) =>
                    setNewOrgSlug(
                      e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                    )
                  }
                  placeholder="enter-organization-slug"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
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
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
