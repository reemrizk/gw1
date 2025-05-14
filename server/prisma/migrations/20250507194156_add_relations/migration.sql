/*
  Warnings:

  - You are about to drop the column `assocID` on the `appliancein` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `appliancein` table. All the data in the column will be lost.
  - You are about to drop the column `deviceID` on the `appliancein` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deviceId]` on the table `ApplianceIn` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `assocId` to the `ApplianceIn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `ApplianceIn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appliancein` DROP COLUMN `assocID`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `deviceID`,
    ADD COLUMN `assocId` VARCHAR(191) NOT NULL,
    ADD COLUMN `deviceId` VARCHAR(191) NOT NULL,
    ADD COLUMN `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `AppDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deviceId` VARCHAR(191) NOT NULL,
    `attribute` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApplianceOut` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deviceId` VARCHAR(191) NOT NULL,
    `assocId` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ApplianceIn_deviceId_key` ON `ApplianceIn`(`deviceId`);

-- AddForeignKey
ALTER TABLE `AppDetails` ADD CONSTRAINT `AppDetails_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `ApplianceIn`(`deviceId`) ON DELETE RESTRICT ON UPDATE CASCADE;
