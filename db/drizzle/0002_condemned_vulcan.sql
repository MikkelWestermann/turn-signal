ALTER TABLE `roadmaps` ADD `show_comments` integer DEFAULT true;--> statement-breakpoint
ALTER TABLE `roadmaps` ADD `show_comment_profiles` integer DEFAULT true;--> statement-breakpoint
ALTER TABLE `roadmaps` ADD `closed_issue_behavior` text DEFAULT 'filter';