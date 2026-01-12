/**
 * Score Computation Service
 * Handles reputation score calculation, caching and credit decisions
 */

import { ReputationScore, WalletAddress, ScoreBreakdown } from '../types';
import { krnlService } from './krnl';
import { blockchainService } from './blockchain';
import { prisma } from '../lib/prisma';
import { config } from '../config';
import { logger } from '../lib/logger';
import { creditDecisionEngine } from './credit';
import { Prisma } from '@prisma/client';

const CACHE_TTL_MS = config.SCORE_CACHE_TTL_MINUTES * 60 * 1000;

export class ScoreService {
  async getScore(
    walletAddress: string,
    chainId: number,
    refresh = false
  ): Promise<ReputationScore> {
    if (!blockchainService.isValidAddress(walletAddress)) {
      throw new Error('Invalid wallet address');
    }

    const normalizedAddress = walletAddress.toLowerCase();

    // Skip cache if refresh is requested or if TTL is 0 (real-time mode)
    if (!refresh && config.SCORE_CACHE_TTL_MINUTES > 0) {
      const cached = await this.getCachedScore(normalizedAddress, chainId);
      if (cached) return cached;
    }

    try {
      console.log('Attempting KRNL computation...');
      const { score, proof } =
        await krnlService.computeReputationScore(walletAddress, chainId);
      console.log('KRNL computation succeeded');

      if (proof.proofHash && proof.signature) {
        const verified = await krnlService.verifyProof(
          proof.proofHash,
          proof.signature
        );
        if (!verified) {
          throw new Error('Proof verification failed');
        }
      }

      const enriched = await this.enrichScore(score);

      await Promise.all([
        this.saveCache(normalizedAddress, chainId, enriched),
        this.recordCreditCheck(normalizedAddress, chainId, enriched),
      ]);

      return enriched;
    } catch (error) {
      console.error('KRNL computation failed:', error);
      logger.warn({ err: error }, 'KRNL computation failed');

      if (process.env.NODE_ENV === 'development') {
        console.log('Using fallback computeBasicScore...');
        const fallback = await this.computeBasicScore(
          walletAddress,
          chainId
        );
        console.log('Fallback returned:', fallback);

        const enriched = await this.enrichScore(fallback);

        await Promise.all([
          this.saveCache(normalizedAddress, chainId, enriched),
          this.recordCreditCheck(normalizedAddress, chainId, enriched),
        ]);

        return enriched;
      }

      throw error;
    }
  }

  private async getCachedScore(
    walletAddress: string,
    chainId: number
  ): Promise<ReputationScore | null> {
    try {
      const record = await prisma.scoreCache.findUnique({
        where: {
          walletAddress_chainId: {
            walletAddress,
            chainId,
          },
        },
      });

      if (!record) return null;

      if (record.expiresAt.getTime() < Date.now()) {
        await prisma.scoreCache.delete({ where: { id: record.id } }).catch(() => {});
        return null;
      }

      return record.score as unknown as ReputationScore;
    } catch (error) {
      logger.warn({ err: error }, 'Failed to get cached score, continuing without cache');
      return null;
    }
  }

  private async saveCache(
    walletAddress: string,
    chainId: number,
    score: ReputationScore
  ): Promise<void> {
    try {
      const jsonScore = score as unknown as Prisma.InputJsonValue;

      await prisma.scoreCache.upsert({
        where: {
          walletAddress_chainId: {
            walletAddress,
            chainId,
          },
        },
        create: {
          walletAddress,
          chainId,
          score: jsonScore,
          expiresAt: new Date(Date.now() + CACHE_TTL_MS),
        },
        update: {
          score: jsonScore,
          expiresAt: new Date(Date.now() + CACHE_TTL_MS),
        },
      });
    } catch (error) {
      logger.warn({ err: error }, 'Failed to save cache, continuing without caching');
    }
  }

