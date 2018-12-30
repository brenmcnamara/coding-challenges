/* @flow */

export type SingleVarMathEquation = (x: number) => number;

const MIN_DIFF_BETWEEN_ITERATION = 1e-3;

/**
 * This is an implementation of newton's method. The goal of newton's method
 * is to approximate the solution to an equation. For example, we may have an
 * equation f(x) x^2 - 5 and we want to solve f(x) = 0 for x. To come up with
 * an approximation to x that satisfies the above equation, newton's method
 * converges to the solution using tangent lines to getter progressively better
 * approximations. For a full explanation of how newton's method works, there
 * is plenty of material online.
 *
 * DISCLAIMER: This implementation should not be used in production because
 * there are a number of things wrong with it:
 *
 * - It is not implemented with efficiency in mind
 * - The stopping condition is not adequate for generate use
 * - The initial guess is not adequate for generate use
 */
export default function newtonsMethod(
  fn: SingleVarMathEquation,
  deriv: SingleVarMathEquation,
  solution: number,
): number {
  let prevApprox = Infinity;
  let approx = Math.random();

  while (Math.abs(approx - prevApprox) > MIN_DIFF_BETWEEN_ITERATION) {
    prevApprox = approx;
    approx = approx - (fn(approx) - solution) / deriv(approx);
  }

  return approx;
}
