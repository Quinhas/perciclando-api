/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "members" ADD COLUMN     "name" VARCHAR(150) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "members_name_key" ON "members"("name");
