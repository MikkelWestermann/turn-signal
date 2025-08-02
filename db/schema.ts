import * as authSchema from "./auth.schema";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const users = authSchema.users;
export const sessions = authSchema.sessions;
export const accounts = authSchema.accounts;
export const verifications = authSchema.verifications;
export const organizations = authSchema.organizations;
export const members = authSchema.members;
export const invitations = authSchema.invitations;

// GitHub Integration Schema
export const githubInstallations = sqliteTable('github_installations', {
  installationId: text('installation_id').primaryKey(),
  organizationId: text('organization_id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Manual Zod schemas for GitHub installations
export const insertGithubInstallationSchema = z.object({
  installationId: z.string(),
  organizationId: z.string(),
});

export const selectGithubInstallationSchema = z.object({
  installationId: z.string(),
  organizationId: z.string(),
  createdAt: z.date(),
});
