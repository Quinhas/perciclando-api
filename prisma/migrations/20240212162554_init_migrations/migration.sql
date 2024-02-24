-- CreateEnum
CREATE TYPE "MemberType" AS ENUM ('MUSICIAN', 'MODERATOR', 'ADMIN');

-- CreateTable
CREATE TABLE "tickets" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "number" INTEGER NOT NULL,
    "createdById" UUID NOT NULL,
    "validatedAt" TIMESTAMP,
    "validatedById" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_tickets" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" UUID NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR NOT NULL,
    "roles" "MemberType"[],
    "isDisabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_members" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_username_key" ON "members"("username");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_validatedById_fkey" FOREIGN KEY ("validatedById") REFERENCES "members"("id") ON DELETE SET NULL ON UPDATE CASCADE;
