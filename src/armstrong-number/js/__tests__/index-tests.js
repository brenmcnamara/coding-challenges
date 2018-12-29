import { isArmstrongNumber } from '..';

function range(lo, hi): Array<number> {
  const arr = [];
  for (let i = lo; i < hi; ++i) {
    arr.push(i);
  }
  return arr;
}

test('Correctly determines if a number is an armstrong number of count 1', () => {
  expect(range(0, 1000).filter(n => isArmstrongNumber(n, 1))).toEqual(
    range(0, 10),
  );
});

test('Correctly detemines if a number is an armstrong number of count 3', () => {
  expect(range(0, 410).filter(n => isArmstrongNumber(n, 3))).toEqual([
    0,
    1,
    153,
    370,
    371,
    407,
  ]);
});
