/*
  Warnings:

  - You are about to drop the column `ticketNumber` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `number` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "ticketNumber",
ADD COLUMN     "number" INTEGER NOT NULL;
