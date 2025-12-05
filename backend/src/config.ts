import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),
  KRNL_API_URL: z.string().url('KRNL_API_URL must be a valid URL').default('https://api.krnl.io'),
  KRNL_API_KEY: z.string().min(1, 'KRNL_API_KEY is required'),
  KRNL_WEBHOOK_SECRET: z.string().optional(),
  RPC_URL: z.string().optional(),
  MAINNET_RPC_URL: z.string().optional(),
  ARBITRUM_RPC_URL: z.string().optional(),
  BASE_RPC_URL: z.string().optional(),
  POLYGON_RPC_URL: z.string().optional(),
  RATE_LIMIT_WINDOW_MINUTES: z.coerce.number().default(1),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(60),
  WALLET_RATE_LIMIT_WINDOW_MINUTES: z.coerce.number().default(5),
  WALLET_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(10),
  SCORE_CACHE_TTL_MINUTES: z.coerce.number().default(60),
});

export type AppConfig = z.infer<typeof envSchema>;

export const config: AppConfig = envSchema.parse(process.env);

