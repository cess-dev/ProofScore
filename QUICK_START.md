# Quick Start Guide

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Docker (for database)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ProofScore
   ```

2. Install dependencies:
   ```bash
   npm run install:all
   ```

3. Start the database:
   ```bash
   docker compose up -d db
   ```

4. Run database migrations:
   ```bash
   cd backend
   npx prisma migrate dev
   ```

5. Set up environment variables:
   - Copy `backend/.env.example` to `backend/.env`
   - Copy `frontend/.env.local.example` to `frontend/.env.local` (if needed)

6. Start both servers:
   ```bash
   # From project root
   npm run dev
   ```

## Environment Variables

### Backend (.env)

```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://proofscore:proofscore@localhost:5432/proofscore
KRNL_API_URL=https://api.krnl.io
KRNL_API_KEY=demo-key
RPC_URL=https://ethereum-rpc.publicnode.com
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Running the Application

- Backend API: `http://localhost:3001`
- Frontend Dashboard: `http://localhost:3000`
- API Documentation: `http://localhost:3001/docs`

## Troubleshooting

1. **Database Connection Error**: Ensure Docker is running and the database container is started:
   ```bash
   docker compose up -d db
   ```

2. **Port Already in Use**: Check if ports 3000 or 3001 are in use by another process.

3. **Prisma Migration Error**: Run migrations again:
   ```bash
   cd backend
   npx prisma migrate dev
   ```

4. **Frontend Cannot Connect to Backend**: Verify the `NEXT_PUBLIC_API_URL` in frontend `.env.local` matches the backend URL.