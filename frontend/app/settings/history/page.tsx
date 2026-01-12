'use client'

import { useState } from 'react'
import Link from 'next/link'
import { History, Trash2 } from 'lucide-react'

export default function HistorySettings() {
  const [recentSearches, setRecentSearches] = useState([
    { address: '0x742D35cC6634c0532925A3b844bc9E7595F0bebE', timestamp: '2024-01-10T10:00:00Z', score: 300 },
    { address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B', timestamp: '2024-01-10T09:30:00Z', score: 427 },
    { address: '0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326', timestamp: '2024-01-10T08:45:00Z', score: 700 },
  ])

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
                  <History className="h-5 w-5 text-white" />
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
          <h1 className="text-3xl font-bold text-secondary">Search History</h1>
          <p className="text-gray-600 mt-2">View and manage your wallet reputation search history</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-secondary">Recent Searches</h2>
            {recentSearches.length > 0 && (
              <button 
                onClick={clearSearchHistory}
                className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium"
              >
                <Trash2 className="h-4 w-4" />
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
  )
}