/*
  Warnings:

  - You are about to drop the column `client_id` on the `claim` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `insurance_policy` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `claim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `insurance_policy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `claim` DROP FOREIGN KEY `claim_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `insurance_policy` DROP FOREIGN KEY `insurance_policy_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `vehicle` DROP FOREIGN KEY `vehicle_client_id_fkey`;

-- AlterTable
ALTER TABLE `claim` DROP COLUMN `client_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `insurance_policy` DROP COLUMN `client_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `vehicle` DROP COLUMN `client_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `client`;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `contact_number` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `insurance_policy` ADD CONSTRAINT `insurance_policy_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicle` ADD CONSTRAINT `vehicle_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim` ADD CONSTRAINT `claim_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
