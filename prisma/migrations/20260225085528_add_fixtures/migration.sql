-- CreateTable
CREATE TABLE "FplFixture" (
    "id" INTEGER NOT NULL,
    "eventId" INTEGER,
    "teamHId" INTEGER NOT NULL,
    "teamAId" INTEGER NOT NULL,
    "teamHDifficulty" INTEGER NOT NULL,
    "teamADifficulty" INTEGER NOT NULL,
    "kickoffTime" TIMESTAMP(3),
    "finished" BOOLEAN NOT NULL,

    CONSTRAINT "FplFixture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FplFixture_eventId_idx" ON "FplFixture"("eventId");

-- CreateIndex
CREATE INDEX "FplFixture_teamHId_idx" ON "FplFixture"("teamHId");

-- CreateIndex
CREATE INDEX "FplFixture_teamAId_idx" ON "FplFixture"("teamAId");
