/**
 * Score API Routes
 */

import express, { Request, Response } from 'express';
import { z } from 'zod';
import { ethers } from 'ethers';
import { scoreService } from '../services/score';
import { walletRateLimiter } from '../middleware/rateLimit';
import { logger } from '../lib/logger';

export const scoreRouter = express.Router();

const ScoreRequestSchema = z.object({
  walletAddress: z.string()
    .transform((val) => val.toLowerCase().trim())
    .pipe(z.string().regex(/^0x[a-f0-9]{40}$/, 'Invalid Ethereum address')),
  chainId: z.number().int().positive().optional(),
  refresh: z.boolean().optional(),
});

/**
 * GET /api/scores/:address
 * Get reputation score for a wallet
 */
scoreRouter.get('/:address', walletRateLimiter, async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    
    // Validate address format first
    const lowerAddress = address.toLowerCase().trim();
    
    if (!lowerAddress.startsWith('0x') || lowerAddress.length !== 42) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Please enter a valid Ethereum address in the format 0x followed by 40 hexadecimal characters (e.g., 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B)',
        details: [{
          validation: 'format',
          code: 'invalid_string',
          message: 'Invalid Ethereum address format',
          path: ['walletAddress'],
        }],
      });
    }
    
    // Check if address is properly checksummed
    let checksummedAddress = lowerAddress;
    try {
      const properChecksum = ethers.getAddress(lowerAddress);
      if (properChecksum !== address) {
        // If the input is not in checksum format, convert it to checksum format for processing
        checksummedAddress = properChecksum;
      }
    } catch (error) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Please enter a valid Ethereum address in the format 0x followed by 40 hexadecimal characters (e.g., 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B)',
        details: [{
          validation: 'format',
          code: 'invalid_string',
          message: 'Invalid Ethereum address format',
          path: ['walletAddress'],
        }],
      });
    }
    
    const normalizedAddress = checksummedAddress.toLowerCase().trim();
    
    const chainId = req.query.chainId ? parseInt(req.query.chainId as string) : undefined;
    const refresh = req.query.refresh === 'true';

    const resolvedChainId = chainId ?? 1;
    const score = await scoreService.getScore(
      normalizedAddress,
      resolvedChainId,
      refresh
    );


    res.json({
      success: true,
      data: score,
    });
  } catch (error: any) {
    logger.error({ err: error }, 'Error fetching score');
    res.status(500).json({
      error: 'Failed to fetch score',
      message: error.message,
    });
  }
});

/**
 * POST /api/scores/batch
 * Get scores for multiple wallets
 */
scoreRouter.post('/batch', walletRateLimiter, async (req: Request, res: Response) => {
  try {
    const { wallets } = req.body;

    if (!Array.isArray(wallets) || wallets.length === 0) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'wallets must be a non-empty array',
      });
    }

    if (wallets.length > 100) {
      return res.status(400).json({
        error: 'Too many wallets',
        message: 'Maximum 100 wallets per batch request',
      });
    }

    const scores = await scoreService.getBatchScores(wallets);

    res.json({
      success: true,
      data: scores,
      count: scores.length,
    });
  } catch (error: any) {
    logger.error({ err: error }, 'Error fetching batch scores');
    res.status(500).json({
      error: 'Failed to fetch batch scores',
      message: error.message,
    });
  }
});

/**
 * DELETE /api/scores/:address/cache
 * Clear cached score for a wallet
 */
scoreRouter.delete('/:address/cache', walletRateLimiter, async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const chainId = req.query.chainId ? parseInt(req.query.chainId as string) : undefined;

    const resolvedChainId = chainId ?? 1;
    await scoreService.clearCache(address, resolvedChainId);


    res.json({
      success: true,
      message: 'Cache cleared',
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Failed to clear cache',
      message: error.message,
    });
  }
});
