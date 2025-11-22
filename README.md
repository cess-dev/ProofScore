# ProofScore: A Verifiable On-chain Reputation Engine

ProofScore is a decentralized reputation scoring protocol built on KRNL's middleware. It provides a way for smart contracts and decentralized applications to verify a wallet's reputation through off-chain computations that are cryptographically proven and tamper-proof.

## Project Structure

```
ProofScore/
├── backend/          # Node.js Express API server
├── frontend/         # Next.js dashboard application
└── shared/           # Shared types and utilities
```

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

```bash
# Install all dependencies
npm run install:all
```

### Environment Setup

Create environment files:

**backend/.env**
```env
PORT=3001
NODE_ENV=development
KRNL_API_URL=https://api.krnl.io
KRNL_API_KEY=your_krnl_api_key
RPC_URL=https://mainnet.infura.io/v3/your_key
```

**frontend/.env.local**
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

📖 For detailed setup instructions, see [SETUP.md](./SETUP.md)

## Features

- **Verifiable Reputation Scores**: Cryptographically proven reputation calculations
- **Multi-chain Support**: Works across multiple blockchain networks
- **RESTful API**: Easy integration for DeFi platforms and DAOs
- **Dashboard**: Real-time score visualization and analytics
- **KRNL Integration**: Leverages KRNL middleware for verifiable computations

## Development Phases

- ✅ Phase 1: Core smart contracts and KRNL proof verification
- 🚧 Phase 2: Off-chain computation engine for data aggregation and scoring
- ⏳ Phase 3: Public API and developer documentation for integrations
- ⏳ Phase 4: Demo dashboard and open-source repository release

## License

MIT
