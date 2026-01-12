'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Wallet, User, Shield, LogOut, History, Settings as SettingsIcon } from 'lucide-react'

export default function SettingsPage() {
  const [connectedWallets, setConnectedWallets] = useState([
    { address: '0x742D35cC6634c0532925A3b844bc9E7595F0bebE', name: 'Primary Wallet', isPrimary: true },
    { address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B', name: 'Secondary Wallet', isPrimary: false },
  ])
  const [recentSearches, setRecentSearches] = useState([
    { address: '0x742D35cC6634c0532925A3b844bc9E7595F0bebE', timestamp: '2024-01-10T10:00:00Z', score: 300 },
    { address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B', timestamp: '2024-01-10T09:30:00Z', score: 427 },
    { address: '0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326', timestamp: '2024-01-10T08:45:00Z', score: 700 },
  ])

  const disconnectWallet = (address: string) => {
    setConnectedWallets(prev => prev.filter(wallet => wallet.address !== address))
  }

  const clearSearchHistory = () => {
    setRecentSearches([])
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
                  <SettingsIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-secondary font-display">ProofScore</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Home
              </Link>
              <Link href="/about"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                About
              </Link>
              <Link href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Link href="/settings"
                className="px-4 py-2 text-sm font-medium text-primary-600 font-semibold"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account, wallets, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <nav className="space-y-2">
                <Link href="/settings" className="flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary rounded-lg font-medium">
                  <SettingsIcon className="h-5 w-5" />
                  <span>Account Settings</span>
                </Link>
                <Link href="/settings/wallets" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg hover:text-secondary">
                  <Wallet className="h-5 w-5" />
                  <span>Connected Wallets</span>
                </Link>
                <Link href="/settings/history" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg hover:text-secondary">
                  <History className="h-5 w-5" />
                  <span>Search History</span>
                </Link>
                <Link href="/settings/security" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg hover:text-secondary">
                  <Shield className="h-5 w-5" />
                  <span>Security</span>
                </Link>
                <Link href="/settings/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg hover:text-secondary">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Connected Wallets */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-secondary">Connected Wallets</h2>
                <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                  {connectedWallets.length} wallets
                </span>
              </div>

              <div className="space-y-4">
                {connectedWallets.map((wallet, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-block w-3 h-3 rounded-full ${wallet.isPrimary ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        <span className="font-medium">{wallet.name}</span>
                        {wallet.isPrimary && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Primary</span>
                        )}
                      </div>
                      <p className="text-gray-600 font-mono text-sm mt-1">{wallet.address}</p>
                    </div>
                    <button 
                      onClick={() => disconnectWallet(wallet.address)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      <LogOut className="h-4 w-4" />
                      Disconnect
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Connect New Wallet
                </button>
              </div>
            </div>

            {/* Search History */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-secondary">Search History</h2>
                {recentSearches.length > 0 && (
                  <button 
                    onClick={clearSearchHistory}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Clear History
                  </button>
                )}
              </div>

              {recentSearches.length > 0 ? (
                <div className="space-y-3">
                  {recentSearches.map((search, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-mono text-sm">{search.address}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {new Date(search.timestamp).toLocaleString()} • Score: {search.score}
                        </p>
                      </div>
                      <Link href={`/dashboard?address=${search.address}`} className="text-primary hover:text-primary-600 text-sm font-medium">
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <History className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p>No search history yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}