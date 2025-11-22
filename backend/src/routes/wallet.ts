/**
 * Wallet API Routes
 */

import express, { Request, Response } from 'express';
import { blockchainService } from '../services/blockchain';

export const walletRouter = express.Router();

/**
 * GET /api/wallets/:address/metrics
 * Get basic wallet metrics
 */
walletRouter.get('/:address/metrics', async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const chainId = req.query.chainId ? parseInt(req.query.chainId as string) : 1;

    if (!blockchainService.isValidAddress(address)) {
      return res.status(400).json({
        error: 'Invalid wallet address',
      });
    }

    const metrics = await blockchainService.getWalletMetrics(address, chainId);

    res.json({
      success: true,
      data: metrics,
    });
  } catch (error: any) {
    console.error('Error fetching wallet metrics:', error);
    res.status(500).json({
      error: 'Failed to fetch wallet metrics',
      message: error.message,
    });
  }
});

/**
 * GET /api/wallets/:address/validate
 * Validate wallet address
 */
walletRouter.get('/:address/validate', async (req: Request, res: Response) => {
  const { address } = req.params;
  const isValid = blockchainService.isValidAddress(address);

  res.json({
    success: true,
    data: {
      address,
      isValid,
    },
  });
});
