/* @flow */

import invariant from 'invariant';
import nullthrows from 'nullthrows';

import type Model, { MillisSinceEpoch } from '../Model';

import type { QR, QR$Date, QR$Nullable } from './QueryRule';

// -----------------------------------------------------------------------------
//
// QUERIES
//
// -----------------------------------------------------------------------------

export type Q = Q$Atomic | Q$Compound;

export type Q$Atomic = Q$Date | Q$Enum<*> | Q$Number | Q$String;

export type Q$Date = {|
  +op: Op$Date | Op$Nullable,
  +path: string,
  +type: 'Q_DATE',
|};

export type Q$Enum<T: string> = {|
  +op: Op$Enum<T> | Op$Nullable,
  +path: string,
  +type: 'Q_ENUM',
|};

export type Q$Number = {|
  +op: Op$Number | Op$Nullable,
  +path: string,
  +type: 'Q_NUMBER',
|};

export type Q$String = {|
  +op: Op$String | Op$Nullable,
  +path: string,
  +type: 'Q_STRING',
|};

export type Q$Compound = {|
  +op: Op$Compound,
  +type: 'Q_COMPOUND',
|};

function Compound(op: Op$Compound) {
  return { op, type: 'Q_COMPOUND' };
}

function Date(path: string, op: Op$Date | Op$Nullable) {
  return { op, path, type: 'Q_DATE' };
}

function Enum(path: string, op: Op$Enum<*> | Op$Nullable) {
  return { op, path, type: 'Q_ENUM' };
}

function Number(path: string, op: Op$Number | Op$Nullable) {
  return { op, path, type: 'Q_NUMBER' };
}

function String(path: string, op: Op$String | Op$Nullable) {
  return { op, path, type: 'Q_STRING' };
}

// -----------------------------------------------------------------------------
//
// OPERATORS
//
// -----------------------------------------------------------------------------

export type Op = Op$Atomic | Op$Compound | Op$Nullable;

export type Op$Atomic = Op$Date | Op$Enum<*> | Op$Number | Op$String;

const OPS_COMPOUND = {
  Q_OP_COMPOUND_AND: true,
  Q_OP_COMPOUND_OR: true,
};

export type Op$Compound = {|
  +type: $Keys<typeof OPS_COMPOUND>,
  +value: Array<Q>,
|};

const OPS_DATE = {
  Q_OP_DATE_AFTER: true,
  Q_OP_DATE_BEFORE: true,
};

export type Op$Date = {|
  +type: $Keys<typeof OPS_DATE>,
  +value: MillisSinceEpoch,
|};

const OPS_ENUM = {
  Q_OP_ENUM_EQUALS_NONE_OF: true,
  Q_OP_ENUM_EQUALS_ONE_OF: true,
};

export type Op$Enum<T: string> = {|
  +type: $Keys<typeof OPS_ENUM>,
  +value: Array<T>,
|};

const OPS_NULLABLE = {
  Q_OP_NULLABLE_IS_NOT_NULL: true,
  Q_OP_NULLABLE_IS_NULL: true,
};

export type Op$Nullable = {|
  +type: $Keys<typeof OPS_NULLABLE>,
|};

const OPS_NUMBER = {
  Q_OP_NUMBER_GT: true,
  Q_OP_NUMBER_LT: true,
};

export type Op$Number = {|
  +type: $Keys<typeof OPS_NUMBER>,
  +value: number,
|};

const OPS_STRING_1 = {
  Q_OP_STRING_EQUALS: true,
  Q_OP_STRING_NOT_EQUALS: true,
};

const OPS_STRING_2 = {
  Q_OP_STRING_MATCHES: true,
};

const OPS_STRING = {
  ...OPS_STRING_1,
  ...OPS_STRING_2,
};
export type Op$String =
  | {|
      +type: $Keys<typeof OPS_STRING_1>,
      +value: string,
    |}
  | {|
      +type: $Keys<typeof OPS_STRING_2>,
      +value: RegExp,
    |};

// -----------------------------------------------------------------------------
//
// QUERY MATCHING
//
// -----------------------------------------------------------------------------

