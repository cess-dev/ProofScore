-- CreateTable
CREATE TABLE "ScoreCache" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "chainId" INTEGER,
    "score" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScoreCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCheck" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "chainId" INTEGER,
    "computedScore" INTEGER NOT NULL,
    "creditTier" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "requesterAppId" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletProfile" (
    "walletAddress" TEXT NOT NULL,
    "firstSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeen" TIMESTAMP(3) NOT NULL,
    "totalTransactions" INTEGER NOT NULL DEFAULT 0,
    "averageTransactionUsd" DOUBLE PRECISION,
    "notes" TEXT,

    CONSTRAINT "WalletProfile_pkey" PRIMARY KEY ("walletAddress")
);

-- CreateIndex
CREATE INDEX "ScoreCache_walletAddress_chainId_idx" ON "ScoreCache"("walletAddress", "chainId");

-- CreateIndex
CREATE UNIQUE INDEX "ScoreCache_walletAddress_chainId_key" ON "ScoreCache"("walletAddress", "chainId");

-- CreateIndex
CREATE INDEX "CreditCheck_walletAddress_timestamp_idx" ON "CreditCheck"("walletAddress", "timestamp");
