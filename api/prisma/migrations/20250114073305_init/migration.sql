/*
  Warnings:

  - You are about to drop the column `userid` on the `todos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `todos` DROP FOREIGN KEY `Todos_userid_fkey`;

-- DropIndex
DROP INDEX `Todos_userid_fkey` ON `todos`;

-- AlterTable
ALTER TABLE `todos` DROP COLUMN `userid`;
