-- CreateTable
CREATE TABLE "FplEntrySnapshot" (
    "id" TEXT NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "entryId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "bank" INTEGER,
    "teamValue" INTEGER,
    "eventTransfers" INTEGER,
    "eventTransfersCost" INTEGER,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FplEntrySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FplEntryPick" (
    "id" TEXT NOT NULL,
    "snapshotId" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,
    "pickPosition" INTEGER NOT NULL,
    "multiplier" INTEGER NOT NULL,
    "isCaptain" BOOLEAN NOT NULL,
    "isViceCaptain" BOOLEAN NOT NULL,

    CONSTRAINT "FplEntryPick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FplEntrySnapshot_leagueId_eventId_idx" ON "FplEntrySnapshot"("leagueId", "eventId");

-- CreateIndex
CREATE INDEX "FplEntrySnapshot_entryId_eventId_idx" ON "FplEntrySnapshot"("entryId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "FplEntrySnapshot_leagueId_entryId_eventId_key" ON "FplEntrySnapshot"("leagueId", "entryId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "FplEntryPick_snapshotId_pickPosition_key" ON "FplEntryPick"("snapshotId", "pickPosition");

-- AddForeignKey
ALTER TABLE "FplEntrySnapshot" ADD CONSTRAINT "FplEntrySnapshot_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "FplLeague"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FplEntrySnapshot" ADD CONSTRAINT "FplEntrySnapshot_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "FplGameweek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FplEntryPick" ADD CONSTRAINT "FplEntryPick_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "FplEntrySnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
