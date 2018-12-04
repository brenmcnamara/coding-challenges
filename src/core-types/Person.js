/* @flow */

import Model, { qrModel, tModel } from '../Model';

import qr from '../query/QueryRule';
import t from 'tcomb-validation';

import type { ModelStub } from '../Model';

export type PersonRaw = ModelStub<'Person'> & {
  +address: {| +descriptor: string |} | null,
  +email: string | null,
  +firstName: string,
  +lastName: string,
  +phoneNumber: string | null,
};

export default class Person extends Model<'Person', PersonRaw> {
  static SCHEMA_ID = '1f733563-c477-492b-a07d-db15a848014e';

  static collectionName = 'People';
  static modelName = 'Person';

  static queryRule = qr.intersect([
    qrModel,
    qr.Struct({
      address: qr.Nullable(
        qr.Struct({
          descriptor: qr.String,
        }),
      ),
      email: qr.Nullable(qr.String),
      firstName: qr.String,
      lastName: qr.String,
      phoneNumber: qr.Nullable(qr.String),
    }),
  ]);

  static validation = tModel('Person', {
    address: t.maybe(
      t.struct({
        descriptor: t.String,
      }),
    ),
    email: t.maybe(t.String),
    firstName: t.String,
    lastName: t.String,
    phoneNUmber: t.maybe(t.String),
  });

  get address(): {| +descriptor: string |} | null {
    return this.__raw.address;
  }

  get email(): string | null {
    return this.__raw.email;
  }

  get firstName(): string {
    return this.__raw.firstName;
  }

  get lastName(): string {
    return this.__raw.lastName;
  }

  get phoneNumber(): string | null {
    return this.__raw.phoneNumber;
  }
}
