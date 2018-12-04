import qr from '../QueryRule';

test('Normalizing an atomic rule will return the same reference', () => {
  const rule = { type: 'QR_STRING' };
  expect(qr.normalize(rule)).toBe(rule);
});

test('Normalizing a rule will clear remove children of NULLABLE rules', () => {
  const rule = {
    type: 'QR_NULLABLE',
    value: {
      type: 'QR_NULLABLE',
      value: { type: 'QR_NULLABLE', value: { type: 'QR_STRING' } },
    },
  };
  expect(qr.normalize(rule)).toEqual({
    type: 'QR_NULLABLE',
    value: { type: 'QR_STRING' },
  });
});

test('Normalizing an already-normalized nullable rule will return the same reference', () => {
  const rule = { type: 'QR_NULLABLE', value: { type: 'QR_NUMBER' } };
  expect(qr.normalize(rule)).toBe(rule);
});

test('Normalizing a struct with a nullable in it will remove adjacent nullables', () => {
  const rule = {
    type: 'QR_STRUCT',
    value: {
      foo: {
        type: 'QR_NULLABLE',
        value: {
          type: 'QR_NULLABLE',
          value: { type: 'QR_DATE' },
        },
      },
    },
  };

  expect(qr.normalize(rule)).toEqual({
    type: 'QR_STRUCT',
    value: {
      foo: {
        type: 'QR_NULLABLE',
        value: { type: 'QR_DATE' },
      },
    },
  });
});

test('Normalizing an already-normalized struct returns the same reference', () => {
  const rule = {
    type: 'QR_STRUCT',
    value: {
      foo: { type: 'QR_STRING' },
    },
  };
  expect(qr.normalize(rule)).toBe(rule);
});
