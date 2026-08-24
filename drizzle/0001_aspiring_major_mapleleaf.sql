ALTER TABLE `contact_inquiries` ADD `idempotencyKey` varchar(72);--> statement-breakpoint
ALTER TABLE `contact_inquiries` ADD COLUMN `idempotencyKey` varchar(72);
--> statement-breakpoint
ALTER TABLE `contact_inquiries` ADD CONSTRAINT `contact_inquiries_idempotencyKey_unique` UNIQUE(`idempotencyKey`);