  private async recordCreditCheck(
    walletAddress: string,
    chainId: number,
    score: ReputationScore
  ): Promise<void> {
    if (!score.creditDecision) return;

    try {
      await prisma.creditCheck.create({
        data: {
          walletAddress,
          chainId,
          computedScore: score.score,
          creditTier: score.creditDecision.tier,
          riskLevel: score.creditDecision.risk,
          metadata: {
            breakdown: score.breakdown,
            metadata: score.metadata,
          } as unknown as Prisma.InputJsonValue,
        },
      });
    } catch (error) {
      logger.warn({ err: error }, 'Failed to record credit check, continuing');
    }
  }

  private async enrichScore(
    score: ReputationScore
  ): Promise<ReputationScore> {
    const decision = creditDecisionEngine.evaluate(score);
    return { ...score, creditDecision: decision };
  }

  private async computeBasicScore(
    walletAddress: string,
    chainId: number
  ): Promise<ReputationScore> {
    let metrics;
    
    try {
      console.log(`Fetching wallet metrics for: ${walletAddress} on chain: ${chainId}`);
      metrics = await blockchainService.getWalletMetrics(walletAddress, chainId);
      console.log(`Received metrics:`, metrics);
    } catch (error) {
      // If blockchain provider is not available, use default metrics
      console.error('Error in computeBasicScore:', error);
      logger.warn({ err: error }, 'Blockchain provider unavailable, using default metrics');
      metrics = {
        totalTransactions: 0,
        averageTransactionValue: '0',
        lastActivity: new Date().toISOString(),
      };
    }

    const breakdown: ScoreBreakdown = {
      transactionConsistency: Math.min(metrics.totalTransactions ?? 0, 1000),
      repaymentHistory: 500,
      stakingBehavior: 500,
      governanceParticipation: 500,
      riskFactors: [],
    };

    const scoreValue = Math.round(
      breakdown.transactionConsistency * 0.4 +
        breakdown.repaymentHistory * 0.3 +
        breakdown.stakingBehavior * 0.2 +
        breakdown.governanceParticipation * 0.1
    );

    return {
      walletAddress,
      score: scoreValue,
      confidence: 0.5,
      lastUpdated: new Date().toISOString(),
      breakdown,
      metadata: {
        totalTransactions: metrics.totalTransactions ?? 0,
        accountAge: 0,
        chains: [chainId.toString()],
      },
    };
  }

  async getBatchScores(
    wallets: WalletAddress[]
  ): Promise<ReputationScore[]> {
    return Promise.all(
      wallets.map(w =>
        this.getScore(w.address, w.chainId ?? 1)
      )
      
    );
  }

  async clearCache(
    walletAddress: string,
    chainId: number
  ): Promise<void> {
    try {
      await prisma.scoreCache.deleteMany({
        where: {
          walletAddress: walletAddress.toLowerCase(),
          chainId,
        },
      });
    } catch (error) {
      logger.warn({ err: error }, 'Failed to clear cache');
      throw error;
    }
  }

  async ingestScore(
    score: ReputationScore,
    chainId: number
  ): Promise<ReputationScore> {
    const normalized = score.walletAddress.toLowerCase();
    const enriched = await this.enrichScore(score);

    await Promise.all([
      this.saveCache(normalized, chainId, enriched),
      this.recordCreditCheck(normalized, chainId, enriched),
    ]);

    return enriched;
  }

  private async trackWallet(
    address: string,
    totalTransactions: number,
    averageValue?: string
  ): Promise<void> {
    try {
      await prisma.walletProfile.upsert({
        where: { walletAddress: address.toLowerCase() },
        update: {
          totalTransactions,
          averageTransactionUsd: averageValue
            ? parseFloat(averageValue)
            : undefined,
        },
        create: {
          walletAddress: address.toLowerCase(),
          totalTransactions,
          averageTransactionUsd: averageValue
            ? parseFloat(averageValue)
            : undefined,
        },
      });
    } catch (err) {
      logger.warn({ err }, 'Failed to track wallet activity');
    }
  }
}

export const scoreService = new ScoreService();
