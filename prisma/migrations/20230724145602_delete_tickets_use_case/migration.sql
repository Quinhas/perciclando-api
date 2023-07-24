/*
  Warnings:

  - You are about to drop the column `createdBy` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `validatedBy` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_validatedBy_fkey";

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "createdBy",
DROP COLUMN "validatedBy",
ADD COLUMN     "createdById" UUID NOT NULL,
ADD COLUMN     "validatedById" UUID;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_validatedById_fkey" FOREIGN KEY ("validatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
