import Link from 'next/link'
import { Shield, Users, Globe, Zap } from 'lucide-react'

export default function About() {
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
                href="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-sm font-medium text-primary-600 font-semibold"
              >
                About
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Link
                href="/settings"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About ProofScore</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing trust in decentralized systems through verifiable on-chain reputation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Shield className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Verifiable Trust</h3>
            <p className="text-gray-600">
              Our system provides cryptographically verifiable reputation scores using KRNL middleware, 
              ensuring trust without intermediaries.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Globe className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Multi-Chain</h3>
            <p className="text-gray-600">
              Track reputation across Ethereum, Arbitrum, Base, Polygon and other EVM-compatible chains 
              from a single interface.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Zap className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
            <p className="text-gray-600">
              Get up-to-date reputation scores with real-time blockchain data and transparent scoring methodology.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            In the decentralized world of Web3, trust is paramount. ProofScore bridges the gap between 
            pseudonymous addresses and verifiable reputation, enabling safer interactions in DeFi, DAOs, 
            and decentralized marketplaces.
          </p>
          <p className="text-gray-600">
            Our goal is to create a transparent, verifiable, and privacy-preserving reputation system 
            that enhances trust while preserving user anonymity.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-primary-100 rounded-full p-3 mr-4">
                <span className="text-primary-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Data Collection</h3>
                <p className="text-gray-600">
                  We analyze on-chain activity across multiple blockchains to build comprehensive 
                  behavioral profiles for each wallet address.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary-100 rounded-full p-3 mr-4">
                <span className="text-primary-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Reputation Calculation</h3>
                <p className="text-gray-600">
                  Our algorithm evaluates transaction history, repayment behavior, staking activity, 
                  and governance participation to generate a comprehensive score.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary-100 rounded-full p-3 mr-4">
                <span className="text-primary-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Verification</h3>
                <p className="text-gray-600">
                  KRNL middleware provides cryptographic verification of scores, ensuring they are 
                  tamper-proof and verifiable by any third party.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}