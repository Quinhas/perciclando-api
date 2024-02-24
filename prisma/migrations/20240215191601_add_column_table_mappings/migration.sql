/*
  Warnings:

  - You are about to drop the column `createdAt` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `isDisabled` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `validatedAt` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `validatedById` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_createdById_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_validatedById_fkey";

-- AlterTable
ALTER TABLE "members" DROP COLUMN "createdAt",
DROP COLUMN "isDisabled",
DROP COLUMN "photoUrl",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "photo_url" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "createdAt",
DROP COLUMN "createdById",
DROP COLUMN "updatedAt",
DROP COLUMN "validatedAt",
DROP COLUMN "validatedById",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" UUID NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "validated_at" TIMESTAMP,
ADD COLUMN     "validated_by" UUID;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_validated_by_fkey" FOREIGN KEY ("validated_by") REFERENCES "members"("id") ON DELETE SET NULL ON UPDATE CASCADE;
