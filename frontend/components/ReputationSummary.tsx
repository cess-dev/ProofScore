'use client'

import { CheckCircle2, Clock, Copy } from 'lucide-react'
import { useState } from 'react'
import { formatAddress } from '@/lib/utils'
import { getTrustLabel, getScoreColor, normalizeScore } from '@/lib/dummyData'

interface ReputationSummaryProps {
  score: {
    walletAddress: string
    score: number
    confidence: number
    lastUpdated: string
    proofHash?: string
  }
}

export function ReputationSummary({ score }: ReputationSummaryProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(score.walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const updated = new Date(timestamp)
    const diffInSeconds = Math.floor((now.getTime() - updated.getTime()) / 1000)
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  }

  const trustLabel = getTrustLabel(score.score)
  const scoreColor = getScoreColor(score.score)

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Score Badge */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className={`text-6xl font-bold ${scoreColor} font-display mb-1`}>
                {normalizeScore(score.score)}
              </div>
              <div className="text-lg text-gray-500 font-medium">
                / 100
              </div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-secondary font-display mb-1">
                {trustLabel}
              </div>
              <div className="text-sm text-gray-500">Trust Score</div>
            </div>
          </div>

        {/* Info Section */}
        <div className="flex-1 space-y-4 md:pl-6 md:border-l border-gray-200">
          {/* Proof Verification */}
          {score.proofHash && (
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Verified via KRNL</span>
            </div>
          )}

          {/* Wallet Address */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Wallet Address</div>
              <div className="text-sm font-mono text-secondary font-medium">
                {formatAddress(score.walletAddress)}
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Copy address"
            >
              <Copy className={`h-4 w-4 ${copied ? 'text-success' : 'text-gray-400'}`} />
            </button>
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Last updated {getTimeAgo(score.lastUpdated)}</span>
          </div>
        </div>
      </div>

      {/* Confidence Indicator */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Confidence Score</span>
          <span className="text-sm font-semibold text-secondary">
            {(score.confidence * 100).toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${score.confidence * 100}%` }}
          />
        </div>
      </div>

      {score.creditDecision && (
        <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide text-primary font-semibold">Credit Tier</div>
              <div className="text-2xl font-bold text-secondary font-display">
                {score.creditDecision.tier} <span className="text-sm text-gray-600">({score.creditDecision.risk} risk)</span>
              </div>
            </div>
            <div className="text-sm text-gray-600 max-w-sm text-right">
              {score.creditDecision.recommendedAction}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
