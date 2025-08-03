ALTER TABLE `issue_votes` ADD `roadmap_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `issue_votes` DROP COLUMN `ip_address`;