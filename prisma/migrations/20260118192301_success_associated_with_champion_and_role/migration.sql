/*
  Warnings:

  - You are about to drop the column `successId` on the `Champion` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[championId,roleId]` on the table `Success` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleId` to the `Success` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Success_championId_key";

-- AlterTable
ALTER TABLE "Champion" DROP COLUMN "successId",
ADD COLUMN     "imgUrl" TEXT;

-- AlterTable
ALTER TABLE "Success" ADD COLUMN     "roleId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Success_championId_roleId_key" ON "Success"("championId", "roleId");

-- AddForeignKey
ALTER TABLE "Success" ADD CONSTRAINT "Success_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
