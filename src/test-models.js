/* @flow */

import Model, { qrModel, tModel } from './Model';

import qr from './query/QueryRule';
import t from 'tcomb-validation';

import type { MillisSinceEpoch, ModelStub } from './Model';

export type HogwartsStudentRaw = ModelStub<'HogwartsStudent'> & {
  +birthday: MillisSinceEpoch,
  +house: 'GRIFFINDOR' | 'HUFFLEPUFF' | 'RAVENCLAW' | 'SLYTHERIN',
  +housePointsEarned: number,
  +isFemale: boolean,
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
      birthday: qr.Date,
      house: qr.Enum(['GRIFFINDOR', 'HUFFLEPUFF', 'RAVENCLAW', 'SLYTHERIN']),
      housePointsEarned: qr.Number,
      isFemale: qr.Boolean,
      magicAnimal: qr.Nullable(qr.Enum(['OWL', 'RAT', 'CAT'])),
      name: qr.String,
    }),
  ]);

  static validation = tModel('HogwartsStudent', {
    birthday: t.Number,
    house: t.enums.of('GRIFFINDOR SLYTHERIN HUFFLEPUFF RAVENCLAW'),
    housePointsEarned: t.Number,
    isFemale: t.Boolean,
    magicAnimal: t.maybe(t.enums.of('OWL RAT CAT')),
    name: t.String,
  });
}

export const HOGWARTS_STUDENT = {
  DRACO_MALFOY: HogwartsStudent.fromRaw({
    birthday: Date.UTC(1992, 10, 20),
    createdAt: new Date().getTime(),
    house: 'SLYTHERIN',
    housePointsEarned: 1125,
    id: '1',
    isFemale: false,
    magicAnimal: null,
    modelType: 'HogwartsStudent',
    name: 'Draco Malfoy',
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  }),

  HARRY_POTTER: HogwartsStudent.fromRaw({
    birthday: Date.UTC(1993, 1, 20),
    createdAt: new Date().getTime(),
    house: 'GRIFFINDOR',
    housePointsEarned: 1870,
    id: '1',
    isFemale: false,
    magicAnimal: 'OWL',
    modelType: 'HogwartsStudent',
    name: 'Harry Potter',
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  }),

  HERMIONE_GRANGER: HogwartsStudent.fromRaw({
    birthday: Date.UTC(1993, 5, 22),
    createdAt: new Date().getTime(),
    house: 'GRIFFINDOR',
    housePointsEarned: 9890,
    id: '1',
    isFemale: true,
    magicAnimal: 'CAT',
    modelType: 'HogwartsStudent',
    name: 'Hermione Granger',
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  }),

  RON_WEASLEY: HogwartsStudent.fromRaw({
    birthday: Date.UTC(1993, 8, 1),
    createdAt: new Date().getTime(),
    house: 'GRIFFINDOR',
    housePointsEarned: 875,
    id: '1',
    isFemale: false,
    magicAnimal: 'RAT',
    modelType: 'HogwartsStudent',
    name: 'Ron Weasley',
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  }),
};
