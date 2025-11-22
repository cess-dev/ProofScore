/**
 * ProofScore Core Types
 */

export interface WalletAddress {
  address: string;
  chainId?: number;
}

export interface ReputationScore {
  walletAddress: string;
  score: number; // 0-1000 scale
  confidence: number; // 0-1, how reliable the score is
  lastUpdated: string; // ISO timestamp
  proofHash?: string; // KRNL proof hash
  breakdown: ScoreBreakdown;
  metadata: {
    totalTransactions: number;
    accountAge: number; // days
    chains: string[];
  };
}

export interface ScoreBreakdown {
  transactionConsistency: number; // 0-1000
  repaymentHistory: number; // 0-1000 (if applicable)
  stakingBehavior: number; // 0-1000
  governanceParticipation: number; // 0-1000
  riskFactors: RiskFactor[];
}

export interface RiskFactor {
  type: 'sybil' | 'wash_trading' | 'suspicious_pattern' | 'low_activity';
  severity: 'low' | 'medium' | 'high';
  description: string;
  detectedAt: string;
}

export interface KRNLProof {
  proofHash: string;
  signature: string;
  timestamp: string;
  computationId: string;
  verified: boolean;
}

export interface ScoreRequest {
  walletAddress: string;
  chainId?: number;
  refresh?: boolean; // Force recalculation
}

export interface WalletMetrics {
  address: string;
  totalTransactions: number;
  uniqueProtocols: number;
  firstSeen: string;
  lastActivity: string;
  averageTransactionValue: string;
  transactionFrequency: number; // transactions per day
  repaymentRate?: number; // 0-1, if applicable
  stakingDuration?: number; // days
  governanceVotes?: number;
}
