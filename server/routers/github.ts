import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../../db";
import { githubInstallations, members } from "../../db/schema";
import { eq, and } from "drizzle-orm";
import { installationClient } from "@/lib/github";

export const githubRouter = router({
  /**
   * Get GitHub installation for organization (if exists)
   */
  getInstallation: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      // Verify user has access to organization
      const hasAccess = await verifyOrganizationAccess(
        ctx.user.id,
        input.organizationId
      );
      if (!hasAccess) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const db = await getDb();
      const installation = await db
        .select()
        .from(githubInstallations)
        .where(eq(githubInstallations.organizationId, input.organizationId))
        .limit(1);

      // Verify the installation is still valid
      const client = installationClient(installation[0].installationId);
      try {
        await client.rest.apps.getInstallation({
          installation_id: Number(installation[0].installationId),
        });
      } catch (error) {
        if (
          error instanceof Error &&
          "status" in error &&
          error.status === 404
        ) {
          // Delete the installation from the database
          await db
            .delete(githubInstallations)
            .where(
              eq(githubInstallations.organizationId, input.organizationId)
            );
          throw new TRPCError({ code: "NOT_FOUND" });
        }
        throw error;
      }

      return installation[0] || null;
    }),

  /**
   * Get installation URL for GitHub App
   */
  getInstallationUrl: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const hasAccess = await verifyOrganizationAccess(
        ctx.user.id,
        input.organizationId
      );
      if (!hasAccess) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const state = Buffer.from(
        JSON.stringify({
          organizationId: input.organizationId,
          userId: ctx.user.id,
        })
      ).toString("base64");

      const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        state,
        redirect_uri: `${process.env.BETTER_AUTH_URL}/api/github/setup`,
      });

      return `https://github.com/apps/${process.env.GITHUB_APP_NAME}/installations/new?${params}`;
    }),

  /**
   * Get repositories for installation (fresh from GitHub API)
   */
  getRepositories: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const hasAccess = await verifyOrganizationAccess(
        ctx.user.id,
        input.organizationId
      );
      if (!hasAccess) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const db = await getDb();
      const installation = await db
        .select()
        .from(githubInstallations)
        .where(eq(githubInstallations.organizationId, input.organizationId))
        .limit(1);

      if (!installation[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "GitHub installation not found",
        });
      }

      return await installationClient(
        installation[0].installationId
      ).rest.apps.listReposAccessibleToInstallation({
        per_page: 100,
      });
    }),

  /**
   * Get issues for a repository (fresh from GitHub API)
   */
  getIssues: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
        state: z.enum(["open", "closed", "all"]).optional().default("open"),
        page: z.number().optional().default(1),
        perPage: z.number().min(1).max(100).optional().default(30),
        repo: z.string(),
        owner: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const hasAccess = await verifyOrganizationAccess(
        ctx.user.id,
        input.organizationId
      );
      if (!hasAccess) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const db = await getDb();
      const installation = await db
        .select()
        .from(githubInstallations)
        .where(eq(githubInstallations.organizationId, input.organizationId))
        .limit(1);

      if (!installation[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "GitHub installation not found",
        });
      }

      const issues = await installationClient(
        installation[0].installationId
      ).rest.issues.listForRepo({
        owner: input.owner,
        repo: input.repo,
        state: input.state,
      });

      return issues;
    }),

  /**
   * Get specific issue (fresh from GitHub API)
   */
  getIssue: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
        owner: z.string(),
        repo: z.string(),
        issueNumber: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const hasAccess = await verifyOrganizationAccess(
        ctx.user.id,
        input.organizationId
      );
      if (!hasAccess) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const db = await getDb();
      const installation = await db
        .select()
        .from(githubInstallations)
        .where(eq(githubInstallations.organizationId, input.organizationId))
        .limit(1);

      if (!installation[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "GitHub installation not found",
        });
      }

      return await installationClient(
        installation[0].installationId
      ).rest.issues.get({
        owner: input.owner,
        repo: input.repo,
        issue_number: input.issueNumber,
      });
    }),
});

// Helper function to verify organization access
async function verifyOrganizationAccess(
  userId: string,
  organizationId: string
): Promise<boolean> {
  const db = await getDb();
  const member = await db
    .select()
    .from(members)
    .where(
      and(
        eq(members.userId, userId),
        eq(members.organizationId, organizationId)
      )
    )
    .limit(1);

  return member.length > 0;
}
