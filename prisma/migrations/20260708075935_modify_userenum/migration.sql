/*
  Warnings:

  - The values [BLOCK] on the enum `UserActiveStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserActiveStatus_new" AS ENUM ('ACTIVE', 'BLOCKED');
ALTER TABLE "public"."users" ALTER COLUMN "activeStatus" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "activeStatus" TYPE "UserActiveStatus_new" USING ("activeStatus"::text::"UserActiveStatus_new");
ALTER TYPE "UserActiveStatus" RENAME TO "UserActiveStatus_old";
ALTER TYPE "UserActiveStatus_new" RENAME TO "UserActiveStatus";
DROP TYPE "public"."UserActiveStatus_old";
ALTER TABLE "users" ALTER COLUMN "activeStatus" SET DEFAULT 'ACTIVE';
COMMIT;
