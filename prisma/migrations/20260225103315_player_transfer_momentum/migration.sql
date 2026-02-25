-- AlterTable
ALTER TABLE "FplPlayer" ADD COLUMN     "transfersInEvent" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "transfersOutEvent" INTEGER NOT NULL DEFAULT 0;
