## ProofScore API Reference

Base URL: `http://localhost:3001`

### `GET /health`

Health check.

### `GET /api/scores/:address`

Fetch a wallet reputation score.

Query params:

| Name | Type | Description |
| --- | --- | --- |
| `chainId` | number | Optional chain scope |
| `refresh` | boolean | Force recomputation |

Response:

```json
{
  "success": true,
  "data": {
    "walletAddress": "0x123...",
    "score": 780,
    "confidence": 0.92,
    "creditDecision": {
      "tier": "B",
      "risk": "medium",
      "recommendedAction": "Eligible for partially collateralized products.",
      "rationale": "Healthy activity but some moderate risk factors detected."
    }
  }
}
```

### `POST /api/scores/batch`

Request body:

```json
{
  "wallets": [{ "address": "0x123...", "chainId": 1 }]
}
```

### `DELETE /api/scores/:address/cache`

Clears cached score for a wallet.

### `GET /api/wallets/:address/metrics`

Returns basic wallet metrics fetched from on-chain RPC providers.

### `GET /api/krnl/health`

Proxies the KRNL middleware health endpoint.

### `POST /api/krnl/verify`

Body:

```json
{ "proofHash": "0x...", "signature": "0x..." }
```

### `GET /api/krnl/computation/:id`

Check computation status.

### `POST /api/krnl/webhook`

KRNL webhook receiver. Includes HMAC-style secret header `x-krnl-signature`.

Payload:

```json
{
  "chainId": 1,
  "score": {
    "walletAddress": "0x123...",
    "score": 780,
    "confidence": 0.9,
    "breakdown": { "...": "..." },
    "metadata": { "...": "..." }
  }
}
```

Response:

```json
{ "success": true }
```

