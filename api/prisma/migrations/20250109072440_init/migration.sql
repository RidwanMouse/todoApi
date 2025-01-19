/*
  Warnings:

  - Added the required column `userid` to the `Todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todos` ADD COLUMN `userid` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Users` (
    `userid` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`userid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Todos` ADD CONSTRAINT `Todos_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `Users`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;
