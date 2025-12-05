import { CreditDecision, ReputationScore } from '../types';

const ACTIONS: Record<CreditDecision['tier'], string> = {
  A: 'Eligible for undercollateralized lending up to protocol max.',
  B: 'Eligible for partially collateralized products.',
  C: 'Require additional collateral or manual review.',
  D: 'Decline automated credit; request more data.',
};

const RATIONALE: Record<CreditDecision['tier'], string> = {
  A: 'Consistent history and strong participation across metrics.',
  B: 'Healthy activity but some moderate risk factors detected.',
  C: 'Limited history or inconsistent repayment signals.',
  D: 'High risk indicators present; insufficient trustworthy activity.',
};

export const creditDecisionEngine = {
  categorizeScore(score: number): CreditDecision {
    if (score >= 800) {
      return { tier: 'A', risk: 'low', recommendedAction: ACTIONS.A, rationale: RATIONALE.A };
    }
    if (score >= 600) {
      return { tier: 'B', risk: 'medium', recommendedAction: ACTIONS.B, rationale: RATIONALE.B };
    }
    if (score >= 400) {
      return { tier: 'C', risk: 'high', recommendedAction: ACTIONS.C, rationale: RATIONALE.C };
    }
    return { tier: 'D', risk: 'very_high', recommendedAction: ACTIONS.D, rationale: RATIONALE.D };
  },

  evaluate(score: ReputationScore) {
    return this.categorizeScore(score.score);
  },
};

