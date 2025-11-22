# ProofScore Setup Guide

## Initial Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..
```

Or use the convenience script:
```bash
npm run install:all
```

### 2. Environment Configuration

#### Backend Environment Variables

Create `backend/.env`:

```env
PORT=3001
NODE_ENV=development

# KRNL Middleware Configuration
KRNL_API_URL=https://api.krnl.io
KRNL_API_KEY=your_krnl_api_key_here

# Blockchain RPC URLs
RPC_URL=https://mainnet.infura.io/v3/your_infura_key
MAINNET_RPC_URL=https://mainnet.infura.io/v3/your_infura_key
ARBITRUM_RPC_URL=https://arbitrum-mainnet.infura.io/v3/your_infura_key
BASE_RPC_URL=https://mainnet.base.org
POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/your_infura_key
```

#### Frontend Environment Variables

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Run Development Servers

#### Option A: Run Both Simultaneously

```bash
npm run dev
```

This will start:
- Backend API on `http://localhost:3001`
- Frontend Dashboard on `http://localhost:3000`

#### Option B: Run Separately

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

## Project Structure

```
ProofScore/
├── backend/
│   ├── src/
│   │   ├── routes/         # Express API routes
│   │   ├── services/       # Business logic (KRNL, Blockchain, Scoring)
│   │   ├── types/          # TypeScript type definitions
│   │   └── index.ts        # Express server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── app/                 # Next.js app router pages
│   │   ├── dashboard/    # Score visualization dashboard
│   │   ├── api-docs/       # API documentation page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/         # React components
│   │   ├── ScoreVisualization.tsx
│   │   └── ScoreBreakdown.tsx
│   ├── lib/                # Utilities and API client
│   │   ├── api.ts          # API client
│   │   └── utils.ts        # Helper functions
│   ├── package.json
│   └── tsconfig.json
│
└── package.json            # Root workspace config
```

## API Endpoints

### Backend API (`http://localhost:3001`)

- `GET /health` - Health check
- `GET /api/scores/:address` - Get reputation score
- `POST /api/scores/batch` - Get batch scores
- `DELETE /api/scores/:address/cache` - Clear cached score
- `GET /api/wallets/:address/metrics` - Get wallet metrics
- `GET /api/krnl/health` - KRNL service health check
- `POST /api/krnl/verify` - Verify KRNL proof

## Development Notes

### Backend

- Uses Express.js with TypeScript
- Implements KRNL middleware integration for verifiable computations
- Supports multiple blockchain networks via ethers.js
- In-memory caching (consider Redis for production)

### Frontend

- Next.js 14 with App Router
- Tailwind CSS for styling
- Recharts for data visualization (ready to use)
- Responsive design with modern UI components

### KRNL Integration

The backend includes a `KRNLService` class that handles:
- Reputation score computation requests
- Proof verification
- Computation status tracking

**Note:** During development, if KRNL is not available, the system falls back to a basic scoring algorithm. Update `backend/src/services/score.ts` for production deployment.

## Next Steps

1. **Configure KRNL API**: Add your KRNL API key to `backend/.env`
2. **Set up RPC Providers**: Configure blockchain RPC URLs for your target networks
3. **Customize Scoring**: Modify the scoring algorithm in `backend/src/services/score.ts`
4. **Add Indexing**: Integrate with The Graph or other indexing services for richer wallet data
5. **Deploy**: Set up production environments for backend and frontend

## Testing

```bash
# Test backend health
curl http://localhost:3001/health

# Test score endpoint
curl http://localhost:3001/api/scores/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb

# Test batch scores
curl -X POST http://localhost:3001/api/scores/batch \
  -H "Content-Type: application/json" \
  -d '{"wallets":[{"address":"0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"}]}'
```

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use:

- **Backend**: Change `PORT` in `backend/.env`
- **Frontend**: Update `NEXT_PUBLIC_API_URL` in `frontend/.env.local` and restart Next.js

### KRNL Connection Issues

If KRNL service is unavailable:
- Check `KRNL_API_URL` and `KRNL_API_KEY` in `backend/.env`
- System will fall back to basic scoring in development mode

### Blockchain RPC Errors

- Verify RPC URLs are correct and accessible
- Check rate limits on your RPC provider
- Consider using multiple RPC endpoints for redundancy
