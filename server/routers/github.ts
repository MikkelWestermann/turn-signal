import { z } from 'zod';
import { router, organizationProcedure, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { getDb } from '../../db';
import { githubInstallations } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { installationClient } from '@/lib/github';
import { roadmaps } from '../../db/schema';

export const githubRouter = router({
  getInstallation: organizationProcedure.query(async ({ ctx }) => {
    const organizationId = ctx.activeOrganizationId;

    const db = await getDb();
    const installation = await db
      .select()
      .from(githubInstallations)
      .where(eq(githubInstallations.organizationId, organizationId))
      .limit(1);

    if (!installation[0]) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    // Verify the installation is still valid
    const client = installationClient(installation[0].installationId);
    try {
      await client.rest.apps.getInstallation({
        installation_id: Number(installation[0].installationId),
      });
    } catch (error) {
      if (error instanceof Error && 'status' in error && error.status === 404) {
        // Delete the installation from the database
        await db
          .delete(githubInstallations)
          .where(eq(githubInstallations.organizationId, organizationId));
        throw new TRPCError({ code: 'NOT_FOUND' });
      }
      throw error;
    }

    return installation[0] || null;
  }),

  getInstallationUrl: organizationProcedure.query(async ({ ctx }) => {
    const state = Buffer.from(
      JSON.stringify({
        organizationId: ctx.activeOrganizationId,
        userId: ctx.user.id,
      }),
    ).toString('base64');

    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID!,
      state,
      redirect_uri: `${process.env.BETTER_AUTH_URL}/api/github/setup`,
    });

    return `https://github.com/apps/${process.env.GITHUB_APP_NAME}/installations/new?${params}`;
  }),

  getRepositories: organizationProcedure.query(async ({ ctx }) => {
    const organizationId = ctx.activeOrganizationId;
    const db = await getDb();
    const installation = await db
      .select()
      .from(githubInstallations)
      .where(eq(githubInstallations.organizationId, organizationId))
      .limit(1);

    if (!installation[0]) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'GitHub installation not found',
      });
    }

    return await installationClient(
      installation[0].installationId,
    ).rest.apps.listReposAccessibleToInstallation({
      per_page: 100,
    });
  }),

  getIssues: organizationProcedure
    .input(
      z.object({
        state: z.enum(['open', 'closed', 'all']).optional().default('open'),
        page: z.number().optional().default(1),
        perPage: z.number().min(1).max(100).optional().default(30),
        repo: z.string(),
        owner: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const organizationId = ctx.activeOrganizationId;

      const db = await getDb();
      const installation = await db
        .select()
        .from(githubInstallations)
        .where(eq(githubInstallations.organizationId, organizationId))
        .limit(1);

      if (!installation[0]) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'GitHub installation not found',
        });
      }

      const issues = await installationClient(
        installation[0].installationId,
      ).rest.issues.listForRepo({
        owner: input.owner,
        repo: input.repo,
        state: input.state,
      });

      return issues;
    }),

  getIssue: organizationProcedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
        issueNumber: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const organizationId = ctx.activeOrganizationId;

      const db = await getDb();
      const installation = await db
        .select()
        .from(githubInstallations)
        .where(eq(githubInstallations.organizationId, organizationId))
        .limit(1);

      if (!installation[0]) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'GitHub installation not found',
        });
      }

      return await installationClient(
        installation[0].installationId,
      ).rest.issues.get({
        owner: input.owner,
        repo: input.repo,
        issue_number: input.issueNumber,
      });
    }),

  getComments: publicProcedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
        issueNumber: z.number(),
        roadmapSlug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const db = await getDb();

      const roadmap = await db.query.roadmaps.findFirst({
        columns: {
          id: true,
          organizationId: true,
          showComments: true,
          showCommentProfiles: true,
        },
        where: eq(roadmaps.slug, input.roadmapSlug),
        with: {
          organization: {
            with: {
              githubInstallation: true,
            },
          },
        },
      });

      if (!roadmap) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Roadmap not found',
        });
      }

      if (!roadmap.showComments) {
        return {
          data: [],
          status: 200,
          headers: {},
          url: '',
        };
      }

      if (!roadmap.organization.githubInstallation) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'GitHub installation not found for this roadmap',
        });
      }

      const installation = installationClient(
        roadmap.organization.githubInstallation.installationId,
      );

      try {
        const comments = await installation.rest.issues.listComments({
          owner: input.owner,
          repo: input.repo,
          issue_number: input.issueNumber,
          per_page: 100,
        });

        // Sanitize the response to only include relevant information
        return {
          ...comments,
          data: comments.data.map((comment: any) => ({
            id: comment.id,
            body: comment.body,
            created_at: comment.created_at,
            updated_at: comment.updated_at,
            user: roadmap.showCommentProfiles
              ? {
                  login: comment.user.login,
                  avatar_url: comment.user.avatar_url,
                }
              : null,
            // Remove other sensitive information
          })),
        };
      } catch (error) {
        if (
          error instanceof Error &&
          'status' in error &&
          error.status === 404
        ) {
          return {
            data: [],
            status: 200,
            headers: {},
            url: '',
          };
        }
        throw error;
      }
    }),
});
