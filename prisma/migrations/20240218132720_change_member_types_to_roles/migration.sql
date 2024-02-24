/*
  Warnings:

  - The `roles` column on the `members` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('MUSICIAN', 'MODERATOR', 'ADMIN');

-- AlterTable
ALTER TABLE "members" DROP COLUMN "roles",
ADD COLUMN     "roles" "MemberRole"[];

-- DropEnum
DROP TYPE "MemberType";
