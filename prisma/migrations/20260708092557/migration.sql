/*
  Warnings:

  - You are about to drop the column `landLoardID` on the `properties` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[landlordID]` on the table `properties` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `landlordID` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_landLoardID_fkey";

-- DropIndex
DROP INDEX "properties_landLoardID_idx";

-- DropIndex
DROP INDEX "properties_landLoardID_key";

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "landLoardID",
ADD COLUMN     "landlordID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "properties_landlordID_key" ON "properties"("landlordID");

-- CreateIndex
CREATE INDEX "properties_landlordID_idx" ON "properties"("landlordID");

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_landlordID_fkey" FOREIGN KEY ("landlordID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
