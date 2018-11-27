import { HogwartsStudent, HOGWARTS_STUDENT } from '../test-models';

test('Validation should pass when converting a valid model from JSON', () => {
  const json = HOGWARTS_STUDENT.HARRY_POTTER.toRaw();
  expect(() => HogwartsStudent.fromJSON(json)).not.toThrow();
});

test('Validation should fail when converting invalid object from JSON', () => {
  const json = {foo: 'bar'};
  expect(() => HogwartsStudent.fromJSON(json)).toThrow();
});
