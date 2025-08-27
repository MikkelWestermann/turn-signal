import { relations } from 'drizzle-orm';
import * as authSchema from './auth.schema';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { z } from 'zod';

// ********************************************************
// Auth Schema
// ********************************************************

export const users = authSchema.users;
export const sessions = authSchema.sessions;
export const accounts = authSchema.accounts;
export const verifications = authSchema.verifications;
export const organizations = authSchema.organizations;
export const members = authSchema.members;
export const invitations = authSchema.invitations;

// ********************************************************
// GitHub Integration
// ********************************************************

export const githubInstallations = sqliteTable('github_installations', {
  installationId: text('installation_id').primaryKey(),
  organizationId: text('organization_id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const insertGithubInstallationSchema = z.object({
  installationId: z.string(),
  organizationId: z.string(),
});

export const selectGithubInstallationSchema = z.object({
  installationId: z.string(),
  organizationId: z.string(),
  createdAt: z.date(),
});

export const githubInstallationRelations = relations(
  githubInstallations,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [githubInstallations.organizationId],
      references: [organizations.id],
    }),
  }),
);

export const organizationRelations = relations(organizations, ({ one }) => ({
  githubInstallation: one(githubInstallations, {
    fields: [organizations.id],
    references: [githubInstallations.organizationId],
  }),
}));

// ********************************************************
// Roadmap
// ********************************************************

export const roadmaps = sqliteTable('roadmaps', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  slug: text('slug').notNull().unique(),
  plannedTag: text('planned_tag').default('planned'),
  inProgressTag: text('in_progress_tag').default('in progress'),
  doneTag: text('done_tag').default('done'),
  showComments: integer('show_comments', { mode: 'boolean' }).default(true),
  showCommentProfiles: integer('show_comment_profiles', {
    mode: 'boolean',
  }).default(true),
  closedIssueBehavior: text('closed_issue_behavior')
    .default('filter')
    .$type<'filter' | 'label' | 'done'>(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const roadmapRepositories = sqliteTable('roadmap_repositories', {
  id: text('id').primaryKey(),
  roadmapId: text('roadmap_id').notNull(),
  owner: text('owner').notNull(),
  repo: text('repo').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const issueVotes = sqliteTable('issue_votes', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull(),
  roadmapId: text('roadmap_id').notNull(),
  issueId: text('issue_id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const roadmapRelations = relations(roadmaps, ({ many, one }) => ({
  repositories: many(roadmapRepositories),
  issueVotes: many(issueVotes),
  organization: one(organizations, {
    fields: [roadmaps.organizationId],
    references: [organizations.id],
  }),
}));

export const roadmapRepositoryRelations = relations(
  roadmapRepositories,
  ({ one }) => ({
    roadmap: one(roadmaps, {
      fields: [roadmapRepositories.roadmapId],
      references: [roadmaps.id],
    }),
  }),
);

export const issueVotesRelations = relations(issueVotes, ({ one }) => ({
  roadmap: one(roadmaps, {
    fields: [issueVotes.roadmapId],
    references: [roadmaps.id],
  }),
  organization: one(organizations, {
    fields: [issueVotes.organizationId],
    references: [organizations.id],
  }),
}));
