/*
  Warnings:

  - Added the required column `img` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "img" VARCHAR(2000) NOT NULL;
