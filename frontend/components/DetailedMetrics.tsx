'use client'

import { TrendingUp, Vote, Lock, CreditCard, AlertTriangle } from 'lucide-react'

interface DetailedMetricsProps {
  breakdown: {
    transactionConsistency: number
    repaymentHistory: number
    stakingBehavior: number
    governanceParticipation: number
    riskFactors: Array<{
      type: string
      severity: 'low' | 'medium' | 'high'
      description: string
      detectedAt: string
    }>
  }
}

export function DetailedMetrics({ breakdown }: DetailedMetricsProps) {
  const metrics = [
    {
      name: 'Transaction Consistency',
      value: breakdown.transactionConsistency,
      description: 'Measures regular and consistent transaction patterns over time',
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      name: 'Governance Participation',
      value: breakdown.governanceParticipation,
      description: 'Active engagement in DAO voting and governance proposals',
      icon: Vote,
      color: 'bg-purple-500',
    },
    {
      name: 'Staking Behavior',
      value: breakdown.stakingBehavior,
      description: 'Long-term commitment and network participation through staking',
      icon: Lock,
      color: 'bg-green-500',
    },
    {
      name: 'Repayment History',
      value: breakdown.repaymentHistory,
      description: 'Track record of loan repayments and creditworthiness',
      icon: CreditCard,
      color: 'bg-orange-500',
    },
  ]

  const getBarColor = (value: number) => {
    if (value >= 750) return 'bg-success'
    if (value >= 600) return 'bg-primary'
    if (value >= 450) return 'bg-warning'
    return 'bg-red-500'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-secondary mb-6 font-display">Detailed Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon
          const percentage = (metric.value / 1000) * 100
          const barColor = getBarColor(metric.value)

          return (
            <div
              key={metric.name}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`${metric.color} p-2 rounded-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary">{metric.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-secondary">{metric.value}</div>
                  <div className="text-xs text-gray-500">/ 1000</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${barColor} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Score</span>
                  <span>{percentage.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Risk/Anomaly Detection Section */}
      {breakdown.riskFactors && breakdown.riskFactors.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h3 className="text-lg font-semibold text-secondary font-display">
              Risk & Anomaly Detection
            </h3>
          </div>
          <div className="space-y-3">
            {breakdown.riskFactors.map((risk, index) => {
              const getRiskColor = (severity: string) => {
                switch (severity) {
                  case 'high':
                    return 'bg-red-50 border-red-200 text-red-800'
                  case 'medium':
                    return 'bg-warning/10 border-warning text-warning'
                  case 'low':
                    return 'bg-blue-50 border-blue-200 text-blue-800'
                  default:
                    return 'bg-gray-50 border-gray-200 text-gray-800'
                }
              }

              return (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${getRiskColor(risk.severity)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium capitalize">
                      {risk.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-semibold capitalize bg-white/50 px-2 py-1 rounded">
                      {risk.severity}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{risk.description}</p>
                  <p className="text-xs opacity-75">
                    Detected: {new Date(risk.detectedAt).toLocaleDateString()}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {(!breakdown.riskFactors || breakdown.riskFactors.length === 0) && (
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center gap-2 text-gray-600">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="text-lg font-semibold font-display">Risk & Anomaly Detection</h3>
          </div>
          <p className="text-gray-500 mt-2 text-sm">
            No risk factors or anomalies detected. Wallet shows consistent and trustworthy behavior.
          </p>
        </div>
      )}
    </div>
  )
}
