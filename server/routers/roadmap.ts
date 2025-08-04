import { z } from 'zod';
import { router, publicProcedure, organizationProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { getDb } from '../../db';
import { roadmaps, roadmapRepositories, issueVotes } from '../../db/schema';
import { eq, and, not, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { installationClient } from '@/lib/github';

export const roadmapRouter = router({
  getAll: organizationProcedure.query(async ({ input, ctx }) => {
    const organizationId = ctx.activeOrganizationId;

    const db = await getDb();
    const roadmapsList = await db
      .select()
      .from(roadmaps)
      .where(eq(roadmaps.organizationId, organizationId))
      .orderBy(roadmaps.createdAt);

    return roadmapsList;
  }),

  getById: organizationProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const organizationId = ctx.activeOrganizationId;

      const db = await getDb();

      const roadmap = await db.query.roadmaps.findFirst({
        where: and(
          eq(roadmaps.id, input.id),
          eq(roadmaps.organizationId, organizationId),
        ),
        with: {
          repositories: true,
        },
      });

      if (!roadmap) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return roadmap;
    }),

  create: organizationProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        slug: z.string().min(1),
        tag: z.string().min(1),
        plannedTag: z.string().optional(),
        inProgressTag: z.string().optional(),
        doneTag: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const organizationId = ctx.activeOrganizationId;

      const db = await getDb();

      // Check if slug already exists
      const existingRoadmap = await db
        .select()
        .from(roadmaps)
        .where(eq(roadmaps.slug, input.slug))
        .limit(1);

      if (existingRoadmap.length > 0) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'A roadmap with this slug already exists',
        });
      }

      const newRoadmap = await db
        .insert(roadmaps)
        .values({
          id: nanoid(),
          organizationId,
          name: input.name,
          description: input.description,
          slug: input.slug,
          tag: input.tag,
          plannedTag: input.plannedTag || 'planned',
          inProgressTag: input.inProgressTag || 'in progress',
          doneTag: input.doneTag || 'done',
        })
        .returning();

      return newRoadmap[0];
    }),

  update: organizationProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        slug: z.string().min(1).optional(),
        tag: z.string().min(1).optional(),
        plannedTag: z.string().optional(),
        inProgressTag: z.string().optional(),
        doneTag: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const organizationId = ctx.activeOrganizationId;

      const db = await getDb();

      // If slug is being updated, check if it already exists
      if (input.slug) {
        const existingRoadmap = await db
          .select()
          .from(roadmaps)
          .where(
            and(eq(roadmaps.slug, input.slug), not(eq(roadmaps.id, input.id))),
          )
          .limit(1);

        if (existingRoadmap.length > 0) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'A roadmap with this slug already exists',
          });
        }
      }

      const updateData: any = {};
      if (input.name !== undefined) updateData.name = input.name;
      if (input.description !== undefined)
        updateData.description = input.description;
      if (input.slug !== undefined) updateData.slug = input.slug;
      if (input.tag !== undefined) updateData.tag = input.tag;
      if (input.plannedTag !== undefined)
        updateData.plannedTag = input.plannedTag;
      if (input.inProgressTag !== undefined)
        updateData.inProgressTag = input.inProgressTag;
      if (input.doneTag !== undefined) updateData.doneTag = input.doneTag;

      const updatedRoadmap = await db
        .update(roadmaps)
        .set(updateData)
        .where(
          and(
            eq(roadmaps.id, input.id),
            eq(roadmaps.organizationId, organizationId),
          ),
        )
        .returning();

      if (updatedRoadmap.length === 0) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return updatedRoadmap[0];
    }),

  delete: organizationProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const organizationId = ctx.activeOrganizationId;

      const db = await getDb();

      // Delete associated repositories first
      await db
        .delete(roadmapRepositories)
        .where(eq(roadmapRepositories.roadmapId, input.id));

      const deletedRoadmap = await db
        .delete(roadmaps)
        .where(
          and(
            eq(roadmaps.id, input.id),
            eq(roadmaps.organizationId, organizationId),
          ),
        )
        .returning();

      if (deletedRoadmap.length === 0) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return { success: true };
    }),

  updateRepositories: organizationProcedure
    .input(
      z.object({
        roadmapId: z.string(),
        repositories: z
          .array(
            z.object({
              owner: z.string(),
              repo: z.string(),
            }),
          )
          .max(5),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const organizationId = ctx.activeOrganizationId;

      const db = await getDb();

      // Verify the roadmap exists and belongs to the organization
      const roadmap = await db
        .select()
        .from(roadmaps)
        .where(
          and(
            eq(roadmaps.id, input.roadmapId),
            eq(roadmaps.organizationId, organizationId),
          ),
        )
        .limit(1);

      if (roadmap.length === 0) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      // Delete existing repositories
      await db
        .delete(roadmapRepositories)
        .where(eq(roadmapRepositories.roadmapId, input.roadmapId));

      // Insert new repositories
      if (input.repositories.length > 0) {
        const newRepositories = input.repositories.map((repo) => ({
          id: nanoid(),
          roadmapId: input.roadmapId,
          owner: repo.owner,
          repo: repo.repo,
        }));

        await db.insert(roadmapRepositories).values(newRepositories);
      }

      return { success: true };
    }),

  getRoadmap: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const organizationId = ctx.activeOrganizationId;

      const db = await getDb();
      const roadmap = await db.query.roadmaps.findFirst({
        columns: {
          id: true,
          name: true,
          description: true,
          slug: true,
          tag: true,
          plannedTag: true,
          inProgressTag: true,
          doneTag: true,
          organizationId: true,
        },
        where: eq(roadmaps.slug, input.slug),
        with: {
          repositories: true,
          organization: {
            with: {
              githubInstallation: true,
            },
          },
        },
      });

      if (!roadmap) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      const isMember = roadmap.organizationId === organizationId;

      const installation = installationClient(
        roadmap.organization.githubInstallation.installationId,
      );

      const [issues, voteCounts] = await Promise.all([
        // Get all issues from github
        Promise.all(
          roadmap.repositories.map(async (repository) => {
            const issues = await installation.rest.issues.listForRepo({
              owner: repository.owner,
              repo: repository.repo,
              labels: roadmap.tag,
            });

            return issues.data.map((issue) => ({
              id: issue.id,
              number: issue.number,
              title: issue.title,
              body: issue.body,
              state: issue.state,
              updated_at: issue.updated_at,
              created_at: issue.created_at,
              labels: issue.labels,
              ...(isMember && {
                html_url: issue.html_url,
              }),
            }));
          }),
        ),
        // Get aggregated vote counts for all issues
        db
          .select({
            issueId: issueVotes.issueId,
            count: sql<number>`count(*)`,
          })
          .from(issueVotes)
          .where(eq(issueVotes.roadmapId, roadmap.id))
          .groupBy(issueVotes.issueId),
      ]);

      // Create a plain object of issueId to vote count
      const voteCountObject = Object.fromEntries(
        voteCounts.map((vote) => [vote.issueId, vote.count]),
      );

      const standardizedIssues = issues.flatMap((issueArray) =>
        issueArray.map((issue) => ({
          ...issue,
          voteCount: voteCountObject[issue.id] || 0,
        })),
      );

      return {
        ...roadmap,
        issues: standardizedIssues,
        timestamp: Date.now(),
      };
    }),

  createVote: publicProcedure
    .input(
      z.object({
        roadmapId: z.string(),
        issueId: z.string(),
        organizationId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const db = await getDb();

      // Verify the roadmap exists and belongs to the organization
      const roadmap = await db
        .select()
        .from(roadmaps)
        .where(
          and(
            eq(roadmaps.id, input.roadmapId),
            eq(roadmaps.organizationId, input.organizationId),
          ),
        )
        .limit(1);

      if (roadmap.length === 0) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      // Create the vote
      const vote = await db
        .insert(issueVotes)
        .values({
          id: nanoid(),
          organizationId: input.organizationId,
          roadmapId: input.roadmapId,
          issueId: input.issueId,
        })
        .returning();

      return vote[0];
    }),

  deleteVote: publicProcedure
    .input(
      z.object({
        voteId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const db = await getDb();

      // Delete the vote
      const deletedVote = await db
        .delete(issueVotes)
        .where(eq(issueVotes.id, input.voteId))
        .returning();

      if (deletedVote.length === 0) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return { success: true };
    }),
});
