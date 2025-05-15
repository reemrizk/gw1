/*
  Warnings:

  - Added the required column `ppmBarcode` to the `ApplianceIn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ppmWritten` to the `ApplianceIn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appliancein` ADD COLUMN `ppmBarcode` VARCHAR(191) NOT NULL,
    ADD COLUMN `ppmWritten` VARCHAR(191) NOT NULL;
