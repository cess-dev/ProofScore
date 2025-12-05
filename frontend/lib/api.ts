/**
 * API Client for ProofScore Backend
 */

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ReputationScore {
  walletAddress: string;
  score: number;
  confidence: number;
  lastUpdated: string;
  proofHash?: string;
  breakdown: {
    transactionConsistency: number;
    repaymentHistory: number;
    stakingBehavior: number;
    governanceParticipation: number;
    riskFactors: Array<{
      type: string;
      severity: string;
      description: string;
      detectedAt: string;
    }>;
  };
  metadata: {
    totalTransactions: number;
    accountAge: number;
    chains: string[];
  };
  creditDecision?: {
    tier: string;
    risk: string;
    recommendedAction: string;
    rationale: string;
  };
}

export const api = {
  /**
   * Get reputation score for a wallet
   */
  async getScore(
    address: string,
    chainId?: number,
    refresh: boolean = false
  ): Promise<ReputationScore> {
    const params = new URLSearchParams();
    if (chainId) params.append('chainId', chainId.toString());
    if (refresh) params.append('refresh', 'true');

    const response = await client.get<{ success: boolean; data: ReputationScore }>(
      `/api/scores/${address}${params.toString() ? `?${params.toString()}` : ''}`
    );

    if (!response.data.success) {
      throw new Error('Failed to fetch score');
    }

    return response.data.data;
  },

  /**
   * Get batch scores
   */
  async getBatchScores(wallets: Array<{ address: string; chainId?: number }>): Promise<ReputationScore[]> {
    const response = await client.post<{ success: boolean; data: ReputationScore[] }>(
      '/api/scores/batch',
      { wallets }
    );

    if (!response.data.success) {
      throw new Error('Failed to fetch batch scores');
    }

    return response.data.data;
  },

  /**
   * Get wallet metrics
   */
  async getWalletMetrics(address: string, chainId?: number): Promise<any> {
    const params = new URLSearchParams();
    if (chainId) params.append('chainId', chainId.toString());

    const response = await client.get<{ success: boolean; data: any }>(
      `/api/wallets/${address}/metrics${params.toString() ? `?${params.toString()}` : ''}`
    );

    return response.data.data;
  },

  /**
   * Check API health
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await client.get('/health');
      return response.status === 200;
    } catch {
      return false;
    }
  },
};
