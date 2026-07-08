/*
  Warnings:

  - You are about to drop the column `landlordID` on the `properties` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[landlordId]` on the table `properties` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `landlordId` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_landlordID_fkey";

-- DropIndex
DROP INDEX "properties_landlordID_idx";

-- DropIndex
DROP INDEX "properties_landlordID_key";

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "landlordID",
ADD COLUMN     "landlordId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "properties_landlordId_key" ON "properties"("landlordId");

-- CreateIndex
CREATE INDEX "properties_landlordId_idx" ON "properties"("landlordId");

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
