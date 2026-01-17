/*
  Warnings:

  - You are about to drop the column `championId` on the `Role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_championId_fkey";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "championId";
