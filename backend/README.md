# ProofScore Backend API

The backend API server for ProofScore - a verifiable on-chain reputation engine.

## Features

- RESTful API for reputation scoring
- PostgreSQL database with Prisma ORM
- KRNL middleware integration
- Credit decision engine
- Rate limiting and security measures

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `PORT`: API server port (default: 3001)
- `DATABASE_URL`: PostgreSQL connection string
- `KRNL_API_KEY`: KRNL API key
- `RPC_URL`: Blockchain RPC endpoint

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run setup`: Install dependencies and generate Prisma client
- `npm run test`: Run tests

## Endpoints

- `GET /health`: Health check
- `GET /docs`: API documentation (Swagger UI)
- `GET /api/scores/:address`: Get reputation score for wallet
- `POST /api/scores/batch`: Get scores for multiple wallets
- `GET /api/wallets/:address/metrics`: Get wallet metrics
- `POST /api/krnl/webhook`: KRNL webhook endpoint