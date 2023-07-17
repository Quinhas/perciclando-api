-- CreateTable
CREATE TABLE "tickets" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "ticketNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_tickets" PRIMARY KEY ("id")
);
