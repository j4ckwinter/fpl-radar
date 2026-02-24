-- DropTable
DROP TABLE IF EXISTS "Healthcheck";

-- CreateTable
CREATE TABLE "FplBootstrapSnapshot" (
    "id" TEXT NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT NOT NULL DEFAULT 'bootstrap-static',
    "hash" TEXT,
    "teamsCount" INTEGER NOT NULL,
    "playersCount" INTEGER NOT NULL,
    "positionsCount" INTEGER NOT NULL,
    "gameweeksCount" INTEGER NOT NULL,

    CONSTRAINT "FplBootstrapSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FplTeam" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "code" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FplTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FplPosition" (
    "id" INTEGER NOT NULL,
    "shortName" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FplPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FplGameweek" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "deadlineTime" TIMESTAMP(3) NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "isCurrent" BOOLEAN NOT NULL,
    "isNext" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FplGameweek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FplPlayer" (
    "id" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "positionId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "secondName" TEXT NOT NULL,
    "webName" TEXT NOT NULL,
    "nowCost" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "news" TEXT,
    "selectedByPercent" DOUBLE PRECISION,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FplPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FplPlayer_teamId_idx" ON "FplPlayer"("teamId");

-- CreateIndex
CREATE INDEX "FplPlayer_positionId_idx" ON "FplPlayer"("positionId");

-- AddForeignKey
ALTER TABLE "FplPlayer" ADD CONSTRAINT "FplPlayer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "FplTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FplPlayer" ADD CONSTRAINT "FplPlayer_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "FplPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
