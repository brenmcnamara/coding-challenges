/* @flow */

import Model, { qrModel, tModel } from './Model';

import qr from './query/QueryRule';
import t from 'tcomb-validation';

import type { ModelStub } from './Model';

export type HogwartsStudentRaw = ModelStub<'HogwartsStudent'> & {
  +house: 'GRIFFINDOR' | 'HUFFLEPUFF' | 'RAVENCLAW' | 'SLYTHERIN',
  +housePointsEarned: number,
  +magicAnimal: 'OWL' | 'RAT' | 'CAT' | null,
  +name: string,
};

export class HogwartsStudent extends Model<
  'HogwartsStudent',
  HogwartsStudentRaw,
> {
  static SCHEMA_ID = '1234';

  static collectionName = 'HogwartsStudents';
  static modelName = 'HogwartsStudent';

  static queryRule = qr.intersect([
    qrModel,
    qr.Struct({
      house: qr.Enum(['GRIFFINDOR', 'HUFFLEPUFF', 'RAVENCLAW', 'SLYTHERIN']),
      housePointsEarned: qr.Number,
      magicAnimal: qr.Nullable(qr.Enum(['OWL', 'RAT', 'CAT'])),
      name: qr.String,
    }),
  ]);

  static validation = tModel('HogwartsStudent', {
    house: t.enums.of('GRIFFINDOR SLYTHERIN HUFFLEPUFF RAVENCLAW'),
    housePointsEarned: t.Number,
    magicAnimal: t.maybe(t.enums.of('OWL RAT CAT')),
    name: t.String,
  });
}

export const HOGWARTS_STUDENT = {
  DRACO_MALFOY: HogwartsStudent.fromRaw({
    createdAt: new Date().getTime(),
    house: 'SLYTHERIN',
    housePointsEarned: 1125,
    id: '1',
    magicAnimal: null,
    modelType: 'HogwartsStudent',
    name: 'Draco Malfoy',
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  }),

  HARRY_POTTER: HogwartsStudent.fromRaw({
    createdAt: new Date().getTime(),
    house: 'GRIFFINDOR',
    housePointsEarned: 1870,
    id: '1',
    magicAnimal: 'OWL',
    modelType: 'HogwartsStudent',
    name: 'Harry Potter',
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  }),

  HERMIONE_GRANGER: HogwartsStudent.fromRaw({
    createdAt: new Date().getTime(),
    house: 'GRIFFINDOR',
    housePointsEarned: 9890,
    id: '1',
    magicAnimal: 'CAT',
    modelType: 'HogwartsStudent',
    name: 'Hermione Granger',
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  }),

  RON_WEASLEY: HogwartsStudent.fromRaw({
    createdAt: new Date().getTime(),
    house: 'GRIFFINDOR',
    housePointsEarned: 875,
    id: '1',
    magicAnimal: 'RAT',
    modelType: 'HogwartsStudent',
    name: 'Ron Weasley',
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  }),
};
