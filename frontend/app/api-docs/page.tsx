import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export default function APIDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">API Documentation</h1>
          <p className="text-sm text-gray-600 mt-1">REST API for ProofScore reputation scores</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 mb-4">
              The ProofScore API provides programmatic access to wallet reputation scores.
              All endpoints return JSON responses and require wallet addresses in Ethereum format (0x...).
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-mono text-gray-700">
                Base URL: <span className="text-primary-600">http://localhost:3001</span>
              </p>
            </div>
          </section>

          {/* Get Score */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Get Reputation Score</h2>
            <p className="text-gray-600 mb-4">
              Retrieve the reputation score for a specific wallet address.
            </p>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <code className="text-green-400">
                GET /api/scores/:address
              </code>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">Query Parameters</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Parameter</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">chainId</td>
                    <td className="px-4 py-2 text-sm text-gray-600">number (optional)</td>
                    <td className="px-4 py-2 text-sm text-gray-600">Specific chain ID to query (default: all chains)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">refresh</td>
                    <td className="px-4 py-2 text-sm text-gray-600">boolean (optional)</td>
                    <td className="px-4 py-2 text-sm text-gray-600">Force recalculation (default: false)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 mt-4">Example Request</h3>
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <code className="text-green-400">
                curl http://localhost:3001/api/scores/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb?refresh=true
              </code>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">Example Response</h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`{
  "success": true,
  "data": {
    "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "score": 750,
    "confidence": 0.85,
    "lastUpdated": "2024-01-15T10:30:00Z",
    "proofHash": "0x...",
    "breakdown": {
      "transactionConsistency": 800,
      "repaymentHistory": 700,
      "stakingBehavior": 750,
      "governanceParticipation": 600,
      "riskFactors": []
    },
    "metadata": {
      "totalTransactions": 1250,
      "accountAge": 365,
      "chains": ["1", "42161"]
    }
  }
}`}
              </pre>
            </div>
          </section>

          {/* Batch Scores */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Get Batch Scores</h2>
            <p className="text-gray-600 mb-4">
              Retrieve reputation scores for multiple wallets in a single request (max 100 wallets).
            </p>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <code className="text-green-400">
                POST /api/scores/batch
              </code>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">Request Body</h3>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`{
  "wallets": [
    { "address": "0x...", "chainId": 1 },
    { "address": "0x...", "chainId": 42161 }
  ]
}`}
              </pre>
            </div>
          </section>

          {/* Wallet Metrics */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Get Wallet Metrics</h2>
            <p className="text-gray-600 mb-4">
              Get basic on-chain metrics for a wallet address.
            </p>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <code className="text-green-400">
                GET /api/wallets/:address/metrics
              </code>
            </div>
          </section>

          {/* KRNL Health */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">KRNL Service Health</h2>
            <p className="text-gray-600 mb-4">
              Check the health status of the KRNL middleware integration.
            </p>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <code className="text-green-400">
                GET /api/krnl/health
              </code>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
