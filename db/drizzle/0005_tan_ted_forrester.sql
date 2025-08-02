ALTER TABLE `roadmaps` ADD `slug` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `roadmaps_slug_unique` ON `roadmaps` (`slug`);