function matchesQuery(model: Model<*, *>, query: Q): boolean {
  invariant(
    isValidQuery(model.constructor, query),
    'Invalid query of type %s',
    query.type,
  );

  switch (query.type) {
    case 'Q_COMPOUND': {
      return matchesCompoundQuery(model, query);
    }

    case 'Q_DATE': {
      return matchesDateQuery(model, query);
    }

    case 'Q_ENUM': {
      return matchesEnumQuery(model, query);
    }

    case 'Q_NUMBER': {
      return matchesNumberQuery(model, query);
    }

    case 'Q_STRING': {
      return matchesStringQuery(model, query);
    }

    default: {
      return invariant(false, 'Unknown query type: %s', query.type);
    }
  }
}

function matchesCompoundQuery(model: Model<*, *>, query: Q$Compound): boolean {
  const { op } = query;

  switch (op.type) {
    case 'Q_OP_COMPOUND_AND': {
      return op.value.every(q => matchesQuery(model, q));
    }

    case 'Q_OP_COMPOUND_OR': {
      return op.value.some(q => matchesQuery(model, q));
    }

    default: {
      return invariant(
        false,
        'Unepxected op type %s for query type %s',
        op.type,
        query.type,
      );
    }
  }
}

function matchesDateQuery(model: Model<*, *>, query: Q$Date): boolean {
  const { op } = query;

  // $FlowFixMe - This is a stupid error!
  if (OPS_NULLABLE[op.type]) {
    return matchesNullableQuery(model, query);
  }

  const prop = model.resolveQueryProperty(query);

  switch (op.type) {
    case 'Q_OP_DATE_AFTER': {
      return typeof prop === 'number' && prop > op.value;
    }

    case 'Q_OP_DATE_BEFORE': {
      return typeof prop === 'number' && prop > op.value;
    }

    default: {
      return invariant(
        false,
        'Unexpected op type %s for query type',
        op.type,
        query.type,
      );
    }
  }
}

function matchesEnumQuery(model: Model<*, *>, query: Q$Enum<*>): boolean {
  const { op } = query;

  // $FlowFixMe - This is a stupid error!
  if (OPS_NULLABLE[op.type]) {
    return matchesNullableQuery(model, query);
  }

  const prop = model.resolveQueryProperty(query);

  switch (op.type) {
    case 'Q_OP_ENUM_EQUALS_ONE_OF': {
      return typeof prop === 'string' && op.value.some(e => e === prop);
    }

    case 'Q_OP_ENUM_EQUALS_NONE_OF': {
      return typeof prop === 'string' && op.value.every(e => e !== prop);
    }

    default: {
      return invariant(
        false,
        'Unexpected op type %s for query type %s',
        op.type,
        query.type,
      );
    }
  }
}

function matchesNullableQuery(model: Model<*, *>, query: Q): boolean {
  return false;
}

function matchesNumberQuery(model: Model<*, *>, query: Q$Number): boolean {
  const { op } = query;

  // $FlowFixMe - This is a stupid error!
  if (OPS_NULLABLE[op.type]) {
    return matchesNullableQuery(model, query);
  }

  const prop = model.resolveQueryProperty(query);

  switch (op.type) {
    case 'Q_OP_NUMBER_GT': {
      return typeof prop === 'number' && prop > op.value;
    }

    case 'Q_OP_NUMBER_LT': {
      return typeof prop === 'number' && prop < op.value;
    }

    default: {
      return invariant(
        false,
        'Unexpected op type %s for query %s',
        op.type,
        query.type,
      );
    }
  }
}

function matchesStringQuery(model: Model<*, *>, query: Q$String): boolean {
  const { op } = query;

  // $FlowFixMe - This is a stupid error!
  if (OPS_NULLABLE[op.type]) {
    return matchesNullableQuery(model, query);
  }

  const prop = model.resolveQueryProperty(query);

  switch (op.type) {
    case 'Q_OP_STRING_EQUALS': {
      return prop === op.value;
    }

    case 'Q_OP_STRING_NOT_EQUALS': {
      return prop !== op.value;
    }

    default: {
      return invariant(
        false,
        'Unexpected op type %s for query type %s',
        op.type,
        query.type,
      );
    }
  }
}

