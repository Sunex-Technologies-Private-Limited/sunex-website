CREATE TABLE `contact_rate_limit_buckets` (
	`bucket` varchar(128) NOT NULL,
	`windowStart` timestamp NOT NULL,
	`requestCount` int NOT NULL DEFAULT 0,
	`expiresAt` timestamp NOT NULL,
	CONSTRAINT `contact_rate_limit_buckets_bucket` PRIMARY KEY(`bucket`)
);
--> statement-breakpoint
CREATE INDEX `contact_rate_limit_buckets_expires_at_idx` ON `contact_rate_limit_buckets` (`expiresAt`);