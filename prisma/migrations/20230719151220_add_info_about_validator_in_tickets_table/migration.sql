-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "validatedAt" TIMESTAMP,
ADD COLUMN     "validatedBy" UUID;

-- RenameForeignKey
ALTER TABLE "tickets" RENAME CONSTRAINT "fk_tickets_users" TO "tickets_createdBy_fkey";

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_validatedBy_fkey" FOREIGN KEY ("validatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
