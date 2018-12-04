/* @flow */

import invariant from 'invariant';
import qr from './query/QueryRule';
import t from 'tcomb-validation';

import type { Q$Atomic } from './query/Query';
import type { QR } from './query/QueryRule';

export type ID = string;

export type LoadStatus = 'EMPTY' | 'LOADING' | 'READY' | 'ERROR';

export type MillisSinceEpoch = number;

export type Pointer<TModelName: string> = {|
  +pointerType: TModelName,
  +refID: ID,
  +type: 'POINTER',
|};

export type ModelStub<TModelName: string> = {
  +createdAt: MillisSinceEpoch,
  +id: ID,
  +modelType: TModelName,
  +type: 'MODEL',
  +updatedAt: MillisSinceEpoch,
};

export default class Model<
  TModelName: string,
  TRawModel: ModelStub<TModelName>,
> {
  static SCHEMA_ID: ID;

  static collectionName: string;
  static modelName: TModelName;

  static queryRule: QR;
  static validation: Object; // Tcomb type

  // ---------------------------------------------------------------------------
  // MAY OVERRIDE
  // ---------------------------------------------------------------------------
  equals(that: Model<TModelName, TRawModel>): boolean {
    if (this === that || this.__raw === that.__raw) {
      return true;
    }

    const thisKeys = Object.keys(this.__raw);
    const thatKeys = Object.keys(that.__raw);
    if (thisKeys.length !== thatKeys.length) {
      return false;
    }

    return thisKeys.every(key => this.__raw[key] === that.__raw[key]);
  }

  // NOTE: By default, this resolves queries using the raw json form of the
  // model. If the model can query properties that do not exist on the raw
  // model, you must override this behavior.
  resolveQueryProperty(query: Q$Atomic): mixed {
    const { path } = query;
    const splitPath = path.split('.').filter(Boolean);

    let next = this.toRaw();
    for (let segment of splitPath) {
      invariant(
        next,
        'Could not resolve path %s for model %s',
        path,
        this.constructor.name,
      );
      next = next[segment];
    }
    return next;
  }

  // ---------------------------------------------------------------------------
  // DO NOT OVERRIDE
  // ---------------------------------------------------------------------------
  __raw: TRawModel;

  constructor(raw: TRawModel) {
    this.__raw = raw;
  }

  static createPointer(id: ID): Pointer<TModelName> {
    return createPointer(this.modelName, id);
  }

  createPointer(): Pointer<TModelName> {
    return createPointer(this.constructor.modelName, this.id);
  }

  static fromRaw(raw: TRawModel): this {
    const Ctor = this;
    return new Ctor(raw);
  }

  static fromJSON(json: Object): this {
    const result = t.validate(json, this.validation);
    invariant(
      result.isValid(),
      '%s',
      result.firstError() && result.firstError().message,
    );

    // $FlowFixMe - Typecast is safe after validation occurs
    return this.fromRaw((json: TRawModel));
  }

  toRaw(): TRawModel {
    return this.__raw;
  }

  get id(): ID {
    return this.__raw.id;
  }

  get updatedAt(): MillisSinceEpoch {
    return this.__raw.updatedAt;
  }

  get createdAt(): MillisSinceEpoch {
    return this.__raw.createdAt;
  }

  get modelType(): TModelName {
    return this.constructor.modelName;
  }

  get type(): 'MODEL' {
    return 'MODEL';
  }

  merge(props: $Shape<TRawModel>): this {
    return this.constructor.fromRaw({ ...this.__raw, ...props });
  }
}

export const tModel = (modelName: string, type: Object) =>
  t.struct({
    createdAt: t.Number,
    id: t.String,
    modelType: t.refinement(t.String, str => str === modelName),
    type: t.refinement(t.String, str => str === 'MODEL'),
    updatedAt: t.Number,
    ...type,
  });

export const qrModel = qr.Struct({
  createdAt: qr.Date,
  id: qr.String,
  updatedAt: qr.Date,
});

function createPointer<TModelName: string>(
  name: TModelName,
  id: ID,
): Pointer<TModelName> {
  return { pointerType: name, refID: id, type: 'POINTER' };
}
