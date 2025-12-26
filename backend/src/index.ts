import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { scoreRouter } from './routes/score';
import { walletRouter } from './routes/wallet';
import { krnlRouter } from './routes/krnl';
import { config } from './config';
import { logger } from './lib/logger';
import { openApiSpec } from './docs/openapi';
import { globalRateLimiter } from './middleware/rateLimit';
import pinoHttp from 'pino-http';

const app = express();

// Core middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(
  pinoHttp({
    logger,
  })
);
app.use(globalRateLimiter);

// Docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Health check
import type { Request, Response } from 'express';
app.get('/health', (req: Request, res: Response) => {
});

// API Routes
app.use('/api/scores', scoreRouter);
app.use('/api/wallets', walletRouter);
app.use('/api/krnl', krnlRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error({ err }, 'Unhandled error');
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.listen(config.PORT, () => {
  logger.info(`🚀 ProofScore API server running on http://localhost:${config.PORT}`);
  logger.info(`📊 Health check: http://localhost:${config.PORT}/health`);
});
