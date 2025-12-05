import rateLimit from 'express-rate-limit';
import type { Request } from 'express';
import { config } from '../config';

export const globalRateLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
});

export const walletRateLimiter = rateLimit({
  windowMs: config.WALLET_RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  max: config.WALLET_RATE_LIMIT_MAX_REQUESTS,
  keyGenerator: (req: Request) => {
    const wallet = req.params.address || (req.body?.walletAddress as string) || req.query.address;
    return wallet ? wallet.toString().toLowerCase() : req.ip;
  },
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Rate limit exceeded for this wallet address. Please wait before retrying.',
});

