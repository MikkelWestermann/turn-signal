'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/lib/client';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Repository {
  owner: string;
  repo: string;
}

interface LabelValidationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  repositories: Repository[];
  onLabelsValidated: () => void;
  missingLabels: string[];
}

export function LabelValidationDialog({
  open,
  onOpenChange,
  repositories,
  onLabelsValidated,
  missingLabels,
}: LabelValidationDialogProps) {
  const trpc = useTRPC();

  const [labelConfigs, setLabelConfigs] = useState<
    Record<string, { color: string; description: string }>
  >({});

  useEffect(() => {
    if (missingLabels.length > 0) {
      const initialConfigs = Object.fromEntries(
        missingLabels.map((label) => [
          label,
          {
            color: getLabelColor(label, missingLabels),
            description: getLabelDescription(label),
          },
        ]),
      );
      setLabelConfigs(initialConfigs);
    }
  }, [missingLabels]);

  const updateLabelConfig = (
    label: string,
    field: 'color' | 'description',
    value: string,
  ) => {
    setLabelConfigs((prev) => ({
      ...prev,
      [label]: {
        ...prev[label],
        [field]: value,
      },
    }));
  };

  const createLabelsMutation = useMutation(
    trpc.github.createLabels.mutationOptions({
      onSuccess: (result) => {
        if (result.allLabelsCreated) {
          toast.success('All missing labels have been created successfully!');
          onLabelsValidated();
          onOpenChange(false);
        } else {
          toast.error(
            'Some labels could not be created. Please check the results.',
          );
        }
      },
      onError: (error) => {
        toast.error('Failed to create labels');
        console.error('Error creating labels:', error);
      },
    }),
  );

  const isCreating = createLabelsMutation.isPending;

  const createMissingLabels = async () => {
    const labelsToCreate = missingLabels.map((labelName) => ({
      name: labelName,
      color:
        labelConfigs[labelName]?.color ||
        getLabelColor(labelName, missingLabels),
      description:
        labelConfigs[labelName]?.description || getLabelDescription(labelName),
    }));

    await createLabelsMutation.mutateAsync({
      repositories,
      labels: labelsToCreate,
    });
  };

  const getLabelColor = (labelName: string, allLabels: string[]): string => {
    const index = allLabels.indexOf(labelName);
    const colors = ['5319e7', '0052cc', '0e8a16', 'b60205', 'fbca04'];
    return colors[index % colors.length];
  };

  const getLabelDescription = (labelName: string): string => {
    if (labelName.toLowerCase().includes('planned')) {
      return 'Issues that are planned for future development';
    }
    if (labelName.toLowerCase().includes('progress')) {
      return 'Issues currently being worked on';
    }
    if (labelName.toLowerCase().includes('done')) {
      return 'Completed issues';
    }
    return `Roadmap label: ${labelName}`;
  };

  const handleSkip = () => {
    onLabelsValidated();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          onLabelsValidated();
        }
      }}
    >
      <DialogContent className="max-w-4xl">
        <div className="space-y-6">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold">
              Missing Labels Detected
            </DialogTitle>
            <DialogDescription className="text-base">
              We checked your repositories and found that you don't have all the
              labels. Would you like to create them?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 border-b pb-2 text-xs font-medium text-muted-foreground">
                  <div className="col-span-3">Label</div>
                  <div className="col-span-3">Color</div>
                  <div className="col-span-6">Description</div>
                </div>

                <div className="max-h-48 space-y-2 overflow-y-auto">
                  {missingLabels.map((label, index) => (
                    <div
                      key={label}
                      className="grid grid-cols-12 items-center gap-4 border-b border-border/50 py-2 last:border-0"
                    >
                      <div className="col-span-3 flex items-center gap-2">
                        <Badge
                          style={{
                            borderColor: `#${labelConfigs[label]?.color || 'cccccc'}`,
                            color: `#${labelConfigs[label]?.color || 'cccccc'}`,
                            backgroundColor: `#${labelConfigs[label]?.color || 'cccccc'}20`,
                          }}
                          variant="outline"
                        >
                          {label}
                        </Badge>
                      </div>

                      <div className="col-span-3">
                        <Input
                          id={`color-${label}`}
                          value={labelConfigs[label]?.color || ''}
                          onChange={(e) =>
                            updateLabelConfig(
                              label,
                              'color',
                              e.target.value.replace('#', ''),
                            )
                          }
                          placeholder="5319e7"
                          className="h-8 text-xs"
                        />
                      </div>

                      <div className="col-span-6">
                        <Input
                          id={`description-${label}`}
                          value={labelConfigs[label]?.description || ''}
                          onChange={(e) =>
                            updateLabelConfig(
                              label,
                              'description',
                              e.target.value,
                            )
                          }
                          placeholder="Label description"
                          className="h-8 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-accent/50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Sparkles className="mt-0.5 h-5 w-5 text-accent-foreground" />
              </div>
              <div className="text-sm">
                This will automatically create the labels in all selected
                repositories. You can customize the colors and descriptions
                above.
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSkip} className="flex-1">
              Skip for now
            </Button>
            <Button
              onClick={createMissingLabels}
              disabled={isCreating}
              className="flex-1"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating labels...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Create {missingLabels.length} label
                  {missingLabels.length !== 1 ? 's' : ''}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
