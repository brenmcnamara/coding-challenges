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

test('Get the query rule from a shallow path', () => {
  const rule = {
    type: 'QR_STRUCT',
    value: { foo: { type: 'QR_STRING' } },
  };

  expect(qr.getRuleAtPath(rule, 'foo')).toEqual({ type: 'QR_STRING' });
});

test('Get the query rule from a deep path', () => {
  const rule = {
    type: 'QR_STRUCT',
    value: {
      foo: {
        type: 'QR_STRUCT',
        value: {
          bar: { type: 'QR_NUMBER' },
        },
      },
    },
  };

  expect(qr.getRuleAtPath(rule, 'foo.bar')).toEqual({ type: 'QR_NUMBER' });
});

test('Getting the query rule of an empty string returns the root rule', () => {
  const rule = {
    type: 'QR_STRUCT',
    value: { foo: { type: 'QR_NUMBER' } },
  };
  expect(qr.getRuleAtPath(rule, '')).toBe(rule);
});

test('Getting the query rule will traverse nullable types', () => {
  const rule = {
    type: 'QR_NULLABLE',
    value: {
      type: 'QR_STRUCT',
      value: {
        foo: { type: 'QR_NUMBER' },
      },
    },
  };
  expect(qr.getRuleAtPath(rule, 'foo')).toEqual({ type: 'QR_NUMBER' });
});

test('Getting the query rule from a non-existant path returns null', () => {
  const rule = {
    type: 'QR_STRUCT',
    value: {
      foo: {
        type: 'QR_STRUCT',
        value: {
          bar: { type: 'QR_NUMBER' },
        },
      },
    },
  };

  expect(qr.getRuleAtPath(rule, 'baz')).toBe(null);
  expect(qr.getRuleAtPath(rule, 'foo.bar.baz')).toBe(null);
});
