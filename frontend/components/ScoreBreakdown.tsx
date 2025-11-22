'use client'

interface ScoreBreakdownProps {
  breakdown: {
    transactionConsistency: number
    repaymentHistory: number
    stakingBehavior: number
    governanceParticipation: number
    riskFactors: Array<{
      type: string
      severity: string
      description: string
      detectedAt: string
    }>
  }
}

export function ScoreBreakdown({ breakdown }: ScoreBreakdownProps) {
  const metrics = [
    {
      name: 'Transaction Consistency',
      value: breakdown.transactionConsistency,
      description: 'Measures regular and consistent transaction patterns',
      weight: 0.4,
    },
    {
      name: 'Repayment History',
      value: breakdown.repaymentHistory,
      description: 'Track record of loan repayments and creditworthiness',
      weight: 0.3,
    },
    {
      name: 'Staking Behavior',
      value: breakdown.stakingBehavior,
      description: 'Long-term commitment and network participation',
      weight: 0.2,
    },
    {
      name: 'Governance Participation',
      value: breakdown.governanceParticipation,
      description: 'Active engagement in DAO voting and proposals',
      weight: 0.1,
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => {
          const percentage = (metric.value / 1000) * 100
          return (
            <div key={metric.name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{metric.name}</h4>
                <span className="text-lg font-bold text-gray-700">{metric.value}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{metric.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Weight: {(metric.weight * 100).toFixed(0)}%</span>
                <span>{percentage.toFixed(1)}%</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Risk Factors */}
      {breakdown.riskFactors && breakdown.riskFactors.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Risk Factors</h4>
          <div className="space-y-2">
            {breakdown.riskFactors.map((risk, index) => (
              <div
                key={index}
                className={`border rounded-lg p-3 ${getSeverityColor(risk.severity)}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">{risk.type.replace('_', ' ')}</span>
                  <span className="text-xs capitalize">{risk.severity}</span>
                </div>
                <p className="text-sm mt-1">{risk.description}</p>
                <p className="text-xs mt-1 opacity-75">
                  Detected: {new Date(risk.detectedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!breakdown.riskFactors || breakdown.riskFactors.length === 0) && (
        <div className="text-center py-4 text-gray-500">
          No risk factors detected
        </div>
      )}
    </div>
  )
}
