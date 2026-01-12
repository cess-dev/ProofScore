# ProofScore API Documentation

## Overview

The ProofScore API provides endpoints for retrieving verifiable reputation scores for cryptocurrency wallets. The scores are computed using KRNL middleware to ensure cryptographic verification.

## Base URL

- Development: `http://localhost:3001`
- Production: `https://api.proofscore.io` (TBD)

## Authentication

Currently, no authentication is required for development. For production, API keys will be required for rate-limited access.

## Endpoints

### Health Check

#### `GET /health`

Check if the API server is running.

**Response:**
```json
{
  "status": "ok",
  "service": "proofscore-api",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Get Reputation Score

#### `GET /api/scores/:address`

Get the reputation score for a specific wallet address.

**Parameters:**
- `address`: Ethereum wallet address (0x-prefixed)
- `chainId` (optional): Chain ID (default: 1 for Ethereum mainnet)
- `refresh` (optional): Boolean to force score recalculation (default: false)

**Response:**
```json
{
  "success": true,
  "data": {
    "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbe",
    "score": 750,
    "confidence": 0.85,
    "lastUpdated": "2024-01-01T00:00:00.000Z",
    "proofHash": "0x...",
    "breakdown": {
      "transactionConsistency": 800,
      "repaymentHistory": 700,
      "stakingBehavior": 750,
      "governanceParticipation": 650,
      "riskFactors": []
    },
    "metadata": {
      "totalTransactions": 125,
      "accountAge": 365,
      "chains": ["1"]
    },
    "creditDecision": {
      "tier": "A",
      "risk": "low",
      "recommendedAction": "Approve without restrictions",
      "rationale": "High transaction volume, good repayment history"
    }
  }
}
```

### Batch Score Retrieval

#### `POST /api/scores/batch`

Get reputation scores for multiple wallet addresses.

**Request Body:**
```json
{
  "wallets": [
    {
      "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbe",
      "chainId": 1
    },
    {
      "address": "0x123...",
      "chainId": 137
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": [...], // Array of reputation scores
  "count": 2
}
```

### Get Wallet Metrics

#### `GET /api/wallets/:address/metrics`

Get basic blockchain metrics for a wallet address.

**Parameters:**
- `address`: Ethereum wallet address (0x-prefixed)
- `chainId` (optional): Chain ID (default: 1 for Ethereum mainnet)

**Response:**
```json
{
  "success": true,
  "data": {
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbe",
    "totalTransactions": 125,
    "averageTransactionValue": "0.5",
    "lastActivity": "2024-01-01T00:00:00.000Z"
  }
}
```

### KRNL Utilities

#### `GET /api/krnl/health`

Check if the KRNL integration is working.

**Response:**
```json
{
  "connected": true,
  "latency": 120
}
```

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message",
  "message": "Detailed error message (only in development)",
  "details": [...] // Validation errors (if applicable)
}
```

## Rate Limiting

The API implements rate limiting:
- Global: 60 requests per minute per IP
- Per wallet: 10 requests per 5 minutes per wallet address

## Score Ranges

- 0-200: Very Poor
- 201-400: Poor
- 401-600: Fair
- 601-800: Good
- 801-1000: Excellent