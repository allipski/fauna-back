/*
  Warnings:

  - You are about to drop the column `lastMonitoDate` on the `Individual` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Individual" DROP COLUMN "lastMonitoDate",
ADD COLUMN     "lastMonitorDate" TIMESTAMP(3);
