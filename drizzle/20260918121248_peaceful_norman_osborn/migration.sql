CREATE TABLE `auth` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`code` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`tokenHash` text,
	`createdAt` integer NOT NULL
);
