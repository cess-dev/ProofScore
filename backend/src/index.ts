import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { scoreRouter } from './routes/score';
import { walletRouter } from './routes/wallet';
import { krnlRouter } from './routes/krnl';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'proofscore-api' });
});

// API Routes
app.use('/api/scores', scoreRouter);
app.use('/api/wallets', walletRouter);
app.use('/api/krnl', krnlRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 ProofScore API server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
