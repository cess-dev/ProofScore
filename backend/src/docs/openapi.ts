export const openApiSpec = {
  openapi: '3.0.1',
  info: {
    title: 'ProofScore API',
    version: '1.0.0',
    description: 'API documentation for ProofScore verifiable reputation engine',
  },
  servers: [{ url: 'http://localhost:3001', description: 'Local dev server' }],
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        responses: {
          '200': {
            description: 'Service healthy',
          },
        },
      },
    },
    '/api/scores/{address}': {
      get: {
        summary: 'Get reputation score for a wallet',
        parameters: [
          {
            name: 'address',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
          {
            name: 'chainId',
            in: 'query',
            required: false,
            schema: { type: 'number' },
          },
          {
            name: 'refresh',
            in: 'query',
            schema: { type: 'boolean' },
          },
        ],
        responses: {
          '200': {
            description: 'Reputation score returned',
          },
        },
      },
    },
    '/api/scores/batch': {
      post: {
        summary: 'Get scores for multiple wallets',
        requestBody: {
          required: true,
        },
        responses: {
          '200': { description: 'Batch scores returned' },
        },
      },
    },
    '/api/krnl/webhook': {
      post: {
        summary: 'Webhook endpoint for KRNL computations',
        responses: {
          '200': { description: 'Webhook processed' },
        },
      },
    },
  },
};

