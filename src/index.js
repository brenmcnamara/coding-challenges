/* @flow */

export type ID = string;

export type LoadStatus = "EMPTY" | "LOADING" | "READY" | "ERROR";

export type MillisSinceEpoch = number;

export type Pointer<TModelName: string> = {|
  +pointerType: TModelName,
  +refID: ID,
  +type: "POINTER",
|};

export type ModelStub<TModelName: string> = {
  +createdAt: MillisSinceEpoch,
  +id: ID,
  +modelType: TModelName,
  +type: "MODEL",
  +updatedAt: MillisSinceEpoch,
};

export default class Model<
  TModelName: string,
  TRawModel: ModelStub<TModelName>,
> {
  static collectionName: string;
  static modelName: TModelName;

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

  get type(): "MODEL" {
    return "MODEL";
  }

  merge(props: $Shape<TRawModel>): this {
    return this.constructor.fromRaw({...this.__raw, ...props});
  }
}

function createPointer<TModelName: string>(
  name: TModelName,
  id: ID,
): Pointer<TModelName> {
  return {pointerType: name, refID: id, type: "POINTER"};
}