// -----------------------------------------------------------------------------
//
// QUERY VALIDATION
//
// -----------------------------------------------------------------------------

function isValidQuery(ModelCtor: Class<Model<*, *>>, query: Q): boolean {
  return isValidQueryImpl(ModelCtor.queryRule, query);
}

function isValidQueryImpl(rule: QR, query: Q): boolean {
  switch (query.type) {
    case 'Q_COMPOUND': {
      return query.op.value.every(q => isValidQueryImpl(rule, q));
    }

    case 'Q_DATE': {
      const dateRule = getRuleAtPath(rule, query.path);
      if (!dateRule) {
        return false;
      }
      if (!doesRuleMatchQuery(dateRule, query)) {
        return false;
      }
      const expectedOpTypes = getOpTypesForRule(dateRule);
      return expectedOpTypes.some(opType => query.op.type === opType);
    }

    case 'Q_ENUM': {
      const enumRule = getRuleAtPath(rule, query.path);
      if (!enumRule) {
        return false;
      }
      if (!doesRuleMatchQuery(enumRule, query)) {
        return false;
      }
      const expectedOpTypes = getOpTypesForRule(enumRule);

      // TODO: May want to add check to make sure values of enum are correct.
      // Need to handle the case where the op that is being queried is nullable.
      return expectedOpTypes.some(opType => query.op.type === opType);
    }

    case 'Q_NUMBER': {
      const numberRule = getRuleAtPath(rule, query.path);
      if (!numberRule) {
        return false;
      }
      if (!doesRuleMatchQuery(numberRule, query)) {
        return false;
      }
      const expectedOpTypes = getOpTypesForRule(numberRule);
      return expectedOpTypes.some(opType => query.op.type === opType);
    }

    case 'Q_STRING': {
      const stringRule = getRuleAtPath(rule, query.path);
      if (!stringRule) {
        return false;
      }
      if (!doesRuleMatchQuery(stringRule, query)) {
        return false;
      }
      const expectedOpTypes = getOpTypesForRule(stringRule);
      return expectedOpTypes.some(opType => query.op.type === opType);
    }

    default: {
      return invariant(false, 'Unknown query type: %s', query.type);
    }
  }
}

// -----------------------------------------------------------------------------
//
// UTILITIES
//
// -----------------------------------------------------------------------------

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

function getOpTypesForRule(rule: QR): Array<string> {
  switch (rule.type) {
    case 'QR_DATE': {
      return Object.keys(OPS_DATE);
    }

    case 'QR_ENUM': {
      return Object.keys(OPS_ENUM);
    }

    case 'QR_NULLABLE': {
      const { value } = rule;
      return Object.keys(OPS_NULLABLE).concat(getOpTypesForRule(value));
    }

    case 'QR_NUMBER': {
      return Object.keys(OPS_NUMBER);
    }

    case 'QR_STRING': {
      return Object.keys(OPS_STRING);
    }

    case 'QR_STRUCT': {
      return invariant(false, 'Trying to get op types for struct');
    }

    default: {
      return invariant(false, 'Unhandled query rule type: %s', rule.type);
    }
  }
}

function doesRuleMatchQuery(rule: QR, query: Q): boolean {
  switch (rule.type) {
    case 'QR_DATE': {
      return query.type === 'Q_DATE';
    }

    case 'QR_ENUM': {
      return query.type === 'Q_ENUM';
    }

    case 'QR_NULLABLE': {
      return doesRuleMatchQuery(rule.value, query);
    }

    case 'QR_NUMBER': {
      return query.type === 'Q_NUMBER';
    }

    case 'QR_STRING': {
      return query.type === 'Q_STRING';
    }

    default: {
      return invariant(false, 'Unexpected rule type: %s', rule.type);
    }
  }
}

export default {
  Compound,
  Date,
  Enum,
  isValidQuery,
  matchesQuery,
  Number,
  String,
};
