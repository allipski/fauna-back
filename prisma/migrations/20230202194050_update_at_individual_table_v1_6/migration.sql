-- AlterTable
ALTER TABLE "Individual" ALTER COLUMN "onRehab" SET DEFAULT true,
ALTER COLUMN "releaseDate" DROP NOT NULL,
ALTER COLUMN "monitorInterval" DROP NOT NULL,
ALTER COLUMN "lastMonitoDate" DROP NOT NULL;
