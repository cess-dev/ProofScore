/**
 * Score Computation Service
 * Handles reputation score calculation and caching
 */

import { ReputationScore, WalletAddress, ScoreBreakdown, RiskFactor } from '../types';
import { krnlService } from './krnl';
import { blockchainService } from './blockchain';

// In-memory cache (in production, use Redis or similar)
const scoreCache = new Map<string, { score: ReputationScore; expiresAt: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export class ScoreService {
  /**
   * Get or compute reputation score for a wallet
   */
  async getScore(walletAddress: string, chainId?: number, refresh: boolean = false): Promise<ReputationScore> {
    const cacheKey = `${walletAddress}:${chainId || 'all'}`;

    // Check cache
    if (!refresh) {
      const cached = scoreCache.get(cacheKey);
      if (cached && cached.expiresAt > Date.now()) {
        return cached.score;
      }
    }

    // Validate address
    if (!blockchainService.isValidAddress(walletAddress)) {
      throw new Error('Invalid wallet address');
    }

    try {
      // Request computation from KRNL
      const { score, proof } = await krnlService.computeReputationScore(walletAddress, chainId);

      // Verify proof
      if (proof.proofHash && proof.signature) {
        const verified = await krnlService.verifyProof(proof.proofHash, proof.signature);
        if (!verified) {
          throw new Error('Proof verification failed');
        }
      }

      // Cache the result
      scoreCache.set(cacheKey, {
        score,
        expiresAt: Date.now() + CACHE_TTL,
      });

      return score;
    } catch (error: any) {
      // Fallback to basic calculation if KRNL fails (development only)
      if (process.env.NODE_ENV === 'development') {
        return this.computeBasicScore(walletAddress, chainId);
      }
      throw error;
    }
  }

  /**
   * Compute basic score without KRNL (fallback for development)
   */
  private async computeBasicScore(walletAddress: string, chainId?: number): Promise<ReputationScore> {
    const metrics = await blockchainService.getWalletMetrics(walletAddress, chainId || 1);

    // Simple scoring algorithm (placeholder)
    const transactionConsistency = Math.min(metrics.totalTransactions || 0, 1000);
    const repaymentHistory = 500; // Placeholder
    const stakingBehavior = 500; // Placeholder
    const governanceParticipation = 500; // Placeholder

    const breakdown: ScoreBreakdown = {
      transactionConsistency,
      repaymentHistory,
      stakingBehavior,
      governanceParticipation,
      riskFactors: [],
    };

    // Weighted average
    const score = Math.round(
      transactionConsistency * 0.4 +
      repaymentHistory * 0.3 +
      stakingBehavior * 0.2 +
      governanceParticipation * 0.1
    );

    return {
      walletAddress,
      score,
      confidence: 0.5, // Low confidence for basic scores
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
    const promises = wallets.map(w => this.getScore(w.address, w.chainId));
    return Promise.all(promises);
  }

  /**
   * Clear cache for a wallet
   */
  clearCache(walletAddress: string, chainId?: number): void {
    const cacheKey = `${walletAddress}:${chainId || 'all'}`;
    scoreCache.delete(cacheKey);
  }
}

export const scoreService = new ScoreService();
