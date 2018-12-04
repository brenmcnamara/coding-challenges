import q from '../Query';

import { HogwartsStudent } from '../../test-models';

const isValidHogwartsQuery = q.isValidQuery.bind(null, HogwartsStudent);

// TODO: Need to add a nullable prop to HogwartsStudent for testing.

test('Query validates date queries', () => {
  const validQuery = q.Date('createdAt', {
    type: 'Q_OP_DATE_AFTER',
    value: Date.now(),
  });
  expect(isValidHogwartsQuery(validQuery)).toBe(true);

  const invalidOp = q.Date('createdAt', {
    type: 'Q_OP_ENUM_EQUALS_ONE_OF',
    value: ['SOME_ENUM_VAL'],
  });
  expect(isValidHogwartsQuery(invalidOp)).toBe(false);

  const invalidPath = q.Date('blah', {
    type: 'Q_OP_DATE_AFTER',
    value: Date.now(),
  });
  expect(isValidHogwartsQuery(invalidPath)).toBe(false);
});

test('Query validates enum queries', () => {
  const validQuery = q.Enum('house', {
    type: 'Q_OP_ENUM_EQUALS_ONE_OF',
    value: ['GRIFFINDOR'],
  });
  expect(isValidHogwartsQuery(validQuery)).toBe(true);

  const invalidOp = q.Enum('house', {
    type: 'Q_OP_DATE_AFTER',
    value: Date.now(),
  });
  expect(isValidHogwartsQuery(invalidOp)).toBe(false);

  const invalidPath = q.Enum('blah', {
    type: 'Q_OP_ENUM_EQUALS_ONE_OF',
    value: ['GRIFFINDOR'],
  });
  expect(isValidHogwartsQuery(invalidPath)).toBe(false);
});

test('Query validates number', () => {
  const validQuery = q.Number('housePointsEarned', {
    type: 'Q_OP_NUMBER_GT',
    value: 1000,
  });
  expect(isValidHogwartsQuery(validQuery)).toBe(true);

  const invalidOp = q.Number('housePointsEarned', {
    type: 'Q_OP_DATE_AFTER',
    value: Date.now(),
  });
  expect(isValidHogwartsQuery(invalidOp)).toBe(false);

  const invalidPath = q.Number('blah', {
    type: 'Q_OP_NUMBER_LT',
    value: 500,
  });
  expect(isValidHogwartsQuery(invalidPath)).toBe(false);
});

test('Query validates nullable', () => {
  const validQuery = q.Enum('magicAnimal', {
    type: 'Q_OP_NULLABLE_IS_NULL',
  });
  expect(isValidHogwartsQuery(validQuery)).toBe(true);

  const invalidBecauseNonNullProps = q.Enum('house', {
    type: 'Q_OP_NULLABLE_IS_NULL',
  });
  expect(isValidHogwartsQuery(invalidBecauseNonNullProps)).toBe(false);
});

test('Query validates string', () => {
  const validQuery = q.String('name', {
    type: 'Q_OP_STRING_EQUALS',
    value: 'Harry',
  });

  expect(isValidHogwartsQuery(validQuery)).toBe(true);

  const invalidOp = q.String('name', {
    type: 'Q_OP_NUMBER_GT',
    value: 1000,
  });
  expect(isValidHogwartsQuery(invalidOp)).toBe(false);

  const invalidPath = q.String('blah', {
    type: 'Q_OP_STRING_EQUALS',
    value: 'Harry',
  });
  expect(isValidHogwartsQuery(invalidPath)).toBe(false);
});
