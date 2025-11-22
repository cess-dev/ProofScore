/**
 * Score API Routes
 */

import express, { Request, Response } from 'express';
import { z } from 'zod';
import { scoreService } from '../services/score';

export const scoreRouter = express.Router();

const ScoreRequestSchema = z.object({
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
  chainId: z.number().int().positive().optional(),
  refresh: z.boolean().optional(),
});

/**
 * GET /api/scores/:address
 * Get reputation score for a wallet
 */
scoreRouter.get('/:address', async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const chainId = req.query.chainId ? parseInt(req.query.chainId as string) : undefined;
    const refresh = req.query.refresh === 'true';

    const validation = ScoreRequestSchema.safeParse({
      walletAddress: address,
      chainId,
      refresh,
    });

    if (!validation.success) {
      return res.status(400).json({
        error: 'Invalid request',
        details: validation.error.errors,
      });
    }

    const score = await scoreService.getScore(address, chainId, refresh);

    res.json({
      success: true,
      data: score,
    });
  } catch (error: any) {
    console.error('Error fetching score:', error);
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
scoreRouter.post('/batch', async (req: Request, res: Response) => {
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
    console.error('Error fetching batch scores:', error);
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
scoreRouter.delete('/:address/cache', async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const chainId = req.query.chainId ? parseInt(req.query.chainId as string) : undefined;

    scoreService.clearCache(address, chainId);

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
