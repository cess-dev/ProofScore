/**
 * Wallet API Routes
 */

import express, { Request, Response } from 'express';
import { ethers } from 'ethers';
import { blockchainService } from '../services/blockchain';
import { logger } from '../lib/logger';

export const walletRouter = express.Router();

/**
 * GET /api/wallets/:address/metrics
 * Get basic wallet metrics
 */
walletRouter.get('/:address/metrics', async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const chainId = req.query.chainId ? parseInt(req.query.chainId as string) : 1;

    // Check address format before proceeding
    const lowerAddress = address.toLowerCase();
    if (!lowerAddress.startsWith('0x') || lowerAddress.length !== 42) {
      return res.status(400).json({
        error: 'Invalid Ethereum address format',
        message: 'Please enter a valid Ethereum address in the format 0x followed by 40 hexadecimal characters (e.g., 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B)',
      });
    }
    
    // Check if address is properly checksummed
    let checksummedAddress = address;
    try {
      const properChecksum = ethers.getAddress(address);
      if (properChecksum !== address) {
        // If the input is not in checksum format, convert it to checksum format for processing
        checksummedAddress = properChecksum;
      }
    } catch (error) {
      return res.status(400).json({
        error: 'Invalid Ethereum address format',
        message: 'Please enter a valid Ethereum address in the format 0x followed by 40 hexadecimal characters (e.g., 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B)',
      });
    }

    const metrics = await blockchainService.getWalletMetrics(checksummedAddress, chainId);


    res.json({
      success: true,
      data: metrics,
    });
  } catch (error: any) {
    logger.error({ err: error }, 'Error fetching wallet metrics');
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
