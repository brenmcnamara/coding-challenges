/* @flow */

import Model, { tModel } from '.';

import t from 'tcomb-validation';

import type { ModelStub } from '.';

export type HogwartsStudentRaw = ModelStub<'HogwartsStudent'> & {
  +house: 'GRIFFINDOR' | 'HUFFLEPUFF' | 'RAVENCLAW' | 'SLYTHERIN',
  +name: string,
};

export class HogwartsStudent extends Model<
  'HogwartsStudent',
  HogwartsStudentRaw,
> {
  static SCHEMA_ID = '1234';

  static collectionName = 'HogwartsStudents';
  static modelName = 'HogwartsStudent';

  static validation = tModel('HogwartsStudent', {
    house: t.enums.of('GRIFFINDOR SLYTHERIN HUFFLEPUFF RAVENCLAW'),
    name: t.String,
  });
}

export const HOGWARTS_STUDENT = {
  DRACO_MALFOY: HogwartsStudent.fromRaw({
    createdAt: new Date().getTime(),
    house: 'SLYTHERIN',
    id: '1',
    modelType: 'HogwartsStudent',
    name: 'Draco Malfoy',
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  }),

  HARRY_POTTER: HogwartsStudent.fromRaw({
    createdAt: new Date().getTime(),
    house: 'GRIFFINDOR',
    id: '1',
    modelType: 'HogwartsStudent',
    name: 'Harry Potter',
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  }),

  HERMIONE_GRANGER: HogwartsStudent.fromRaw({
    createdAt: new Date().getTime(),
    house: 'GRIFFINDOR',
    id: '1',
    modelType: 'HogwartsStudent',
    name: 'Hermione Granger',
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  }),

  RON_WEASLEY: HogwartsStudent.fromRaw({
    createdAt: new Date().getTime(),
    house: 'GRIFFINDOR',
    id: '1',
    modelType: 'HogwartsStudent',
    name: 'Ron Weasley',
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  }),
};
