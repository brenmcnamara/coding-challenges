/* @flow */

import invariant from 'invariant';

export type QR =
  | QR$Boolean
  | QR$Date
  | QR$Enum<*>
  | QR$Nullable<*>
  | QR$Number
  | QR$String
  | QR$Struct<*>;

export type QR$Boolean = {|
  +type: 'QR_BOOLEAN',
|};

const Boolean = { type: 'QR_BOOLEAN' };

export type QR$Date = {|
  +type: 'QR_DATE',
|};

const Date = { type: 'QR_DATE' };

export type QR$Enum<T: string> = {|
  +type: 'QR_ENUM',
  +values: Array<T>,
|};

function Enum<T: string>(values: Array<T>): QR$Enum<T> {
  return { type: 'QR_ENUM', values };
}

export type QR$Nullable<T: QR> = {|
  +type: 'QR_NULLABLE',
  +value: T,
|};

function Nullable(qr: QR): QR {
  return qr.type === 'QR_NULLABLE' ? qr : { type: 'QR_NULLABLE', value: qr };
}

export type QR$Number = {|
  +type: 'QR_NUMBER',
|};

const Number = { type: 'QR_NUMBER' };

export type QR$String = {|
  +type: 'QR_STRING',
|};

const String = { type: 'QR_STRING' };

export type QR$Struct<T: Object> = {|
  +type: 'QR_STRUCT',
  +value: T,
|};

function Struct<T: { [key: string]: QR }>(value: T): QR$Struct<T> {
  return { type: 'QR_STRUCT', value };
}

function getRuleAtPath(rule: QR, path: string): QR | null {
  const splitPath = path.split('.').filter(str => str);

  let next = rule;

  for (let segment of splitPath) {
    while (next.type === 'QR_NULLABLE') {
      next = next.value;
    }

    switch (next.type) {
      case 'QR_STRUCT': {
        next = next.value[segment];
        if (!next) {
          return null;
        }
        break;
      }

      case 'QR_NULLABLE': {
        return invariant(false, 'Should never be handling QR_NULLABLE');
      }

      case 'QR_BOOLEAN':
      case 'QR_DATE':
      case 'QR_ENUM':
      case 'QR_NUMBER':
      case 'QR_STRING': {
        // Cannot go to a particular path on a primitive type.
        return null;
      }

      default: {
        return invariant(false, 'Unhandled query rule type: %s', next.type);
      }
    }
  }

  return next;
}

function intersect(structs: Array<QR$Struct<*>>): QR$Struct<*> {
  return {
    type: 'QR_STRUCT',
    value: structs.reduce((m, s) => ({ ...m, ...s.value }), {}),
  };
}

/**
 * A normalized rule ensures the following:
 *  - Nullable rules do not have children that are nullable types.
 */
function normalize(rule: QR): QR {
  switch (rule.type) {
    case 'QR_NULLABLE': {
      // To avoid creating a copy of a nullable everytime we normalize,
      // we will handle the common case of having a nullable with no children
      // that arae nullable by return the same reference.
      if (rule.value.type !== 'QR_NULLABLE') {
        return rule;
      }

      let { value } = rule;
      while (value.type === 'QR_NULLABLE') {
        value = value.value;
      }
      return {
        type: 'QR_NULLABLE',
        value,
      };
    }

    case 'QR_STRUCT': {
      const { value } = rule;
      // If normalizing all the sub-rules returns the same references, no
      // need to return a new copy of the rule.
      const keys = Object.keys(value);
      const subrules = keys.map(k => normalize(value[k]));
      const didChange = keys.some((k, i) => subrules[i] !== value[k]);
      if (!didChange) {
        return rule;
      }
      return {
        type: 'QR_STRUCT',
        value: keys.reduce((o, k, i) => ({ ...o, [k]: subrules[i] }), {}),
      };
    }

    case 'QR_DATE':
    case 'QR_NUMBER':
    case 'QR_ENUM':
    case 'QR_STRING': {
      return rule;
    }

    default: {
      return invariant(false, 'Unexpected rule type: %s', rule.type);
    }
  }
}

export default {
  Boolean,
  Date,
  Enum,
  getRuleAtPath,
  intersect,
  normalize,
  Nullable,
  Number,
  String,
  Struct,
};
