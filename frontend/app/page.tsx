import Link from 'next/link'
import { Wallet, Shield, TrendingUp, Zap } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ProofScore</span>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Link
                href="/api-docs"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                API Docs
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Verifiable On-chain Reputation
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            ProofScore provides cryptographically proven reputation scores for wallets,
            enabling trust in DeFi, DAOs, and decentralized marketplaces without intermediaries.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              View Dashboard
            </Link>
            <Link
              href="/api-docs"
              className="px-8 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              API Documentation
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Shield className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Verifiable Proofs</h3>
            <p className="text-gray-600">
              Cryptographically signed reputation scores via KRNL middleware
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Wallet className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Multi-chain</h3>
            <p className="text-gray-600">
              Reputation tracking across Ethereum, Arbitrum, Base, and more
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <TrendingUp className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Transparent</h3>
            <p className="text-gray-600">
              Open scoring parameters and explainable reputation metrics
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Zap className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Privacy-Focused</h3>
            <p className="text-gray-600">
              Non-custodial and privacy-preserving reputation assessment
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
