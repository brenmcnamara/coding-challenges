import newtonsMethod from '../newtons-method';

function xSquaredMinus5(x: number): number {
  return x * x - 5;
}

function derivativeOfXSquaredMinus5(x: number): number {
  return 2 * x;
}

test('Approximates x^2 + 5 = 0 for x', () => {
  const x = newtonsMethod(xSquaredMinus5, derivativeOfXSquaredMinus5, 0);
  expect(x).toBeCloseTo(Math.sqrt(5));
});

test('Approximates x^2 + 5 = -1 for x', () => {
  const x = newtonsMethod(xSquaredMinus5, derivativeOfXSquaredMinus5, -1);
  expect(x).toBeCloseTo(2);
});
