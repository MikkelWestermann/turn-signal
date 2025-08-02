CREATE TABLE `roadmap_repositories` (
	`id` text PRIMARY KEY NOT NULL,
	`roadmap_id` text NOT NULL,
	`owner` text NOT NULL,
	`repo` text NOT NULL,
	`created_at` integer NOT NULL
);
