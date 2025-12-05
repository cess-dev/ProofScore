/**
 * KRNL API Routes
 */

import express, { Request, Response } from 'express';
import { krnlService } from '../services/krnl';
import { logger } from '../lib/logger';
import { config } from '../config';
import { scoreService } from '../services/score';

export const krnlRouter = express.Router();

/**
 * GET /api/krnl/health
 * Check KRNL service health
 */
krnlRouter.get('/health', async (req: Request, res: Response) => {
  try {
    const isHealthy = await krnlService.healthCheck();

    res.json({
      success: true,
      data: {
        healthy: isHealthy,
        service: 'krnl',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Failed to check KRNL health',
      message: error.message,
    });
  }
});

/**
 * POST /api/krnl/verify
 * Verify a KRNL proof
 */
krnlRouter.post('/verify', async (req: Request, res: Response) => {
  try {
    const { proofHash, signature } = req.body;

    if (!proofHash || !signature) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'proofHash and signature are required',
      });
    }

    const verified = await krnlService.verifyProof(proofHash, signature);

    res.json({
      success: true,
      data: {
        verified,
        proofHash,
      },
    });
  } catch (error: any) {
    console.error('Error verifying proof:', error);
    res.status(500).json({
      error: 'Failed to verify proof',
      message: error.message,
    });
  }
});

/**
 * GET /api/krnl/computation/:id
 * Get computation status
 */
krnlRouter.get('/computation/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const status = await krnlService.getComputationStatus(id);

    res.json({
      success: true,
      data: status,
    });
  } catch (error: any) {
    console.error('Error getting computation status:', error);
    res.status(500).json({
      error: 'Failed to get computation status',
      message: error.message,
    });
  }
});

/**
 * POST /api/krnl/webhook
 * Receive asynchronous score computations
 */
krnlRouter.post('/webhook', async (req: Request, res: Response) => {
  try {
    if (!config.KRNL_WEBHOOK_SECRET) {
      return res.status(501).json({ error: 'Webhook not configured' });
    }

    const signature = req.headers['x-krnl-signature'];
    if (!signature || signature !== config.KRNL_WEBHOOK_SECRET) {
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }

    const { score, chainId } = req.body;
    if (!score?.walletAddress) {
      return res.status(400).json({ error: 'Invalid payload: missing score.walletAddress' });
    }

    const stored = await scoreService.ingestScore(score, chainId);

    res.json({
      success: true,
      data: stored,
    });
  } catch (error: any) {
    logger.error({ err: error }, 'Failed to process KRNL webhook');
    res.status(500).json({
      error: 'Failed to process webhook',
      message: error.message,
    });
  }
});
