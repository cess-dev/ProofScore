## ProofScore Backend API

### Prerequisites

- Node.js >= 18
- PostgreSQL (local or via Docker)

### Environment

Create `backend/.env` with:

```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://proofscore:proofscore@localhost:5432/proofscore
KRNL_API_URL=https://api.krnl.io
KRNL_API_KEY=your_krnl_api_key
KRNL_WEBHOOK_SECRET=replace_me
MAINNET_RPC_URL=https://mainnet.infura.io/v3/your_key
RATE_LIMIT_WINDOW_MINUTES=1
RATE_LIMIT_MAX_REQUESTS=60
WALLET_RATE_LIMIT_WINDOW_MINUTES=5
WALLET_RATE_LIMIT_MAX_REQUESTS=10
SCORE_CACHE_TTL_MINUTES=60
```

### Setup

```
cd backend
npm install
npx prisma migrate dev
npm run dev
```

- API: `http://localhost:3001`
- Docs: `http://localhost:3001/docs`

### Scripts

- `npm run dev` – watch mode
- `npm run build` – compile TypeScript
- `npm start` – run compiled server
- `npm run prisma:generate` / `npm run prisma:migrate`
- `npm test`

### Docker

```
docker-compose up --build
```

This starts PostgreSQL (`db`) and the backend service.

