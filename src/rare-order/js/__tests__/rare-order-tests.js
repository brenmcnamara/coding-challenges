import rareOrder from '../rare-order';

test('Rare Order passes example test', () => {
  expect(rareOrder(['XWY', 'ZX', 'ZXY', 'ZXW', 'YWWX'])).toBe('XZYW');
});

test('Rare Order specifies order based on single letter words', () => {
  expect(rareOrder(['A', 'C', 'B', 'D'])).toBe('ACBD');
});

test('Rare Order specifies order of characters that never show up at the start of word', () => {
  expect(rareOrder(['AC', 'AB', 'AF', 'AE', 'C'])).toBe('ACBFE');
});

test('Rare Order throws error when there are multiple valid orderings', () => {
  expect(() => rareOrder(['AB', 'AC'])).toThrow();
});

test('Rare Order specifies order (edge case)', () => {
  expect(rareOrder(['A', 'C', 'CB', 'CC', 'CCA', 'CCB'])).toBe('ABC');
});

test('Rare Order throws error if the ordering makes no sense', () => {
  expect(() => rareOrder(['A', 'B', 'AA'])).toThrow();
  expect(() => rareOrder(['A', 'B', 'BB', 'BC', 'BCC', 'BCA'])).toThrow();
});

test('Rare Order throws error if empty list is passed as arg', () => {
  expect(() => rareOrder([])).toThrow();
});

test('Rare Order throws error if given a word with no characters', () => {
  expect(() => rareOrder(['A', 'B', ''])).toThrow();
});
