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

const CACHE_TTL_MS = config.SCORE_CACHE_TTL_MINUTES * 60 * 1000;

export class ScoreService {
  /**
   * Get or compute reputation score for a wallet
   */
  async getScore(walletAddress: string, chainId?: number, refresh: boolean = false): Promise<ReputationScore> {
    const normalizedAddress = walletAddress.toLowerCase();

    if (!blockchainService.isValidAddress(walletAddress)) {
      throw new Error('Invalid wallet address');
    }

    if (!refresh) {
      const cached = await this.getCachedScore(normalizedAddress, chainId);
      if (cached) {
        return cached;
      }
    }

    try {
      const { score, proof } = await krnlService.computeReputationScore(walletAddress, chainId);

      if (proof.proofHash && proof.signature) {
        const verified = await krnlService.verifyProof(proof.proofHash, proof.signature);
        if (!verified) {
          throw new Error('Proof verification failed');
        }
      }

      const enrichedScore = await this.enrichScore(score);

      await Promise.all([
        this.saveCache(normalizedAddress, chainId, enrichedScore),
        this.recordCreditCheck(normalizedAddress, chainId, enrichedScore),
      ]);

      return enrichedScore;
    } catch (error: any) {
      logger.warn({ err: error }, 'KRNL computation failed, falling back to basic score');
      if (process.env.NODE_ENV === 'development') {
        const fallbackScore = await this.computeBasicScore(walletAddress, chainId);
        const enrichedScore = await this.enrichScore(fallbackScore);
        await Promise.all([
          this.saveCache(normalizedAddress, chainId, enrichedScore),
          this.recordCreditCheck(normalizedAddress, chainId, enrichedScore),
        ]);
        return enrichedScore;
      }
      throw error;
    }
  }

  private async getCachedScore(walletAddress: string, chainId?: number) {
    const record = await prisma.scoreCache.findUnique({
      where: {
        walletAddress_chainId: {
          walletAddress,
          chainId: chainId ?? null,
        },
      },
    });

    if (!record) return null;

    if (new Date(record.expiresAt).getTime() < Date.now()) {
      await prisma.scoreCache.delete({ where: { id: record.id } });
      return null;
    }

    return record.score as ReputationScore;
  }

  private async saveCache(walletAddress: string, chainId: number | undefined, score: ReputationScore) {
    await prisma.scoreCache.upsert({
      where: {
        walletAddress_chainId: {
          walletAddress,
          chainId: chainId ?? null,
        },
      },
      create: {
        walletAddress,
        chainId,
        score,
        expiresAt: new Date(Date.now() + CACHE_TTL_MS),
      },
      update: {
        score,
        expiresAt: new Date(Date.now() + CACHE_TTL_MS),
      },
    });
  }

  private async recordCreditCheck(walletAddress: string, chainId: number | undefined, score: ReputationScore) {
    if (!score.creditDecision) return;

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
        },
      },
    });
  }

  private async enrichScore(score: ReputationScore): Promise<ReputationScore> {
    const decision = creditDecisionEngine.evaluate(score);
    return {
      ...score,
      creditDecision: decision,
    };
  }

  /**
   * Compute basic score without KRNL (fallback for development)
   */
  private async computeBasicScore(walletAddress: string, chainId?: number): Promise<ReputationScore> {
    const metrics = await blockchainService.getWalletMetrics(walletAddress, chainId || 1);

    await this.trackWallet(walletAddress, metrics.totalTransactions || 0, metrics.averageTransactionValue);

    const transactionConsistency = Math.min(metrics.totalTransactions || 0, 1000);
    const repaymentHistory = 500;
    const stakingBehavior = 500;
    const governanceParticipation = 500;

    const breakdown: ScoreBreakdown = {
      transactionConsistency,
      repaymentHistory,
      stakingBehavior,
      governanceParticipation,
      riskFactors: [],
    };

    const score = Math.round(
      transactionConsistency * 0.4 +
        repaymentHistory * 0.3 +
        stakingBehavior * 0.2 +
        governanceParticipation * 0.1
    );

    return {
      walletAddress,
      score,
      confidence: 0.5,
      lastUpdated: new Date().toISOString(),
      breakdown,
      metadata: {
        totalTransactions: metrics.totalTransactions || 0,
        accountAge: 0,
        chains: [chainId?.toString() || '1'],
      },
    };
  }

  /**
   * Get multiple scores
   */
  async getBatchScores(wallets: WalletAddress[]): Promise<ReputationScore[]> {
    const promises = wallets.map((w) => this.getScore(w.address, w.chainId));
    return Promise.all(promises);
  }

  /**
   * Clear cache for a wallet
   */
  async clearCache(walletAddress: string, chainId?: number): Promise<void> {
    await prisma.scoreCache.deleteMany({
      where: { walletAddress: walletAddress.toLowerCase(), chainId: chainId ?? null },
    });
  }

  async ingestScore(score: ReputationScore, chainId?: number) {
    const normalized = score.walletAddress.toLowerCase();
    const enriched = await this.enrichScore(score);
    await Promise.all([
      this.saveCache(normalized, chainId, enriched),
      this.recordCreditCheck(normalized, chainId, enriched),
    ]);
    return enriched;
  }

  private async trackWallet(address: string, totalTransactions: number, averageValue?: string) {
    try {
      await prisma.walletProfile.upsert({
        where: { walletAddress: address.toLowerCase() },
        update: {
          totalTransactions,
          averageTransactionUsd: averageValue ? parseFloat(averageValue) : undefined,
        },
        create: {
          walletAddress: address.toLowerCase(),
          totalTransactions,
          averageTransactionUsd: averageValue ? parseFloat(averageValue) : undefined,
        },
      });
    } catch (err) {
      logger.warn({ err }, 'Failed to track wallet activity');
    }
  }
}

export const scoreService = new ScoreService();
/**
 * Score Computation Service
 * Handles reputation score calculation and caching
 */

