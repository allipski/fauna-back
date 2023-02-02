/*
  Warnings:

  - Added the required column `img` to the `Individual` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Individual" ADD COLUMN     "img" VARCHAR(2000) NOT NULL;
