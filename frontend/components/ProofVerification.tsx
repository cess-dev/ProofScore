'use client'

import { Shield, CheckCircle2, FileText, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface ProofVerificationProps {
  proof?: string
  score: {
    score: number
    lastUpdated: string
    confidence: number
  }
}

export function ProofVerification({ proof, score }: ProofVerificationProps) {
  const [expanded, setExpanded] = useState(false)

  if (!proof) {
    return (
      <div className="bg-gray-50 rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center gap-3 text-gray-600">
          <Shield className="h-5 w-5" />
          <span className="text-sm">Proof verification pending</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-xl shadow-sm p-8 border border-primary-100">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-success/20 p-2 rounded-lg">
            <CheckCircle2 className="h-6 w-6 text-success" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-secondary font-display">
              Verifiable Proof Generated
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              This reputation score was cryptographically verified via KRNL middleware
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Proof Info */}
        <div className="bg-white/80 rounded-lg p-4 border border-primary-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Proof Hash</span>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-primary hover:text-primary-600 transition-colors"
            >
              {expanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
          {expanded ? (
            <div className="mt-2">
              <code className="text-xs font-mono text-secondary bg-gray-100 px-3 py-2 rounded block break-all">
                {proof}
              </code>
              <p className="text-xs text-gray-500 mt-2">
                This cryptographic proof ensures the score was computed correctly and can be
                verified on-chain without revealing the underlying computation details.
              </p>
            </div>
          ) : (
            <code className="text-xs font-mono text-gray-600">
              {proof.slice(0, 20)}...{proof.slice(-10)}
            </code>
          )}
        </div>

        {/* Verification Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 rounded-lg p-4 border border-primary-200">
            <div className="text-xs text-gray-500 mb-1">Verification Method</div>
            <div className="font-semibold text-secondary">KRNL Signature</div>
          </div>
          <div className="bg-white/80 rounded-lg p-4 border border-primary-200">
            <div className="text-xs text-gray-500 mb-1">Computation Time</div>
            <div className="font-semibold text-secondary">
              {new Date(score.lastUpdated).toLocaleTimeString()}
            </div>
          </div>
          <div className="bg-white/80 rounded-lg p-4 border border-primary-200">
            <div className="text-xs text-gray-500 mb-1">Proof Reliability</div>
            <div className="font-semibold text-success">
              {(score.confidence * 100).toFixed(0)}% Verified
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-white/60 rounded-lg p-4 border border-primary-200">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">How Verification Works</p>
              <p className="text-gray-600">
                KRNL middleware performs off-chain computation of your reputation score and
                generates a cryptographic proof. Smart contracts can verify this proof without
                re-running the entire computation, ensuring both transparency and efficiency.
              </p>
            </div>
          </div>
        </div>

        {/* Action */}
        <button className="w-full md:w-auto px-6 py-3 bg-white border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
          <ExternalLink className="h-4 w-4" />
          <span>Verify Proof On-Chain</span>
        </button>
      </div>
    </div>
  )
}
