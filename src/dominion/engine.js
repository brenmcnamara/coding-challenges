/* @flow */

import type Player from './Player';

import type { Board } from './Board';

export type GameResult = {};

export function runGame(players: Array<Player>, board: Board): GameResult {
  throw Error('IMPLEMENT ME!');
}
