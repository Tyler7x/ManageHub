import { generateReferralCode, isValidReferralCodeFormat } from './referral-code.service';

describe('generateReferralCode', () => {
  it('is deterministic — same userId always produces the same code', () => {
    const code1 = generateReferralCode('user-123');
    const code2 = generateReferralCode('user-123');
    expect(code1).toBe(code2);
  });

  it('output is always exactly 8 characters', () => {
    expect(generateReferralCode('user-1')).toHaveLength(8);
    expect(generateReferralCode('another-user-id')).toHaveLength(8);
    expect(generateReferralCode('')).toHaveLength(8);
  });

  it('output matches uppercase alphanumeric pattern', () => {
    const code = generateReferralCode('test-user');
    expect(code).toMatch(/^[A-Z0-9]{8}$/);
  });

  it('different userIds produce different codes', () => {
    const a = generateReferralCode('user-aaa');
    const b = generateReferralCode('user-bbb');
    const c = generateReferralCode('user-ccc');
    expect(a).not.toBe(b);
    expect(b).not.toBe(c);
  });
});

describe('isValidReferralCodeFormat', () => {
  it('returns true for a valid 8-char uppercase alphanumeric code', () => {
    expect(isValidReferralCodeFormat('ABCD1234')).toBe(true);
    expect(isValidReferralCodeFormat('00000000')).toBe(true);
    expect(isValidReferralCodeFormat('ZZZZZZZZ')).toBe(true);
  });

  it('returns false for a 7-character code', () => {
    expect(isValidReferralCodeFormat('ABCDE12')).toBe(false);
  });

  it('returns false for a 9-character code', () => {
    expect(isValidReferralCodeFormat('ABCDE1234')).toBe(false);
  });

  it('returns false for lowercase letters', () => {
    expect(isValidReferralCodeFormat('abcd1234')).toBe(false);
  });

  it('returns false for code with special characters', () => {
    expect(isValidReferralCodeFormat('ABCD-123')).toBe(false);
    expect(isValidReferralCodeFormat('ABCD 123')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isValidReferralCodeFormat('')).toBe(false);
  });
});
