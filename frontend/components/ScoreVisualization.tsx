'use client'

import { useEffect, useState } from 'react'
import { ReputationScore } from '@/lib/api'

interface ScoreVisualizationProps {
  score: ReputationScore
}

export function ScoreVisualization({ score }: ScoreVisualizationProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    // Animate score from 0 to actual value
    const duration = 1000
    const steps = 60
    const increment = score.score / steps
    let current = 0

    const interval = setInterval(() => {
      current += increment
      if (current >= score.score) {
        setAnimatedScore(score.score)
        clearInterval(interval)
      } else {
        setAnimatedScore(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [score.score])

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600'
    if (score >= 500) return 'text-yellow-600'
    if (score >= 250) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 750) return 'Excellent'
    if (score >= 500) return 'Good'
    if (score >= 250) return 'Fair'
    return 'Poor'
  }

  const percentage = (score.score / 1000) * 100

  return (
    <div className="space-y-6">
      {/* Large Score Display */}
      <div className="text-center">
        <div className="inline-flex flex-col items-center">
          <div className={`text-6xl font-bold ${getScoreColor(score.score)} mb-2`}>
            {animatedScore}
          </div>
          <div className="text-sm text-gray-600 mb-4">out of 1000</div>
          <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
            score.score >= 750 ? 'bg-green-100 text-green-800' :
            score.score >= 500 ? 'bg-yellow-100 text-yellow-800' :
            score.score >= 250 ? 'bg-orange-100 text-orange-800' :
            'bg-red-100 text-red-800'
          }`}>
            {getScoreLabel(score.score)}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all duration-1000 ${
              score.score >= 750 ? 'bg-green-600' :
              score.score >= 500 ? 'bg-yellow-600' :
              score.score >= 250 ? 'bg-orange-600' :
              'bg-red-600'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>0</span>
          <span>250</span>
          <span>500</span>
          <span>750</span>
          <span>1000</span>
        </div>
      </div>

      {/* Confidence Indicator */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        <span>Confidence:</span>
        <div className="flex items-center gap-1">
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${score.confidence * 100}%` }}
            />
          </div>
          <span className="font-semibold">{(score.confidence * 100).toFixed(0)}%</span>
        </div>
      </div>
    </div>
  )
}
