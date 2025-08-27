'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTRPC } from '@/lib/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Save,
  Loader2,
  Check,
  ChevronsUpDown,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface RoadmapFormProps {
  roadmapId?: string;
  mode: 'create' | 'edit';
}

interface FormData {
  name: string;
  description: string;
  slug: string;
  plannedTag: string;
  inProgressTag: string;
  doneTag: string;
  showComments: boolean;
  showCommentProfiles: boolean;
  closedIssueBehavior: 'filter' | 'label' | 'done';
}

interface Repository {
  owner: string;
  repo: string;
}

export function RoadmapForm({ roadmapId, mode }: RoadmapFormProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRepositories, setSelectedRepositories] = useState<
    Repository[]
  >([]);
  const [repositoryPopoverOpen, setRepositoryPopoverOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    slug: '',
    plannedTag: 'planned',
    inProgressTag: 'in progress',
    doneTag: 'done',
    showComments: true,
    showCommentProfiles: true,
    closedIssueBehavior: 'filter',
  });

  const { data: roadmap } = useQuery(
    trpc.roadmap.getById.queryOptions({
      id: roadmapId!,
    }),
  );

  const { data: availableRepositories } = useQuery(
    trpc.github.getRepositories.queryOptions(),
  );

  const currentRepositories = roadmap?.repositories;

  const createRoadmap = useMutation(
    trpc.roadmap.create.mutationOptions({
      onSuccess: () => {
        // Invalidate the roadmaps list query to refresh the data
        queryClient.invalidateQueries({
          queryKey: trpc.roadmap.getAll.queryKey(),
        });
        toast.success('Roadmap created successfully');
        router.push('/admin/roadmaps');
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to create roadmap');
        setIsLoading(false);
      },
    }),
  );

  const updateRoadmap = useMutation(
    trpc.roadmap.update.mutationOptions({
      onSuccess: () => {
        // Invalidate the roadmaps list query to refresh the data
        queryClient.invalidateQueries({
          queryKey: trpc.roadmap.getAll.queryKey(),
        });
        // Also invalidate the specific roadmap query
        queryClient.invalidateQueries({
          queryKey: trpc.roadmap.getById.queryKey({ id: roadmapId! }),
        });
        toast.success('Roadmap updated successfully');
        router.push('/admin/roadmaps');
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to update roadmap');
        setIsLoading(false);
      },
    }),
  );

  const updateRepositories = useMutation(
    trpc.roadmap.updateRepositories.mutationOptions({
      onSuccess: () => {
        // Invalidate the specific roadmap query to refresh repository data
        queryClient.invalidateQueries({
          queryKey: trpc.roadmap.getById.queryKey({ id: roadmapId! }),
        });
        toast.success('Repositories updated successfully');
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to update repositories');
        setIsLoading(false);
      },
    }),
  );

  // Load roadmap data when editing
  useEffect(() => {
    if (roadmap && mode === 'edit') {
      setFormData({
        name: roadmap.name,
        description: roadmap.description || '',
        slug: roadmap.slug,
        plannedTag: roadmap.plannedTag || 'planned',
        inProgressTag: roadmap.inProgressTag || 'in progress',
        doneTag: roadmap.doneTag || 'done',
        showComments: roadmap.showComments ?? true,
        showCommentProfiles: roadmap.showCommentProfiles ?? true,
        closedIssueBehavior: roadmap.closedIssueBehavior || 'filter',
      });
    }
  }, [roadmap, mode]);

  // Load current repositories when editing
  useEffect(() => {
    if (currentRepositories && mode === 'edit') {
      setSelectedRepositories(
        currentRepositories.map((repo) => ({
          owner: repo.owner,
          repo: repo.repo,
        })),
      );
    }
  }, [currentRepositories, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      if (mode === 'create') {
        const newRoadmap = await createRoadmap.mutateAsync({
          ...formData,
        });

        // Update repositories for the new roadmap
        if (selectedRepositories.length > 0) {
          await updateRepositories.mutateAsync({
            roadmapId: newRoadmap.id,
            repositories: selectedRepositories,
          });
        }
      } else {
        await updateRoadmap.mutateAsync({
          id: roadmapId!,
          ...formData,
        });

        // Update repositories for the existing roadmap
        await updateRepositories.mutateAsync({
          roadmapId: roadmapId!,
          repositories: selectedRepositories,
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean | 'filter' | 'label' | 'done',
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBooleanChange = (
    field: 'showComments' | 'showCommentProfiles',
    value: boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClosedIssueBehaviorChange = (value: string) => {
    if (value === 'filter' || value === 'label' || value === 'done') {
      setFormData((prev) => ({ ...prev, closedIssueBehavior: value }));
    }
  };

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    handleInputChange('name', name);
    if (mode === 'create') {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      handleInputChange('slug', slug);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/admin/roadmaps')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Roadmaps
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {mode === 'create' ? 'Create New Roadmap' : 'Edit Roadmap'}
            </CardTitle>
            <CardDescription>
              {mode === 'create'
                ? 'Create a new roadmap to organize your project features.'
                : 'Update your roadmap settings and configuration.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter roadmap name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange('description', e.target.value)
                  }
                  placeholder="Enter roadmap description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="roadmap-slug"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This will be used in the URL: /roadmap/{formData.slug}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Column Labels</Label>
                  <p className="mb-3 text-xs text-muted-foreground">
                    These labels determine which column each issue appears in.
                    Issues with these labels will be automatically sorted into
                    the corresponding columns.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="plannedTag">Planned Label</Label>
                    <Input
                      id="plannedTag"
                      value={formData.plannedTag}
                      onChange={(e) =>
                        handleInputChange('plannedTag', e.target.value)
                      }
                      placeholder="planned"
                    />
                    <p className="text-xs text-muted-foreground">
                      Issues with this label go to "Planned" column
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inProgressTag">In Progress Label</Label>
                    <Input
                      id="inProgressTag"
                      value={formData.inProgressTag}
                      onChange={(e) =>
                        handleInputChange('inProgressTag', e.target.value)
                      }
                      placeholder="in progress"
                    />
                    <p className="text-xs text-muted-foreground">
                      Issues with this label go to "In Progress" column
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doneTag">Done Label</Label>
                    <Input
                      id="doneTag"
                      value={formData.doneTag}
                      onChange={(e) =>
                        handleInputChange('doneTag', e.target.value)
                      }
                      placeholder="done"
                    />
                    <p className="text-xs text-muted-foreground">
                      Issues with this label go to "Done" column
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">
                    Comments Configuration
                  </Label>
                  <p className="mb-3 text-xs text-muted-foreground">
                    Control how comments are displayed in the roadmap.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="showComments"
                      checked={formData.showComments}
                      onCheckedChange={(checked) =>
                        handleBooleanChange('showComments', checked === true)
                      }
                    />
                    <Label
                      htmlFor="showComments"
                      className="text-sm font-normal"
                    >
                      Show comments on issues
                    </Label>
                  </div>

                  {formData.showComments && (
                    <div className="ml-6 flex items-center space-x-2">
                      <Checkbox
                        id="showCommentProfiles"
                        checked={formData.showCommentProfiles}
                        onCheckedChange={(checked) =>
                          handleBooleanChange(
                            'showCommentProfiles',
                            checked === true,
                          )
                        }
                      />
                      <Label
                        htmlFor="showCommentProfiles"
                        className="text-sm font-normal"
                      >
                        Show user profiles in comments
                      </Label>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">
                    Closed Issue Behavior
                  </Label>
                  <p className="mb-3 text-xs text-muted-foreground">
                    Choose how closed issues are handled in the roadmap.
                  </p>
                </div>

                <div className="space-y-3">
                  <RadioGroup
                    value={formData.closedIssueBehavior}
                    onValueChange={handleClosedIssueBehaviorChange}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="filter" id="closedFilter" />
                        <Label
                          htmlFor="closedFilter"
                          className="text-sm font-normal"
                        >
                          Filter out closed issues
                        </Label>
                      </div>
                      <p className="ml-6 text-xs text-muted-foreground">
                        All closed issues are hidden from the roadmap
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="label" id="closedLabel" />
                        <Label
                          htmlFor="closedLabel"
                          className="text-sm font-normal"
                        >
                          Show in specified tag column
                        </Label>
                      </div>
                      <p className="ml-6 text-xs text-muted-foreground">
                        Closed issues appear in the column based on their status
                        label
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="done" id="closedDone" />
                        <Label
                          htmlFor="closedDone"
                          className="text-sm font-normal"
                        >
                          Move all to Done column
                        </Label>
                      </div>
                      <p className="ml-6 text-xs text-muted-foreground">
                        All closed issues automatically appear in the Done
                        column
                      </p>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Repositories (Max 5)</Label>
                <div className="space-y-3">
                  {/* Selected repositories display */}
                  {selectedRepositories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedRepositories.map((repo, index) => (
                        <Badge
                          key={`${repo.owner}/${repo.repo}`}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {repo.owner}/{repo.repo}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedRepositories(
                                selectedRepositories.filter(
                                  (_, i) => i !== index,
                                ),
                              );
                            }}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Repository selector */}
                  {availableRepositories?.data?.repositories ? (
                    selectedRepositories.length < 5 && (
                      <Popover
                        open={repositoryPopoverOpen}
                        onOpenChange={setRepositoryPopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={repositoryPopoverOpen}
                            className="w-full justify-between"
                          >
                            Select repositories...
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search repositories..." />
                            <CommandList>
                              <CommandEmpty>
                                No repositories found.
                              </CommandEmpty>
                              <CommandGroup>
                                {availableRepositories.data.repositories.map(
                                  (repo: any) => {
                                    const isSelected =
                                      selectedRepositories.some(
                                        (selected) =>
                                          selected.owner === repo.owner.login &&
                                          selected.repo === repo.name,
                                      );
                                    const isDisabled =
                                      selectedRepositories.length >= 5 &&
                                      !isSelected;

                                    return (
                                      <CommandItem
                                        key={`${repo.owner.login}/${repo.name}`}
                                        onSelect={() => {
                                          if (isDisabled) return;

                                          if (isSelected) {
                                            setSelectedRepositories(
                                              selectedRepositories.filter(
                                                (selected) =>
                                                  !(
                                                    selected.owner ===
                                                      repo.owner.login &&
                                                    selected.repo === repo.name
                                                  ),
                                              ),
                                            );
                                          } else {
                                            setSelectedRepositories([
                                              ...selectedRepositories,
                                              {
                                                owner: repo.owner.login,
                                                repo: repo.name,
                                              },
                                            ]);
                                          }
                                        }}
                                        disabled={isDisabled}
                                      >
                                        <Check
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            isSelected
                                              ? 'opacity-100'
                                              : 'opacity-0',
                                          )}
                                        />
                                        {repo.owner.login}/{repo.name}
                                      </CommandItem>
                                    );
                                  },
                                )}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    )
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No GitHub repositories available. Please set up GitHub
                      integration first.
                    </div>
                  )}

                  {selectedRepositories.length >= 5 && (
                    <p className="text-xs text-muted-foreground">
                      Maximum of 5 repositories reached. Remove some to add
                      more.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  {mode === 'create' ? 'Create Roadmap' : 'Update Roadmap'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin/roadmaps')}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
