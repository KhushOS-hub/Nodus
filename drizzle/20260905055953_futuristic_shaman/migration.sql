CREATE TABLE `files` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`originalName` text NOT NULL,
	`storedName` text NOT NULL UNIQUE,
	`mimeType` text NOT NULL,
	`size` integer NOT NULL,
	`path` text NOT NULL,
	`folderId` integer NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	CONSTRAINT `fk_files_folderId_folders_id_fk` FOREIGN KEY (`folderId`) REFERENCES `folders`(`id`)
);
--> statement-breakpoint
CREATE TABLE `folders` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`parentId` integer,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `folders_parent_id_name_unique` ON `folders` (`parentId`,`name`);