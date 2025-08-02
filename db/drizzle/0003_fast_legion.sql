CREATE TABLE `github_installations` (
	`installation_id` text PRIMARY KEY NOT NULL,
	`organization_id` text NOT NULL,
	`created_at` integer NOT NULL
);
