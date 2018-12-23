/* @flow */

export function isArmstrongNumber(num: number, digitCount: number): boolean {
  if (num !== Math.floor(num)) {
    return false;
  }

  const digits = String(Math.floor(num)).split('').map(n => parseInt(n, 10));
  if (digits.length > digitCount) {
    return false;
  }

  return digits.reduce((sum, d) => sum + Math.pow(d, digitCount), 0) === num;
}
