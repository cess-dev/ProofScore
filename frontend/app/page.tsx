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
                href="/"
                className="px-4 py-2 text-sm font-medium text-primary-600 font-semibold"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
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
              href="/settings"
              className="px-8 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Account Settings
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

        {/* Score Explanation Section */}
        <div className="mt-20 bg-white rounded-xl shadow-sm p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">How Scores Are Calculated</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Scoring Factors</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span><strong>Transaction Consistency (40%)</strong> - Based on number of on-chain transactions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span><strong>Repayment History (30%)</strong> - From lending/borrowing activities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span><strong>Staking Behavior (20%)</strong> - Participation in staking protocols</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span><strong>Governance Participation (10%)</strong> - Voting in DAOs</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Score Tiers</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">A (90-100)</span>
                  <span className="text-sm text-gray-600">Very Low Risk</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">B (70-89)</span>
                  <span className="text-sm text-gray-600">Low Risk</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium">C (50-69)</span>
                  <span className="text-sm text-gray-600">Medium Risk</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">D (0-49)</span>
                  <span className="text-sm text-gray-600">High Risk</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">Why Some Wallets Show Default Scores</h4>
                <p className="text-sm text-gray-600">
                  New or inactive wallets may show a default score of 30/100 (Tier D) due to insufficient on-chain activity. 
                  This is a conservative assessment when minimal transaction history is available, protecting 
                  against potential risks from unverified addresses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary-600" />
                <span className="text-lg font-bold text-gray-900">ProofScore</span>
              </div>
              <p className="text-gray-600 text-sm">
                Verifiable on-chain reputation for the decentralized economy.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/dashboard" className="text-gray-600 hover:text-primary text-sm">Dashboard</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-primary text-sm">Features</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-primary text-sm">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-primary text-sm">About</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-primary text-sm">Blog</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-primary text-sm">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-600 hover:text-primary text-sm">Help Center</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-primary text-sm">Contact</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-primary text-sm">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2024 ProofScore. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">Privacy Policy</Link>
              <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">Terms of Service</Link>
              <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
