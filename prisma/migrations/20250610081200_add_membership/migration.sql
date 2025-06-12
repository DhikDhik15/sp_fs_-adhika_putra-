/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Membership` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,projectId]` on the table `Membership` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_projectId_key" ON "Membership"("userId", "projectId");
