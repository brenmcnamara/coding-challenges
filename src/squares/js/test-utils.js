/* @flow */

import invariant from 'invariant';
import nullthrows from 'nullthrows';

import type { Board } from './squares';

export function visualToBoard(visual: string): Board {
  const rows = visual.split('\n').slice(1, -1);

  const leadingSpaceCount = nullthrows(rows[0].match(/^ */))[0].length;

  const horizontalsSerial = rows.filter((_, i) => i % 2 === 0);
  const verticalsSerial = rows.filter((_, i) => i % 2 === 1);

  invariant(
    horizontalsSerial.length - 1 === verticalsSerial.length,
    'Grid must be square: check rows',
  );
  invariant(
    horizontalsSerial.every(
      h => 2 * horizontalsSerial.length - 1 === h.trim().length,
    ),
    'Grid must be square: check columns',
  );

  const size = horizontalsSerial.length;

  const hMatrix = horizontalsSerial.map(serial =>
    serial
      .trim()
      .split('*')
      .slice(1, -1)
      .map(symbol => symbol === '-'),
  );

  const vMatrix = verticalsSerial.map(serial => {
    const prefix = serial
      .slice(leadingSpaceCount)
      .split('')
      .filter((_, i) => i % 2 === 0)
      .map(symbol => symbol === '|');

    // Make sure we always get arrays of the correct size.
    return new Array(size).fill(false).map((_, i) => Boolean(prefix[i]));
  });

  return { hMatrix, size, vMatrix };
}
