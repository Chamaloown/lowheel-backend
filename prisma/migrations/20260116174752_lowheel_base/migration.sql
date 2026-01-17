/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tagLine` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "tagLine" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Success" (
    "id" SERIAL NOT NULL,
    "championId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Success_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Champion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "successId" INTEGER NOT NULL,

    CONSTRAINT "Champion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnSuccesses" (
    "successId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnSuccesses_pkey" PRIMARY KEY ("successId","userId")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "championId" INTEGER NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Success_championId_key" ON "Success"("championId");

-- CreateIndex
CREATE UNIQUE INDEX "Champion_name_key" ON "Champion"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "Success" ADD CONSTRAINT "Success_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnSuccesses" ADD CONSTRAINT "UsersOnSuccesses_successId_fkey" FOREIGN KEY ("successId") REFERENCES "Success"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnSuccesses" ADD CONSTRAINT "UsersOnSuccesses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
