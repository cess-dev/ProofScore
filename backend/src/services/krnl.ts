/**
 * KRNL Middleware Integration Service
 * Handles communication with KRNL's verifiable computation middleware
 */

import axios, { AxiosInstance } from 'axios';
import { KRNLProof, ReputationScore } from '../types';

export class KRNLService {
  private client: AxiosInstance;
  private apiKey: string;

  constructor() {
    const apiUrl = process.env.KRNL_API_URL || 'https://api.krnl.io';
    this.apiKey = process.env.KRNL_API_KEY || '';

    this.client = axios.create({
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
      },
      timeout: 30000,
    });
  }

  /**
   * Request a reputation score computation from KRNL
   */
  async computeReputationScore(walletAddress: string, chainId?: number): Promise<{
    score: ReputationScore;
    proof: KRNLProof;
  }> {
    try {
      const response = await this.client.post('/compute/reputation', {
        walletAddress,
        chainId,
        computationType: 'reputation_score',
        parameters: {
          includeStaking: true,
          includeGovernance: true,
          includeRepayment: true,
        },
      });

      return {
        score: response.data.score,
        proof: response.data.proof,
      };
    } catch (error: any) {
      throw new Error(`KRNL computation failed: ${error.message}`);
    }
  }

  /**
   * Verify a KRNL proof signature
   */
  async verifyProof(proofHash: string, signature: string): Promise<boolean> {
    try {
      const response = await this.client.post('/verify', {
        proofHash,
        signature,
      });

      return response.data.verified === true;
    } catch (error: any) {
      console.error('Proof verification failed:', error);
      return false;
    }
  }

  /**
   * Get computation status
   */
  async getComputationStatus(computationId: string): Promise<{
    status: 'pending' | 'processing' | 'completed' | 'failed';
    result?: any;
  }> {
    try {
      const response = await this.client.get(`/compute/status/${computationId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get computation status: ${error.message}`);
    }
  }

  /**
   * Health check for KRNL service
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.get('/health');
      return response.status === 200;
    } catch {
      return false;
    }
  }
}

export const krnlService = new KRNLService();
