CREATE TABLE `issue_votes` (
	`id` text PRIMARY KEY NOT NULL,
	`organization_id` text NOT NULL,
	`issue_id` text NOT NULL,
	`ip_address` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `roadmaps` (
	`id` text PRIMARY KEY NOT NULL,
	`organization_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`tag` text NOT NULL,
	`planned_tag` text DEFAULT 'planned',
	`in_progress_tag` text DEFAULT 'in progress',
	`done_tag` text DEFAULT 'done',
	`created_at` integer NOT NULL
);
