-- CreateTable
CREATE TABLE `archived_vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `make` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `license_plate` VARCHAR(191) NOT NULL,
    `picture_url` VARCHAR(191) NULL,
    `vin_number` VARCHAR(191) NOT NULL,
    `deleted_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `archived_vehicle_vin_number_key`(`vin_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
