/**
 * Generate dummy reputation score data for development
 */

export interface DummyScore {
  walletAddress: string;
  score: number;
  confidence: number;
  lastUpdated: string;
  proofHash: string;
  breakdown: {
    transactionConsistency: number;
    repaymentHistory: number;
    stakingBehavior: number;
    governanceParticipation: number;
    riskFactors: Array<{
      type: string;
      severity: 'low' | 'medium' | 'high';
      description: string;
      detectedAt: string;
    }>;
  };
  metadata: {
    totalTransactions: number;
    accountAge: number;
    chains: string[];
  };
}

export function generateDummyScore(address: string): DummyScore {
  // Generate consistent scores based on address hash
  const hash = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Generate scores between 60-95 for demo
  const baseScore = 60 + (hash % 35);
  
  const transactionConsistency = Math.min(850 + (hash % 100), 1000);
  const repaymentHistory = Math.min(700 + (hash % 150), 1000);
  const stakingBehavior = Math.min(750 + (hash % 200), 1000);
  const governanceParticipation = Math.min(600 + (hash % 250), 1000);

  // Calculate weighted score
  const score = Math.round(
    transactionConsistency * 0.4 +
    repaymentHistory * 0.3 +
    stakingBehavior * 0.2 +
    governanceParticipation * 0.1
  );

  // Generate risk factors occasionally
  const riskFactors: DummyScore['breakdown']['riskFactors'] = [];
  if (hash % 3 === 0) {
    riskFactors.push({
      type: 'suspicious_pattern',
      severity: 'low',
      description: 'Unusual transaction timing detected',
      detectedAt: new Date(Date.now() - 86400000 * (hash % 7)).toISOString(),
    });
  }

  const confidence = 0.75 + (hash % 20) / 100;

  return {
    walletAddress: address,
    score: Math.min(score, 1000),
    confidence: Math.min(confidence, 1),
    lastUpdated: new Date().toISOString(),
    proofHash: `0x${Array.from({ length: 64 }, () => (hash % 16).toString(16)).join('')}`,
    breakdown: {
      transactionConsistency,
      repaymentHistory,
      stakingBehavior,
      governanceParticipation,
      riskFactors,
    },
    metadata: {
      totalTransactions: 500 + (hash % 2000),
      accountAge: 100 + (hash % 500),
      chains: hash % 2 === 0 ? ['1', '42161'] : ['1'],
    },
  };
}

export function getTrustLabel(score: number): string {
  // Score is out of 1000, convert thresholds for 0-100 scale
  const normalized = (score / 1000) * 100;
  if (normalized >= 75) return 'Excellent';
  if (normalized >= 60) return 'Trustworthy';
  if (normalized >= 45) return 'Good';
  if (normalized >= 30) return 'Fair';
  return 'Poor';
}

export function getScoreColor(score: number): string {
  const normalized = (score / 1000) * 100;
  if (normalized >= 75) return 'text-success';
  if (normalized >= 60) return 'text-primary';
  if (normalized >= 45) return 'text-warning';
  return 'text-red-600';
}

export function normalizeScore(score: number): number {
  // Convert 0-1000 scale to 0-100 scale
  return Math.round((score / 1000) * 100);
}
