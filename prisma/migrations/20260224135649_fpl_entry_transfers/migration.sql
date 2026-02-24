-- CreateTable
CREATE TABLE "FplEntryTransfer" (
    "id" TEXT NOT NULL,
    "entryId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "playerInId" INTEGER NOT NULL,
    "playerOutId" INTEGER NOT NULL,
    "value" INTEGER,
    "bank" INTEGER,
    "cost" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FplEntryTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FplEntryBehaviourProfile" (
    "entryId" INTEGER NOT NULL,
    "transfersCount" INTEGER NOT NULL,
    "hitsCount" INTEGER NOT NULL,
    "totalHitCost" INTEGER NOT NULL,
    "avgTransfersPerGw" DOUBLE PRECISION NOT NULL,
    "hitRate" DOUBLE PRECISION NOT NULL,
    "lastTransferAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FplEntryBehaviourProfile_pkey" PRIMARY KEY ("entryId")
);

-- CreateIndex
CREATE INDEX "FplEntryTransfer_entryId_eventId_idx" ON "FplEntryTransfer"("entryId", "eventId");

-- CreateIndex
CREATE INDEX "FplEntryTransfer_playerInId_idx" ON "FplEntryTransfer"("playerInId");

-- CreateIndex
CREATE INDEX "FplEntryTransfer_playerOutId_idx" ON "FplEntryTransfer"("playerOutId");

-- CreateIndex
CREATE UNIQUE INDEX "FplEntryTransfer_entryId_eventId_time_playerInId_playerOutI_key" ON "FplEntryTransfer"("entryId", "eventId", "time", "playerInId", "playerOutId");

-- AddForeignKey
ALTER TABLE "FplEntryTransfer" ADD CONSTRAINT "FplEntryTransfer_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "FplLeagueEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FplEntryTransfer" ADD CONSTRAINT "FplEntryTransfer_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "FplGameweek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FplEntryTransfer" ADD CONSTRAINT "FplEntryTransfer_playerInId_fkey" FOREIGN KEY ("playerInId") REFERENCES "FplPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FplEntryTransfer" ADD CONSTRAINT "FplEntryTransfer_playerOutId_fkey" FOREIGN KEY ("playerOutId") REFERENCES "FplPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FplEntryBehaviourProfile" ADD CONSTRAINT "FplEntryBehaviourProfile_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "FplLeagueEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
