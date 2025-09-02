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

  getAllPublic: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(12),
      }),
    )
    .query(async ({ input }) => {
      const db = await getDb();
      const offset = (input.page - 1) * input.limit;

      const [roadmapsList, totalCount] = await Promise.all([
        db
          .select({
            id: roadmaps.id,
            name: roadmaps.name,
            description: roadmaps.description,
            slug: roadmaps.slug,
            createdAt: roadmaps.createdAt,
            organizationId: roadmaps.organizationId,
          })
          .from(roadmaps)
          .orderBy(roadmaps.createdAt)
          .limit(input.limit)
          .offset(offset),
        db.select({ count: sql<number>`count(*)` }).from(roadmaps),
      ]);

      const total = totalCount[0]?.count || 0;
      const totalPages = Math.ceil(total / input.limit);

      return {
        roadmaps: roadmapsList,
        pagination: {
          page: input.page,
          limit: input.limit,
          total,
          totalPages,
          hasNext: input.page < totalPages,
          hasPrev: input.page > 1,
        },
      };
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
        link: z.string().url().optional().or(z.literal('')),
        plannedTag: z.string().optional(),
        inProgressTag: z.string().optional(),
        doneTag: z.string().optional(),
        showComments: z.boolean().optional(),
        showCommentProfiles: z.boolean().optional(),
        closedIssueBehavior: z.enum(['filter', 'label', 'done']).optional(),
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
          link: input.link || null,
          plannedTag: input.plannedTag || 'planned',
          inProgressTag: input.inProgressTag || 'in progress',
          doneTag: input.doneTag || 'done',
          showComments: input.showComments ?? true,
          showCommentProfiles: input.showCommentProfiles ?? true,
          closedIssueBehavior: input.closedIssueBehavior || 'filter',
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
        link: z.string().url().optional().or(z.literal('')).optional(),
        plannedTag: z.string().optional(),
        inProgressTag: z.string().optional(),
        doneTag: z.string().optional(),
        showComments: z.boolean().optional(),
        showCommentProfiles: z.boolean().optional(),
        closedIssueBehavior: z.enum(['filter', 'label', 'done']).optional(),
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
      if (input.link !== undefined) updateData.link = input.link || null;
      if (input.plannedTag !== undefined)
        updateData.plannedTag = input.plannedTag;
      if (input.inProgressTag !== undefined)
        updateData.inProgressTag = input.inProgressTag;
      if (input.doneTag !== undefined) updateData.doneTag = input.doneTag;
      if (input.showComments !== undefined)
        updateData.showComments = input.showComments;
      if (input.showCommentProfiles !== undefined)
        updateData.showCommentProfiles = input.showCommentProfiles;
      if (input.closedIssueBehavior !== undefined)
        updateData.closedIssueBehavior = input.closedIssueBehavior;

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
          link: true,
          plannedTag: true,
          inProgressTag: true,
          doneTag: true,
          organizationId: true,
          showComments: true,
          showCommentProfiles: true,
          closedIssueBehavior: true,
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
        Promise.all(
          roadmap.repositories.map(async (repository) => {
            const allStatusTags = [
              roadmap.plannedTag,
              roadmap.inProgressTag,
              roadmap.doneTag,
            ].filter(Boolean);

            if (allStatusTags.length === 0) {
              return [];
            }

            const labelQuery = allStatusTags
              .map((label) => `"${label}"`)
              .join(',');

            // Build search query based on closed issue behavior
            let searchQuery = `repo:${repository.owner}/${repository.repo} is:issue label:${labelQuery}`;

            if (roadmap.closedIssueBehavior === 'filter') {
              // Filter out closed issues
              searchQuery += ' is:open';
            } else if (roadmap.closedIssueBehavior === 'label') {
              // Include both open and closed issues, but closed ones will be filtered by label
              searchQuery += ' is:issue';
            } else if (roadmap.closedIssueBehavior === 'done') {
              // Include both open and closed issues, closed ones will go to done column
              searchQuery += ' is:issue';
            }

            const searchResult =
              await installation.rest.search.issuesAndPullRequests({
                q: searchQuery,
                per_page: 100,
              });

            return searchResult.data.items.map((issue) => ({
              id: issue.id,
              number: issue.number,
              title: issue.title,
              body: issue.body,
              state: issue.state,
              updated_at: issue.updated_at,
              created_at: issue.created_at,
              labels: issue.labels,
              comments: issue.comments,
              repository: {
                owner: repository.owner,
                name: repository.repo,
              },
              ...(isMember && {
                html_url: issue.html_url,
                assignees: issue.assignees,
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
