-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('OPEN', 'PROCESSING', 'CLOSED');

-- CreateTable
CREATE TABLE "public"."admins" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Admin',

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."technicians" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePhoto" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "technicians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."clients" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePhoto" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tickets" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "technicianId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "initialCost" DECIMAL(65,30) NOT NULL DEFAULT 200.00,
    "status" "public"."Status" NOT NULL DEFAULT 'OPEN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ticket_costs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "ticketId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_costs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."tickets" ADD CONSTRAINT "tickets_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tickets" ADD CONSTRAINT "tickets_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tickets" ADD CONSTRAINT "tickets_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "public"."technicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ticket_costs" ADD CONSTRAINT "ticket_costs_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "public"."tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
