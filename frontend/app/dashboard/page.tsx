'use client'

import { useState } from 'react'
import { Wallet, Search, CheckCircle2, AlertCircle } from 'lucide-react'
import { ReputationSummary } from '@/components/ReputationSummary'
import { DetailedMetrics } from '@/components/DetailedMetrics'
import { ProofVerification } from '@/components/ProofVerification'
import { api } from '@/lib/api'

export default function Dashboard() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [score, setScore] = useState<any>(null)

  const handleSearch = async () => {
    if (!address.trim()) {
      setError('Please enter a wallet address or ENS name')
      return
    }

    // Basic validation (allow ENS names too)
    const isAddress = address.match(/^0x[a-fA-F0-9]{40}$/)
    const isENS = address.endsWith('.eth')

    if (!isAddress) {
      setError(isENS ? 'ENS resolution coming soon. Please use a 0x address.' : 'Please enter a valid Ethereum address')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const apiScore = await api.getScore(address)
      setScore(apiScore)
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch score')
      setScore(null)
    } finally {
      setLoading(false)
    }
  }

  const handleConnectWallet = async () => {
    // TODO: Implement wallet connection (MetaMask, WalletConnect, etc.)
    // For now, we'll simulate connecting and auto-filling
    const mockAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
    setAddress(mockAddress)
    
    // Auto-trigger search after connecting
    if (mockAddress) {
      setLoading(true)
      try {
        const apiScore = await api.getScore(mockAddress)
        setScore(apiScore)
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch score')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-secondary font-display">ProofScore</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="address" className="block text-sm font-medium text-secondary mb-2">
                Wallet Address or ENS Name
              </label>
              <div className="relative">
                <Wallet className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !loading && handleSearch()}
                  placeholder="0x... or name.eth"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex items-end gap-3">
              <button
                onClick={handleSearch}
                disabled={loading || !address.trim()}
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center gap-2 min-w-[160px] justify-center"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>Check Reputation</span>
                  </>
                )}
              </button>
              <button
                onClick={handleConnectWallet}
                className="px-6 py-3 bg-white border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary-50 transition-all flex items-center gap-2"
              >
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Reputation Summary Card */}
        {score && (
          <div className="space-y-6">
            <ReputationSummary score={score} />

            {/* Detailed Metrics Section */}
            <DetailedMetrics breakdown={score.breakdown} />

            {/* Proof and Verification Section */}
            <ProofVerification proof={score.proofHash} score={score} />
          </div>
        )}

        {/* Empty State */}
        {!score && !loading && !error && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-secondary mb-2 font-display">
              Check Wallet Reputation
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter a wallet address or ENS name above to view its verifiable reputation score.
              Connect your wallet to quickly check your own reputation.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}