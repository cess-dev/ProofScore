# ProofScore: A Verifiable On-chain Reputation Engine

ProofScore is a decentralized reputation scoring protocol built on KRNL's middleware. It provides a way for smart contracts and decentralized applications to verify a wallet's reputation through off-chain computations that are cryptographically proven and tamper-proof. The platform enables trust in DeFi, DAOs, and decentralized marketplaces without intermediaries.

## Features

- **Verifiable Proofs**: Cryptographically signed reputation scores via KRNL middleware
- **Multi-chain**: Reputation tracking across Ethereum, Arbitrum, Base, and more
- **Transparent**: Open scoring parameters and explainable reputation metrics
- **Privacy-Focused**: Non-custodial and privacy-preserving reputation assessment
- **Real-time Scoring**: Live reputation metrics with configurable caching
- **Comprehensive Dashboard**: Detailed metrics and visualization
- **Wallet Management**: Connect and manage multiple wallets
- **Search History**: Track and review previous wallet checks
- **User-Friendly Interface**: Intuitive navigation and error handling

## Project Structure

```
ProofScore/
├── backend/          # Node.js Express API server
├── frontend/         # Next.js dashboard application
├── docs/             # API documentation
└── docker-compose.yml # Database container configuration
```

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Docker (for database)

### Installation

```bash
# Install all dependencies
npm run install:all

# Start database
cd /home/zion/Documents/Projects/ProofScore && docker compose up -d db

# Run database migrations
cd backend && npx prisma migrate dev
```

### Environment Setup

Create environment files:

**backend/.env**
```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://proofscore:proofscore@localhost:5432/proofscore
KRNL_API_URL=https://api.krnl.io
KRNL_API_KEY=your-krnl-api-key-here
RPC_URL=https://ethereum-rpc.publicnode.com
RPC_URL_FALLBACK=https://eth-mainnet.g.alchemy.com/v2/your-alchemy-key
SCORE_CACHE_TTL_MINUTES=0
FRONTEND_URL=http://localhost:3000
INFURA_PROJECT_ID=your-infura-project-id
PRIVATE_KEY=your-private-key
```

**frontend/.env.local** (create if needed)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Development

```bash
# Run both backend and frontend concurrently
npm run dev

# Or run separately:
npm run dev:backend   # Backend on http://localhost:3001
npm run dev:frontend  # Frontend on http://localhost:3000
```

Visit `http://localhost:3000` to access the dashboard.

### KRNL Integration

ProofScore integrates with KRNL's verifiable computation middleware. During the testnet stage, dApp builders can use the following RPC endpoint:

**Recommended Endpoint:**
```
https://node.krnl.xyz
```

### Backend API Highlights

- PostgreSQL + Prisma persistence (score cache, credit checks, wallet profiles)
- Pino logging + Helmet + rate limiting (IP + wallet-based)
- KRNL webhook ingestion endpoint (`POST /api/krnl/webhook`)
- Credit decision engine (tiers A–D) included in every score payload
- OpenAPI docs served at `http://localhost:3001/docs`
- Dockerfile and `docker-compose.yml` (API + Postgres)
- Real-time scoring with configurable cache TTL
- Comprehensive error handling and user-friendly messages

### API Reference

- Swagger UI: `http://localhost:3001/docs`
- Health: `GET /health`
- Scores: `GET /api/scores/:address`, `POST /api/scores/batch`
- Wallet metrics: `GET /api/wallets/:address/metrics`
- KRNL utilities: `GET /api/krnl/health`, `POST /api/krnl/verify`, `POST /api/krnl/webhook`

## Frontend Features

- **Responsive Dashboard**: Real-time reputation visualization
- **Navigation Consistency**: Unified navigation across all pages
- **Wallet Connection**: Multiple wallet selection capability
- **Settings Panel**: Account settings, connected wallets, and search history
- **Error Handling**: User-friendly error messages and validation
- **Search History**: Track previous wallet reputation checks

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Blockchain**: ethers.js, Web3 integration
- **Verification**: KRNL middleware for verifiable computation
- **Database**: PostgreSQL with Prisma ORM
- **Infrastructure**: Docker, Docker Compose

## Security & Privacy

- All sensitive API keys stored in environment variables
- Proper error handling to prevent information leakage
- Checksum validation for Ethereum addresses
- Secure blockchain interaction patterns
- Rate limiting to prevent abuse

## Development Phases

- ✅ Phase 1: Core infrastructure and blockchain integration
- ✅ Phase 2: Off-chain computation engine for data aggregation and scoring
- ✅ Phase 3: RESTful API and developer documentation for integrations
- ✅ Phase 4: Demo dashboard and open-source repository release
- ✅ Phase 5: User management, settings, and enhanced UI/UX

## License

MIT
