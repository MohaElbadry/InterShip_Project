-- AlterTable
ALTER TABLE `claim` MODIFY `claim_number` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'waiting',
    MODIFY `amount_claimed` DOUBLE NULL;
