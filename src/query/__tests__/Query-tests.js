import q from '../Query';

import { HOGWARTS_STUDENT, HogwartsStudent } from '../../test-models';

const isValidHogwartsQuery = q.isValidQuery.bind(null, HogwartsStudent);

// TODO: Need to add a nullable prop to HogwartsStudent for testing.

test('Query validates boolean queries', () => {
  const validQuery = q.Boolean('isFemale', {
    type: 'Q_OP_BOOLEAN_TRUE',
  });
  expect(isValidHogwartsQuery(validQuery)).toBe(true);

  const invalidOp = q.Boolean('isFemale', {
    type: 'Q_OP_NUMBER_GT',
    value: 100,
  });
  expect(isValidHogwartsQuery(invalidOp)).toBe(false);

  const invalidPath = q.Boolean('blah', {
    type: 'Q_OP_BOOLEAN_TRUE',
  });
  expect(isValidHogwartsQuery(invalidPath)).toBe(false);
});

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

test('Query validates null', () => {
  const validQuery = q.Null('magicAnimal', {
    type: 'Q_OP_NULL_IS_NULL',
  });
  expect(isValidHogwartsQuery(validQuery)).toBe(true);

  const invalidBecauseNonNullProps = q.Null('house', {
    type: 'Q_OP_NULL_IS_NULL',
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

test('Query validates compound', () => {
  const validQuery = q.Compound({
    type: 'Q_OP_COMPOUND_AND',
    value: [
      q.String('name', { type: 'Q_OP_STRING_EQUALS', value: 'Harry' }),
      q.Number('housePointsEarned', { type: 'Q_OP_NUMBER_GT', value: 100 }),
    ],
  });

  expect(isValidHogwartsQuery(validQuery)).toBe(true);

  const invalidQuery = q.Compound({
    type: 'Q_OP_COMPOUND_OR',
    value: [
      q.String('blah', { type: 'Q_OP_STRING_EQUALS', value: 'blah' }),
      q.String('foo', { type: 'Q_OP_STRING_NOT_EQUALS', value: 'foo' }),
    ],
  });

  expect(isValidHogwartsQuery(invalidQuery)).toBe(false);
});

test('Matches boolean queries', () => {
  const query = q.Boolean('isFemale', {
    type: 'Q_OP_BOOLEAN_TRUE',
  });

  expect(q.matchesQuery(HOGWARTS_STUDENT.HERMIONE_GRANGER, query)).toBe(true);
  expect(q.matchesQuery(HOGWARTS_STUDENT.RON_WEASLEY, query)).toBe(false);
});

test('Matches date queries', () => {
  const query = q.Date('birthday', {
    type: 'Q_OP_DATE_AFTER',
    value: Date.UTC(1993, 0, 1),
  });

  expect(q.matchesQuery(HOGWARTS_STUDENT.HARRY_POTTER, query)).toBe(true);
  expect(q.matchesQuery(HOGWARTS_STUDENT.DRACO_MALFOY, query)).toBe(false);
});

test('Matches enum queries', () => {
  const query = q.Enum('house', {
    type: 'Q_OP_ENUM_EQUALS_ONE_OF',
    value: ['GRIFFINDOR'],
  });

  expect(q.matchesQuery(HOGWARTS_STUDENT.HARRY_POTTER, query)).toBe(true);
  expect(q.matchesQuery(HOGWARTS_STUDENT.DRACO_MALFOY, query)).toBe(false);
});

test('Matches null query', () => {
  const query = q.Null('magicAnimal', {
    type: 'Q_OP_NULL_IS_NULL',
  });

  expect(q.matchesQuery(HOGWARTS_STUDENT.DRACO_MALFOY, query)).toBe(true);
  expect(q.matchesQuery(HOGWARTS_STUDENT.HARRY_POTTER, query)).toBe(false);
});

test('Matches number query', () => {
  const query = q.Number('housePointsEarned', {
    type: 'Q_OP_NUMBER_GT',
    value: 1000,
  });

  expect(q.matchesQuery(HOGWARTS_STUDENT.RON_WEASLEY, query)).toBe(false);
  expect(q.matchesQuery(HOGWARTS_STUDENT.HERMIONE_GRANGER, query)).toBe(true);
});

test('Matches string query', () => {
  const query = q.String('name', {
    type: 'Q_OP_STRING_EQUALS',
    value: 'Harry Potter',
  });

  expect(q.matchesQuery(HOGWARTS_STUDENT.HARRY_POTTER, query)).toBe(true);
  expect(q.matchesQuery(HOGWARTS_STUDENT.RON_WEASLEY, query)).toBe(false);
});

test('Matches compound query', () => {
  const query = q.Compound({
    type: 'Q_OP_COMPOUND_OR',
    value: [
      q.String('name', {
        type: 'Q_OP_STRING_EQUALS',
        value: 'Harry Potter',
      }),
      q.String('name', {
        type: 'Q_OP_STRING_EQUALS',
        value: 'Ron Weasley',
      }),
    ],
  });

  expect(q.matchesQuery(HOGWARTS_STUDENT.HARRY_POTTER, query)).toBe(true);
  expect(q.matchesQuery(HOGWARTS_STUDENT.RON_WEASLEY, query)).toBe(true);
  expect(q.matchesQuery(HOGWARTS_STUDENT.DRACO_MALFOY, query)).toBe(false);
});
