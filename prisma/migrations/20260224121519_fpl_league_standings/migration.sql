-- CreateTable
CREATE TABLE "FplLeague" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FplLeague_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FplLeagueEntry" (
    "id" INTEGER NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "entryName" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "lastRank" INTEGER,
    "totalPoints" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FplLeagueEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FplLeagueEntry_leagueId_idx" ON "FplLeagueEntry"("leagueId");

-- CreateIndex
CREATE INDEX "FplLeagueEntry_leagueId_rank_idx" ON "FplLeagueEntry"("leagueId", "rank");

-- AddForeignKey
ALTER TABLE "FplLeagueEntry" ADD CONSTRAINT "FplLeagueEntry_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "FplLeague"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
