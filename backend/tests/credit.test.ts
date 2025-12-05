import { describe, expect, it } from 'vitest';
import { creditDecisionEngine } from '../src/services/credit';

describe('creditDecisionEngine', () => {
  it('categorizes high scores as tier A', () => {
    const decision = creditDecisionEngine.categorizeScore(850);
    expect(decision.tier).toBe('A');
    expect(decision.risk).toBe('low');
  });

  it('categorizes medium scores as tier B', () => {
    const decision = creditDecisionEngine.categorizeScore(650);
    expect(decision.tier).toBe('B');
  });

  it('categorizes low scores as tier D', () => {
    const decision = creditDecisionEngine.categorizeScore(300);
    expect(decision.tier).toBe('D');
    expect(decision.risk).toBe('very_high');
  });
});

