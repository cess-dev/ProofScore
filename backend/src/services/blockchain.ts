/**
 * Blockchain Service
 * Handles blockchain interactions for wallet data retrieval
 */

import { ethers } from 'ethers';
import { WalletMetrics } from '../types';

export class BlockchainService {
  private providers: Map<number, ethers.JsonRpcProvider>;

  constructor() {
    this.providers = new Map();
    this.initializeProviders();
  }

  private initializeProviders() {
    // Mainnet
    if (process.env.MAINNET_RPC_URL) {
      this.providers.set(1, new ethers.JsonRpcProvider(process.env.MAINNET_RPC_URL));
    }

    // Arbitrum
    if (process.env.ARBITRUM_RPC_URL) {
      this.providers.set(42161, new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC_URL));
    }

    // Base
    if (process.env.BASE_RPC_URL) {
      this.providers.set(8453, new ethers.JsonRpcProvider(process.env.BASE_RPC_URL));
    }

    // Polygon
    if (process.env.POLYGON_RPC_URL) {
      this.providers.set(137, new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL));
    }

    // Default fallback
    if (process.env.RPC_URL && this.providers.size === 0) {
      this.providers.set(1, new ethers.JsonRpcProvider(process.env.RPC_URL));
    }
  }

  /**
   * Get provider for a specific chain
   */
  getProvider(chainId: number = 1): ethers.JsonRpcProvider | null {
    return this.providers.get(chainId) || null;
  }

  /**
   * Validate wallet address
   */
  isValidAddress(address: string): boolean {
    return ethers.isAddress(address);
  }

  /**
   * Get basic wallet metrics from blockchain
   * Note: This is a simplified version. Full implementation would use
   * indexing services like The Graph or custom indexers
   */
  async getWalletMetrics(address: string, chainId: number = 1): Promise<Partial<WalletMetrics>> {
    const provider = this.getProvider(chainId);
    if (!provider) {
      throw new Error(`No provider available for chain ${chainId}`);
    }

    if (!this.isValidAddress(address)) {
      throw new Error('Invalid wallet address');
    }

    try {
      // Get transaction count (nonce)
      const txCount = await provider.getTransactionCount(address);
      
      // Get balance
      const balance = await provider.getBalance(address);

      // Basic metrics (full implementation would fetch from indexer)
      return {
        address,
        totalTransactions: txCount,
        averageTransactionValue: ethers.formatEther(balance),
        lastActivity: new Date().toISOString(), // Would come from indexer
      };
    } catch (error: any) {
      throw new Error(`Failed to fetch wallet metrics: ${error.message}`);
    }
  }

  /**
   * Get block timestamp
   */
  async getBlockTimestamp(chainId: number = 1, blockNumber?: number): Promise<Date> {
    const provider = this.getProvider(chainId);
    if (!provider) {
      throw new Error(`No provider available for chain ${chainId}`);
    }

    const block = await provider.getBlock(blockNumber || 'latest');
    return new Date(block!.timestamp * 1000);
  }
}

export const blockchainService = new BlockchainService();
