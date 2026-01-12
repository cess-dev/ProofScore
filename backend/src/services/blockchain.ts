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
    // This method intentionally left empty
    // Providers are initialized on-demand in getProvider
  }

  private ensureProvider(chainId: number): ethers.JsonRpcProvider | null {
    // Check if provider already exists
    if (this.providers.has(chainId)) {
      return this.providers.get(chainId) || null;
    }

    // Initialize provider based on chainId and environment variables
    let rpcUrl: string | undefined;
    
    switch (chainId) {
      case 1: // Ethereum Mainnet
        rpcUrl = process.env.MAINNET_RPC_URL;
        break;
      case 42161: // Arbitrum
        rpcUrl = process.env.ARBITRUM_RPC_URL;
        break;
      case 8453: // Base
        rpcUrl = process.env.BASE_RPC_URL;
        break;
      case 137: // Polygon
        rpcUrl = process.env.POLYGON_RPC_URL;
        break;
      default:
        // For any other chain, use RPC_URL as fallback
        rpcUrl = process.env.RPC_URL;
        break;
    }
    
    if (rpcUrl) {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      this.providers.set(chainId, provider);
      return provider;
    }
    
    return null;
  }

  /**
   * Get provider for a specific chain
   */
  getProvider(chainId: number = 1): ethers.JsonRpcProvider | null {
    return this.ensureProvider(chainId);
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
      // Check if it's an invalid checksum
      const lowerAddress = address.toLowerCase();
      if (lowerAddress.startsWith('0x') && lowerAddress.length === 42) {
        // May be invalid checksum
        throw new Error('Invalid Ethereum address checksum format');
      } else {
        // Invalid format entirely
        throw new Error('Invalid Ethereum address format');
      }
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
      console.error('Blockchain service error details:', error);
      console.error('Provider details:');
      // Provide more user-friendly error messages
      if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
        throw new Error('Unable to connect to blockchain provider. This may be due to network connectivity issues or rate limiting. Please try again later.');
      } else if (error.message.includes('Invalid')) {
        throw new Error(`Invalid wallet address: ${error.message}`);
      } else {
        throw new Error(`Failed to fetch wallet metrics: ${error.message}. This could be due to network issues or the address having no on-chain activity.`);
      }
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
